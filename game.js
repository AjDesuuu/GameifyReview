"use strict";

/* ---------------- utils ---------------- */
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function normalize(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function compactAnswer(s) {
  return String(s)
    .toLowerCase()
    .replace(/[−–—]/g, "-")
    .replace(/[\s,{}]/g, "")
    .replace(/\.$/, "");
}

function matchesTypedAnswer(input, fact) {
  const typed = compactAnswer(input);
  if (!typed) return false;
  return [fact.answer, ...(fact.accept || [])].some((a) => compactAnswer(a) === typed);
}

function maskAnswer(str) {
  return str
    .split(" ")
    .map((word) =>
      word
        .split("")
        .map((ch, i) => {
          if (!/[a-zA-Z0-9]/.test(ch)) return ch;
          if (i === 0) return ch;
          return Math.random() < 0.35 ? ch : "_";
        })
        .join("")
    )
    .join(" ");
}

/* ---------------- pixel heart icon ---------------- */
const HEART_UNIT = 4;
const HEART_PATTERN = [
  [0, 1, 0, 1, 0],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [0, 1, 1, 1, 0],
  [0, 0, 1, 0, 0],
];

function heartBoxShadow(color) {
  const parts = [];
  HEART_PATTERN.forEach((row, y) => {
    row.forEach((v, x) => {
      if (v) parts.push(`${x * HEART_UNIT}px ${y * HEART_UNIT}px 0 0 ${color}`);
    });
  });
  return parts.join(",");
}

function createPixelHeart(active) {
  const wrap = document.createElement("span");
  wrap.className = "pixel-heart";
  const dot = document.createElement("span");
  dot.className = "pixel-heart-dot";
  dot.style.boxShadow = heartBoxShadow(active ? "var(--heart-on)" : "var(--heart-off)");
  wrap.appendChild(dot);
  return wrap;
}

function factCategoryLabel(fact) {
  if (activeSubject.categoryFn) return activeSubject.categoryFn(fact);
  return fact.category || "General";
}

/* ---------------- question generation ---------------- */
function getDistractors(fact, count) {
  let pool;
  if (!fact.poolKey || fact.poolKey === "custom") {
    pool = fact.wrongOptions.slice();
  } else {
    pool = activeSubject.pools[fact.poolKey].filter((x) => x !== fact.answer);
  }
  return shuffle(pool).slice(0, count);
}

function possibleTypesForFact(fact) {
  // Computation facts (those with a worked solution) never become True/False.
  const types = fact.solution ? ["mcq"] : ["mcq", "tf"];
  if (!fact.noFill) types.push(fact.solution ? "input" : "fill");
  return types;
}

function pickTypeForFact(fact) {
  const possible = possibleTypesForFact(fact);
  const allowed = possible.filter((t) => enabledTypes.has(t === "input" ? "fill" : t));
  // A fact that can't be asked in any enabled type falls back to what it supports.
  const types = allowed.length ? allowed : possible;
  return types[Math.floor(Math.random() * types.length)];
}

function buildQuestion(fact) {
  const type = pickTypeForFact(fact);
  const category = factCategoryLabel(fact);
  const solution = fact.solution || null;

  if (type === "mcq") {
    const distractors = getDistractors(fact, 3);
    const choices = shuffle([fact.answer, ...distractors]);
    return { type: "mcq", factId: fact.id, category, prompt: fact.q, choices, correct: fact.answer, solution };
  }

  if (type === "input") {
    return { type: "input", factId: fact.id, category, prompt: fact.q, correct: fact.answer, fact, solution };
  }

  if (type === "tf") {
    const isTrue = Math.random() < 0.5;
    let candidate = fact.answer;
    if (!isTrue) {
      const d = getDistractors(fact, 1);
      candidate = d[0] || fact.answer;
    }
    const statement = fact.pre + candidate + fact.post;
    return { type: "tf", factId: fact.id, category, prompt: statement, correct: candidate === fact.answer };
  }

  // fill in the blank / missing letters
  const hint = maskAnswer(fact.answer);
  return {
    type: "fill",
    factId: fact.id,
    category,
    pre: fact.pre,
    post: fact.post,
    hint,
    correct: fact.answer,
  };
}

/* ---------------- game state ---------------- */
const LIVES_START = 3;
let practiceMode = false;
const QTYPE_STORAGE_KEY = "quizQuestTypes";
const ALL_QTYPES = ["mcq", "tf", "fill"];
let enabledTypes = new Set(ALL_QTYPES);
let activeSubject = null;

const state = {
  queue: [],
  index: 0,
  lives: LIVES_START,
  correctCount: 0,
  answered: false,
};

/* ---------------- DOM refs ---------------- */
const screens = {
  start: document.getElementById("screen-start"),
  game: document.getElementById("screen-game"),
  win: document.getElementById("screen-win"),
  lose: document.getElementById("screen-lose"),
};

const els = {
  livesBox: document.getElementById("lives-box"),
  progressText: document.getElementById("progress-text"),
  progressFill: document.getElementById("progress-fill"),
  scoreText: document.getElementById("score-text"),
  categoryTag: document.getElementById("category-tag"),
  typeTag: document.getElementById("type-tag"),
  questionCard: document.getElementById("question-card"),
  feedback: document.getElementById("feedback"),
  nextBtn: document.getElementById("next-btn"),
  winScore: document.getElementById("win-score"),
  loseScore: document.getElementById("lose-score"),
  loseProgress: document.getElementById("lose-progress"),
  confetti: document.getElementById("confetti"),
  practiceBadge: document.getElementById("practice-badge"),
};

function showScreen(name) {
  Object.values(screens).forEach((s) => s.classList.add("hidden"));
  const target = screens[name];
  target.classList.remove("hidden");
  target.classList.remove("anim-in");
  void target.offsetWidth; // force reflow so the entrance animation replays
  target.classList.add("anim-in");
}

/* ---------------- round control ---------------- */
function startRound(length) {
  const pool = shuffle(activeSubject.facts);
  const n = length === "all" ? pool.length : Math.min(length, pool.length);
  state.queue = pool.slice(0, n).map(buildQuestion);
  state.index = 0;
  state.lives = LIVES_START;
  state.correctCount = 0;
  els.practiceBadge.classList.toggle("hidden", !practiceMode);
  showScreen("game");
  renderLives();
  renderQuestion();
}

function renderLives(animateLostIndex) {
  els.livesBox.innerHTML = "";
  for (let i = 0; i < LIVES_START; i++) {
    const heart = createPixelHeart(i < state.lives);
    if (i === animateLostIndex) heart.classList.add("breaking");
    els.livesBox.appendChild(heart);
  }
}

function updateHud() {
  const total = state.queue.length;
  els.progressText.textContent = `Question ${state.index + 1} / ${total}`;
  els.progressFill.style.width = `${(state.index / total) * 100}%`;
  els.scoreText.textContent = `Score ${state.correctCount}`;
}

function typeLabel(t) {
  if (t === "mcq") return "Multiple Choice";
  if (t === "tf") return "True or False";
  if (t === "fill") return "Fill in the Blank";
  if (t === "input") return "Solve It";
  return "";
}

function buildAnswerForm(placeholder, onSubmit) {
  const form = document.createElement("form");
  form.className = "fill-form";
  form.autocomplete = "off";
  const input = document.createElement("input");
  input.type = "text";
  input.className = "fill-input";
  input.placeholder = placeholder;
  input.autocomplete = "off";
  const submit = document.createElement("button");
  submit.type = "submit";
  submit.className = "choice-btn submit-btn";
  submit.textContent = "Submit";
  form.appendChild(input);
  form.appendChild(submit);
  els.questionCard.appendChild(form);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (state.answered) return;
    onSubmit(input);
  });

  setTimeout(() => input.focus(), 50);
}

