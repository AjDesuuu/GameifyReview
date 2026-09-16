# PCTG Quiz Quest

A static, gamified quiz for reviewing the PCTG reviewer material (Region 1: Ilocos Region,
Region 2: Cagayan Valley & Region 3: Central Luzon — provinces, capitals, landmarks, tourist
spots, activities, festivals, languages, trivia).

No backend/database — everything (questions + game logic) runs client-side in plain
HTML/CSS/JS, so it deploys as a static site.

## How it works

- **Question bank**: [data.js](data.js) holds ~150 facts pulled from the reviewer, each with
  a `pre`/`answer`/`post` shape so the engine can turn one fact into three different question
  styles.
- **Game engine**: [game.js](game.js) randomly assigns each fact a question type every round —
  **Multiple Choice**, **True/False**, or **Fill in the Blank** — and picks a random subset of
  facts. That's why the same fact (e.g. a Taguig-style true/false question) can show up as
  multiple choice next time you play.
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

If you add more regions from the reviewer, add more entries to the `FACTS` array in
[data.js](data.js) following the existing `{ id, poolKey, q, pre, post, answer }` shape (and
`wrongOptions` for `poolKey: "custom"` items). No other code changes are needed — new facts
automatically get shuffled into rounds and get random question types.
