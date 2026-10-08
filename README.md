# Crimate project page

The public website for **Crimate**, a desktop editor for explainer slides and 2D timeline animation, saved as plain `.crim` text that people and AI agents can read and edit.

**Live:** https://gyubeomim.github.io/crimate-project/

This repository holds only the page: static HTML, CSS and JavaScript with no build step. The editor itself is developed in a separate, private repository.

## Contents

- `index.html` — the page, in English with a Korean switch (한국어). Korean browsers open in Korean.
- `styles.css` — light and dark themes, down to phone width.
- `main.js` — the language switch and the demo video (plays while on screen, pausable, respects reduced motion).
- `assets/` — captures of the Crimate editor: screenshots (WebP), the demo video (MP4) and the link preview (`og.jpg`).
- `.nojekyll` — GitHub Pages serves the files as they are.

## Preview locally

```bash
python3 -m http.server 4320
```

Then open http://127.0.0.1:4320/.

## Publishing

GitHub Pages serves the root of the `main` branch, so every push to `main` updates the live site within a minute or two.

## Updating the pictures

Every picture and the demo video are live captures of the editor playing `examples/backprop.crim`. They are regenerated from the editor's repository with `npm run site:images`, which writes into this folder's `assets/`. The AI chat pictures (`chat.webp`, `chat-math.webp`) are real replies from the model connected in the editor, captured with `npm run site:images -- --chat`; they differ from run to run, so look at them before committing.

---

© 2026 Crimate. All rights reserved.
