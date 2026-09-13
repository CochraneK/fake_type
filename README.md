# FakeType

**Mash the keyboard. Write anything.**

FakeType is a browser-based kinetic writing toy: every random keystroke advances a manuscript, so you can perform the *appearance* of fast, deliberate writing without typing the actual text.

It works as a single static page and can be hosted directly on GitHub Pages.

## What it does

- **Fake typing engine** — any key advances the current manuscript.
- **Custom text import** — paste plain text or Markdown and turn it into a fake-typing manuscript.
- **Drag & drop** — load `.txt` and `.md` files directly in the browser.
- **PDF import** — extract PDF text locally with PDF.js and replay it as a manuscript.
- **English / 中文 UI** — switch the interface language at any time.
- **Typing audio** — lightweight Web Audio feedback for keystrokes and revisions.
- **Chaos control** — increase revisions, burst size, and visual instability.
- **Word Storm** — optional kinetic text particles that intensify the performance.
- **Responsive layout** — desktop and mobile friendly.
- **Reduced-motion support** — respects `prefers-reduced-motion`.

## How to use

1. Open `index.html` or publish the repository with GitHub Pages.
2. Start pressing random keys. You do **not** need to type the correct letters.
3. Use **Load text** to paste your own material, or drop a `.txt` / `.md` file into the import dialog.
4. Use **PDF** to load a local PDF.
5. Adjust **Tempo** and **Chaos** to change the rhythm.
6. Turn on **Storm** when you want the page to become more theatrical.

## Markdown structure

When importing text, Markdown headings become manuscript sections:

```md
# My Paper

## Abstract
This becomes the abstract.

## Introduction
This becomes another section.
```

If no headings are present, FakeType treats the whole document as one body section.

## Privacy

Imported text and files are processed in the browser and are not uploaded by FakeType. PDF parsing uses PDF.js loaded from a public CDN; the selected PDF itself stays local to the page.

## Architecture

The app is intentionally lightweight:

```text
index.html      # complete application
.nojekyll       # GitHub Pages compatibility
README.md       # project documentation
```

There is no framework or build step. The application runs directly in the document instead of an iframe/srcdoc wrapper, which keeps keyboard handling, debugging, accessibility, and maintenance straightforward.

## Performance

The animation loop only stays active while auto-typing or Word Storm is running. When the page is idle, FakeType stops requesting animation frames instead of continuously doing canvas/layout work in the background.

## Browser support

A current Chromium, Firefox, or Safari release is recommended. PDF import requires dynamic ES modules and Web Workers supported by modern browsers.

## Development

Clone the repository and serve the directory with any static file server, or open `index.html` directly for most features.

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

---

FakeType is designed as a playful interface experiment around writing, performance, structure, and controlled chaos.