function renderSolution(steps) {
  const box = document.createElement("div");
  box.className = "solution-box";
  const title = document.createElement("p");
  title.className = "solution-title";
  title.textContent = "HOW TO SOLVE IT";
  box.appendChild(title);
  const list = document.createElement("ol");
  list.className = "solution-steps";
  steps.forEach((step) => {
    const li = document.createElement("li");
    li.textContent = step;
    list.appendChild(li);
  });
  box.appendChild(list);
  els.feedback.appendChild(box);
}

function renderQuestion() {
  state.answered = false;
  els.feedback.className = "feedback hidden";
  els.feedback.textContent = "";
  els.nextBtn.classList.add("hidden");
  updateHud();

  const q = state.queue[state.index];
  els.categoryTag.textContent = q.category;
  els.typeTag.textContent = typeLabel(q.type);
  els.questionCard.innerHTML = "";

  if (q.type === "mcq") {
    const p = document.createElement("p");
    p.className = "question-text";
    p.textContent = q.prompt;
    els.questionCard.appendChild(p);

    const grid = document.createElement("div");
    grid.className = "choice-grid";
    q.choices.forEach((choice) => {
      const btn = document.createElement("button");
      btn.className = "choice-btn";
      btn.textContent = choice;
      btn.addEventListener("click", () => handleAnswer(choice === q.correct, btn, q));
      grid.appendChild(btn);
    });
    els.questionCard.appendChild(grid);
  }

  if (q.type === "tf") {
    const p = document.createElement("p");
    p.className = "question-text";
    p.textContent = q.prompt;
    els.questionCard.appendChild(p);

    const grid = document.createElement("div");
    grid.className = "choice-grid tf-grid";
    [
      { label: "TRUE", val: true },
      { label: "FALSE", val: false },
    ].forEach((opt) => {
      const btn = document.createElement("button");
      btn.className = "choice-btn tf-btn";
      btn.textContent = opt.label;
      btn.addEventListener("click", () => handleAnswer(opt.val === q.correct, btn, q));
      grid.appendChild(btn);
    });
    els.questionCard.appendChild(grid);
  }

  if (q.type === "fill") {
    const p = document.createElement("p");
    p.className = "question-text";
    p.textContent = `${q.pre}____${q.post}`;
    els.questionCard.appendChild(p);

    const hint = document.createElement("p");
    hint.className = "hint-text";
    hint.textContent = `Hint: ${q.hint}`;
    els.questionCard.appendChild(hint);

    buildAnswerForm("Type your answer…", (input) => {
      handleAnswer(normalize(input.value) === normalize(q.correct), null, q, input);
    });
  }

  if (q.type === "input") {
    const p = document.createElement("p");
    p.className = "question-text";
    p.textContent = q.prompt;
    els.questionCard.appendChild(p);

    buildAnswerForm("Type a number, letter, or word…", (input) => {
      handleAnswer(matchesTypedAnswer(input.value, q.fact), null, q, input);
    });
  }
}

