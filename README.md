# FakeType

**Mash the keyboard. Write anything.**

FakeType is a browser-based kinetic writing toy: every random keystroke advances a manuscript, so you can perform the *appearance* of fast, deliberate writing without typing the actual text.

It is a lightweight static web app and can be hosted directly on GitHub Pages.

## Highlights

- **Fake typing engine** — any key advances the current manuscript.
- **Custom text import** — paste plain text or Markdown and turn it into a fake-typing manuscript.
- **Drag & drop** — load `.txt`, `.md`, and PDF files directly in the browser.
- **PDF manuscript import** — PDF.js extracts text locally and FakeType detects common academic sections.
- **Two-column PDF heuristic** — attempts to preserve reading order for common two-column papers.
- **PDF progress + cancel** — large documents show per-page analysis progress and can be canceled.
- **English / 中文 UI** — switch the interface language at any time.
- **Typing audio** — lightweight Web Audio feedback for keystrokes and revisions.
- **Chaos control** — four visual intensity tiers progressively disturb the otherwise formal paper layout.
- **Word Storm** — optional kinetic text particles; extreme Chaos can also trigger bursts automatically.
- **Cinema mode** — press `F` or use the Cinema button for a distraction-free fullscreen performance view.
- **Shareable settings** — share language, tempo, chaos, sound, storm, and cinema settings in the URL.
- **Responsive layout** — desktop and mobile friendly.
- **Reduced-motion support** — respects `prefers-reduced-motion`.

## How to use

1. Open the GitHub Pages site or serve the repository locally.
2. Start pressing random keys. You do **not** need to type the correct letters.
3. Use **Load text** to paste your own material, or drop a `.txt` / `.md` file into the import dialog.
4. Use **PDF** or drag a PDF onto the page to analyze a local paper.
5. Adjust **Tempo** and **Chaos** to change the rhythm and visual instability.
6. Turn on **Storm** when you want kinetic words to fly toward the viewer.
7. Press **F** for Cinema mode.
8. Use **Share** to copy/share a URL that recreates your current settings.

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

## URL settings

FakeType understands these optional query parameters:

```text
?lang=zh&tempo=92&chaos=70&storm=1&sound=0&cinema=1
```

| Parameter | Meaning |
| --- | --- |
| `lang=en|zh` | interface/manuscript language |
| `tempo=24..150` | auto-typing tempo |
| `chaos=0..100` | revision probability and visual intensity |
| `storm=1` | enable Word Storm bursts |
| `sound=0` | start muted |
| `cinema=1` | start in distraction-free Cinema layout |

Imported document content is deliberately **not** encoded into share URLs.

## PDF handling

PDF import runs entirely in the browser using PDF.js. FakeType:

1. reads each page,
2. groups nearby text items into lines,
3. applies a simple two-column reading-order heuristic when appropriate,
4. looks for common headings such as Abstract, Introduction, Methods, Results, Discussion, Conclusion, References, and their common Chinese equivalents,
5. falls back to chunked body sections when a reliable structure cannot be detected.

This is intentionally heuristic rather than a full scholarly-document parser. Complex layouts, scanned/image-only PDFs, mathematical notation, tables, and unusual multi-column documents may still produce imperfect results.

## Privacy

Imported text and files are processed in the browser and are not uploaded by FakeType. PDF parsing uses PDF.js loaded from a public CDN; the selected PDF itself stays local to the page.

## Architecture

```text
index.html       # semantic application shell
styles.css       # paper UI, responsive layout, Cinema + Chaos states
app.js           # typing engine, imports, audio, storm, sharing and runtime
.nojekyll        # GitHub Pages compatibility
README.md        # project documentation
```

There is no framework or build step. The application runs directly in the document instead of an iframe/srcdoc wrapper, which keeps keyboard handling, debugging, accessibility, and maintenance straightforward.

## Performance

FakeType does **not** keep a permanent animation loop alive. `requestAnimationFrame` runs only while automatic typing is active or Word Storm particles actually exist. When the page is idle, the animation loop stops.

PDF analysis also exposes progress rather than silently blocking through a long document.

## Browser support

A current Chromium, Firefox, or Safari release is recommended. PDF import requires dynamic ES modules and Web Workers supported by modern browsers. Fullscreen behavior depends on browser permissions; the Cinema layout still works if fullscreen is unavailable.

## Development

Clone the repository and serve the directory with any static file server:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

For a quick JavaScript syntax check:

```bash
node --check app.js
```

---

FakeType is designed as a playful interface experiment around writing, performance, structure, and controlled chaos.
