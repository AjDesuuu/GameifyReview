# Reviewer Quiz Quest

A static, gamified quiz for reviewing course material across multiple subjects — currently
**MPTH** (Tourism & Hospitality), **NSTP** (National Service Training Program), and **PCTG**
(Region I–III reviewer: provinces, capitals, landmarks, tourist spots, activities, festivals,
languages, trivia).

No backend/database — everything (questions + game logic) runs client-side in plain
HTML/CSS/JS, so it deploys as a static site.

## How it works

- **Subjects**: each subject lives in its own file under [data/](data/) (`data/mpth.js`,
  `data/nstp.js`, `data/pctg.js`), which calls `registerSubject()` (defined in
  [data/core.js](data/core.js)) with its label, badge, subtitle, distractor pools, and facts.
  `SUBJECT_ORDER` in `data/core.js` controls the order subjects appear on the start screen.
- **Question bank**: each subject's facts are `pre`/`answer`/`post` shaped so the engine can
  turn one fact into three different question styles.
- **Game engine**: [game.js](game.js) reads the selected subject's facts, randomly assigns each
  one a question type every round — **Multiple Choice**, **True/False**, or **Fill in the
  Blank** — and picks a random subset. That's why the same fact can show up as multiple choice
  next time you play. The chosen subject is remembered in `localStorage` between visits.
- **Lives**: 3 hearts. Wrong answer = -1 heart. Hit 0 and it's game over, with a **Retry**
  button that reshuffles a brand new round.
- **Congratulations screen**: shown with confetti whenever you clear a round with lives to
  spare; **Play Again** reshuffles immediately.

## Run locally

Just open [index.html](index.html) in a browser, or serve the folder:

```bash
npx http-server -p 8080
```

## Deploy to Vercel

This repo is already set up for zero-config static deployment (index.html at the repo root).
`Materials/` (your source PDF/HTML) is excluded from deployment via `.vercelignore`.

**Option A — connect the GitHub repo (recommended for sharing/updating later):**
1. Push this repo to GitHub.
2. In your Vercel dashboard project, go to Settings → Git and connect this repo (or import it
   as a new project) — Framework Preset: "Other" / static, no build command needed.
3. Every push to `main` auto-deploys.

**Option B — deploy straight from your machine with the CLI:**
```bash
npx vercel --prod
```
Follow the login prompt, and when asked for the project, link it to the existing
`aaron-jetro-alvarezs-projects` project so it reuses your existing deployment URL.

## Adding more questions later

To add more facts to an existing subject, add entries to that subject's `FACTS` array in its
`data/<subject>.js` file, following the shape `{ id, poolKey, category, q, pre, post, answer }`
(plus `wrongOptions` for `poolKey: "custom"` items, and `noFill: true` if the answer is too long
or awkward for the fill-in-the-blank style). No other code changes are needed — new facts
automatically get shuffled into rounds and get random question types.

## Adding a new subject

1. Copy `data/mpth.js` as a starting template and save it as `data/<id>.js`.
2. Fill in its `POOLS` (named distractor lists, referenced by a fact's `poolKey`) and `FACTS`
   array, then call `registerSubject({ id, label, badge, subtitle, pools, facts })` at the
   bottom — `id` is a short lowercase key (e.g. `"math"`), `label`/`badge` show in the header,
   `subtitle` is the start-screen description.
3. Add `<script src="data/<id>.js"></script>` in [index.html](index.html), after
   `data/core.js` and before `sound.js`.
4. Add the new `id` to `SUBJECT_ORDER` in [data/core.js](data/core.js) to control where it
   appears in the subject picker.