function handleAnswer(isCorrect, btnEl, q, inputEl) {
  if (state.answered) return;
  state.answered = true;

  // lock all interactive elements in the card
  els.questionCard.querySelectorAll("button, input").forEach((el) => (el.disabled = true));

  if (isCorrect) {
    state.correctCount++;
    if (btnEl) btnEl.classList.add("correct");
    els.feedback.className = "feedback show correct-feedback";
    els.feedback.textContent = "CORRECT!";
    SFX.correct();
  } else {
    SFX.wrong();
    if (!practiceMode) {
      const lostIndex = state.lives - 1;
      state.lives--;
      renderLives(lostIndex);
    }
    if (btnEl) btnEl.classList.add("wrong");
    const answerText = q.correct === true ? "TRUE" : q.correct === false ? "FALSE" : q.correct;
    els.feedback.className = "feedback show wrong-feedback";
    els.feedback.textContent = `WRONG — correct answer: ${answerText}`;
    if (q.solution) renderSolution(q.solution);
    if (inputEl) inputEl.classList.add("wrong-input");
    document.getElementById("app").classList.add("shake");
    setTimeout(() => document.getElementById("app").classList.remove("shake"), 350);
  }

  updateHud();

  if (state.lives <= 0 && !q.solution) {
    setTimeout(endRoundLose, 1100);
    return;
  }

  els.nextBtn.classList.remove("hidden");
}

