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

function factCategoryLabel(fact) {
  if (fact.id.startsWith("cap-")) return "Capitals";
  if (fact.id.startsWith("nick-")) return "Nicknames";
  if (fact.id.startsWith("origin-")) return "Name Origins";
  if (fact.id.startsWith("lm-")) return "Landmarks";
  if (fact.id.startsWith("fest-")) return "Festivals";
  if (fact.id.startsWith("lang-")) return "Language";
  if (fact.id.startsWith("tv-")) return "Trivia";
  return "General";
}

/* ---------------- question generation ---------------- */
function getDistractors(fact, count) {
  let pool;
  if (fact.poolKey === "custom") {
    pool = fact.wrongOptions.slice();
  } else {
    pool = POOLS[fact.poolKey].filter((x) => x !== fact.answer);
  }
  return shuffle(pool).slice(0, count);
}

function pickTypeForFact(fact) {
  const types = ["mcq", "tf"];
  if (!fact.noFill) types.push("fill");
  return types[Math.floor(Math.random() * types.length)];
}

function buildQuestion(fact) {
  const type = pickTypeForFact(fact);
  const category = factCategoryLabel(fact);

  if (type === "mcq") {
    const distractors = getDistractors(fact, 3);
    const choices = shuffle([fact.answer, ...distractors]);
    return { type: "mcq", factId: fact.id, category, prompt: fact.q, choices, correct: fact.answer };
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
};

function showScreen(name) {
  Object.values(screens).forEach((s) => s.classList.add("hidden"));
  screens[name].classList.remove("hidden");
}

/* ---------------- round control ---------------- */
function startRound(length) {
  const pool = shuffle(FACTS);
  const n = length === "all" ? pool.length : Math.min(length, pool.length);
  state.queue = pool.slice(0, n).map(buildQuestion);
  state.index = 0;
  state.lives = LIVES_START;
  state.correctCount = 0;
  showScreen("game");
  renderLives();
  renderQuestion();
}

function renderLives() {
  els.livesBox.innerHTML = "";
  for (let i = 0; i < LIVES_START; i++) {
    const span = document.createElement("span");
    span.className = "heart" + (i < state.lives ? "" : " lost");
    span.textContent = i < state.lives ? "❤️" : "🖤";
    els.livesBox.appendChild(span);
  }
}

function updateHud() {
  const total = state.queue.length;
  els.progressText.textContent = `Question ${state.index + 1} / ${total}`;
  els.progressFill.style.width = `${(state.index / total) * 100}%`;
  els.scoreText.textContent = `Score: ${state.correctCount}`;
}

function typeLabel(t) {
  if (t === "mcq") return "Multiple Choice";
  if (t === "tf") return "True or False";
  if (t === "fill") return "Fill in the Blank";
  return "";
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
      { label: "✅ True", val: true },
      { label: "❌ False", val: false },
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

    const form = document.createElement("form");
    form.className = "fill-form";
    form.autocomplete = "off";
    const input = document.createElement("input");
    input.type = "text";
    input.className = "fill-input";
    input.placeholder = "Type your answer…";
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
      const correct = normalize(input.value) === normalize(q.correct);
      handleAnswer(correct, null, q, input);
    });

    setTimeout(() => input.focus(), 50);
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
    els.feedback.textContent = "✅ Correct!";
  } else {
    state.lives--;
    renderLives();
    if (btnEl) btnEl.classList.add("wrong");
    const answerText = q.correct === true ? "True" : q.correct === false ? "False" : q.correct;
    els.feedback.className = "feedback show wrong-feedback";
    els.feedback.textContent = `❌ Not quite. Correct answer: ${answerText}`;
    if (inputEl) inputEl.classList.add("wrong-input");
    document.getElementById("app").classList.add("shake");
    setTimeout(() => document.getElementById("app").classList.remove("shake"), 350);
  }

  updateHud();

  if (state.lives <= 0) {
    setTimeout(endRoundLose, 1100);
    return;
  }

  els.nextBtn.classList.remove("hidden");
}

els.nextBtn.addEventListener("click", () => {
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
}

function endRoundLose() {
  showScreen("lose");
  els.loseScore.textContent = `Final score: ${state.correctCount} correct`;
  els.loseProgress.textContent = `You made it to question ${state.index + 1} of ${state.queue.length}.`;
}

function launchConfetti() {
  els.confetti.innerHTML = "";
  const colors = ["#0038A8", "#CE1126", "#FCD116", "#ffffff"];
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
    const len = btn.getAttribute("data-start");
    startRound(len === "all" ? "all" : parseInt(len, 10));
  });
});

document.getElementById("play-again-btn").addEventListener("click", () => startRound(state.queue.length));
document.getElementById("retry-btn").addEventListener("click", () => startRound(state.queue.length));
document.querySelectorAll("[data-home]").forEach((btn) => btn.addEventListener("click", () => showScreen("start")));