els.nextBtn.addEventListener("click", () => {
  SFX.pop();
  if (state.lives <= 0) {
    endRoundLose();
    return;
  }
  state.index++;
  if (state.index >= state.queue.length) {
    endRoundWin();
  } else {
    renderQuestion();
  }
});

function endRoundWin() {
  showScreen("win");
  els.winScore.textContent = `You got ${state.correctCount} / ${state.queue.length} correct with ${state.lives} ${state.lives === 1 ? "life" : "lives"} left!`;
  launchConfetti();
  SFX.win();
}

function endRoundLose() {
  showScreen("lose");
  els.loseScore.textContent = `Final score: ${state.correctCount} correct`;
  els.loseProgress.textContent = `You made it to question ${state.index + 1} of ${state.queue.length}.`;
  SFX.lose();
}

function launchConfetti() {
  els.confetti.innerHTML = "";
  const colors = ["#ff2f92", "#ff9fd0", "#ffcf4d", "#fff6fb", "#d81b7a"];
  for (let i = 0; i < 60; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = Math.random() * 100 + "%";
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = Math.random() * 0.8 + "s";
    piece.style.animationDuration = 2 + Math.random() * 1.5 + "s";
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    els.confetti.appendChild(piece);
  }
}

/* ---------------- start / retry buttons ---------------- */
document.querySelectorAll("[data-start]").forEach((btn) => {
  btn.addEventListener("click", () => {
    SFX.pop();
    const len = btn.getAttribute("data-start");
    startRound(len === "all" ? "all" : parseInt(len, 10));
  });
});

document.getElementById("play-again-btn").addEventListener("click", () => {
  SFX.pop();
  startRound(state.queue.length);
});
document.getElementById("retry-btn").addEventListener("click", () => {
  SFX.pop();
  startRound(state.queue.length);
});
document.querySelectorAll("[data-home]").forEach((btn) =>
  btn.addEventListener("click", () => {
    SFX.pop();
    showScreen("start");
  })
);

/* ---------------- sound toggle ---------------- */
const sfxToggleBtn = document.getElementById("sfx-toggle");
const sfxStateLabel = document.getElementById("sfx-state");

function syncSfxLabel() {
  const on = SFX.isEnabled();
  sfxStateLabel.textContent = on ? "ON" : "OFF";
  sfxToggleBtn.classList.toggle("sfx-off", !on);
}

sfxToggleBtn.addEventListener("click", () => {
  SFX.toggle();
  syncSfxLabel();
  SFX.pop();
});

syncSfxLabel();

/* ---------------- subject select ---------------- */
const SUBJECT_STORAGE_KEY = "quizQuestSubject";
const subjectSegmentedBox = document.getElementById("subject-segmented");
const subjectHint = document.getElementById("subject-hint");
const subjectBadge = document.getElementById("subject-badge");
const subjectTitlePrefix = document.getElementById("subject-title-prefix");
const subjectDescription = document.getElementById("subject-description");

function loadStoredSubject() {
  try {
    return localStorage.getItem(SUBJECT_STORAGE_KEY);
  } catch (e) {
    return null;
  }
}

function storeSubject(id) {
  try {
    localStorage.setItem(SUBJECT_STORAGE_KEY, id);
  } catch (e) {
    /* ignore (private mode / storage disabled) */
  }
}

function setActiveSubject(id) {
  const subject = SUBJECTS[id];
  if (!subject) return;
  activeSubject = subject;
  storeSubject(id);
  subjectSegmentedBox.querySelectorAll(".segment").forEach((seg) => {
    seg.classList.toggle("active", seg.getAttribute("data-subject") === id);
  });
  subjectBadge.textContent = subject.badge;
  subjectTitlePrefix.textContent = subject.label;
  subjectDescription.textContent = subject.subtitle;
  subjectHint.textContent = `${subject.facts.length} facts loaded — the mix reshuffles every round.`;
  updateQtypeHint();
}

function initSubjectSelector() {
  SUBJECT_ORDER.forEach((id) => {
    const subject = SUBJECTS[id];
    if (!subject) return;
    const btn = document.createElement("button");
    btn.className = "segment";
    btn.type = "button";
    btn.setAttribute("data-subject", id);
    btn.textContent = subject.label;
    btn.addEventListener("click", () => {
      SFX.pop();
      setActiveSubject(id);
    });
    subjectSegmentedBox.appendChild(btn);
  });
  const stored = loadStoredSubject();
  const initial = stored && SUBJECTS[stored] ? stored : SUBJECT_ORDER[0];
  setActiveSubject(initial);
}

initSubjectSelector();

/* ---------------- game mode ---------------- */
const modeSegments = document.querySelectorAll(".segment[data-mode]");
const modeHint = document.getElementById("mode-hint");
const MODE_HINTS = {
  off: "Normal: a wrong answer costs a life.",
  practice: "Practice: wrong answers don't cost a life — just relaxed review.",
};

function setPracticeMode(on) {
  practiceMode = on;
  modeSegments.forEach((seg) => seg.classList.toggle("active", seg.getAttribute("data-mode") === (on ? "practice" : "off")));
  modeHint.textContent = MODE_HINTS[on ? "practice" : "off"];
}

modeSegments.forEach((seg) => {
  seg.addEventListener("click", () => {
    SFX.pop();
    setPracticeMode(seg.getAttribute("data-mode") === "practice");
  });
});

setPracticeMode(false);

/* ---------------- question types ---------------- */
const qtypeSegments = document.querySelectorAll(".segment[data-qtype]");

function loadStoredTypes() {
  try {
    const saved = JSON.parse(localStorage.getItem(QTYPE_STORAGE_KEY));
    const valid = Array.isArray(saved) ? saved.filter((t) => ALL_QTYPES.includes(t)) : [];
    if (valid.length) enabledTypes = new Set(valid);
  } catch (e) {
    /* ignore (private mode / storage disabled / bad data) */
  }
}

function storeTypes() {
  try {
    localStorage.setItem(QTYPE_STORAGE_KEY, JSON.stringify([...enabledTypes]));
  } catch (e) {
    /* ignore */
  }
}

function updateQtypeHint(message) {
  const hint = document.getElementById("qtype-hint");
  if (message) {
    hint.textContent = message;
    return;
  }
  const hasMath = activeSubject && activeSubject.facts.some((f) => f.solution);
  if (hasMath && enabledTypes.size === 1 && enabledTypes.has("tf")) {
    hint.textContent = `${activeSubject.label} is computation — it has no True/False, so its questions will use the other types.`;
  } else {
    hint.textContent = "Tap to turn a type on or off. At least one must stay on.";
  }
}

function syncQtypeSegments() {
  qtypeSegments.forEach((seg) => {
    const on = enabledTypes.has(seg.getAttribute("data-qtype"));
    seg.classList.toggle("active", on);
    seg.setAttribute("aria-pressed", String(on));
  });
}

qtypeSegments.forEach((seg) => {
  seg.addEventListener("click", () => {
    const t = seg.getAttribute("data-qtype");
    if (enabledTypes.has(t) && enabledTypes.size === 1) {
      SFX.wrong();
      updateQtypeHint("You need at least one question type on.");
      return;
    }
    SFX.pop();
    if (enabledTypes.has(t)) enabledTypes.delete(t);
    else enabledTypes.add(t);
    storeTypes();
    syncQtypeSegments();
    updateQtypeHint();
  });
});

loadStoredTypes();
syncQtypeSegments();
updateQtypeHint();

/* ---------------- decorative hearts ---------------- */
const introHeartsBox = document.getElementById("intro-hearts");
for (let i = 0; i < LIVES_START; i++) introHeartsBox.appendChild(createPixelHeart(true));

const winHeartBox = document.getElementById("win-heart");
winHeartBox.appendChild(createPixelHeart(true));
