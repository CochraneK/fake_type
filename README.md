# FakeType

**Mash the keyboard. Write anything.**

FakeType is a browser-based kinetic writing playground: every random keystroke advances a manuscript, so you can perform the *appearance* of fast, deliberate writing without typing the actual text.

It is a lightweight static web app and can be hosted directly on GitHub Pages.

## Highlights

- **Fake typing engine** — any key advances the current manuscript.
- **Presets** — ready-made research paper, keynote, manifesto, and Chinese clinical-note demos.
- **Custom text import** — paste plain text or Markdown and turn it into a fake-typing manuscript.
- **Drag & drop** — load `.txt`, `.md`, and PDF files directly in the browser.
- **PDF manuscript import** — PDF.js extracts text locally and FakeType detects common academic sections.
- **Two-column PDF heuristic** — attempts to preserve reading order for common two-column papers.
- **PDF progress + cancel** — large documents show per-page analysis progress and can be canceled.
- **Demo mode** — automatically performs keystrokes while gradually increasing Chaos.
- **Export** — save the currently revealed manuscript as Markdown.
- **English / 中文 UI** — switch the interface language at any time.
- **Typing audio** — lightweight Web Audio feedback for keystrokes and revisions.
- **Chaos control** — four visual intensity tiers progressively disturb the otherwise formal paper layout.
- **Academic Breakdown** — extreme Chaos adds intermittent page jolts, drifting sections, intensified cursor behavior, and kinetic word bursts while keeping the manuscript readable.
- **Word Storm** — optional kinetic text particles; extreme Chaos can also trigger bursts automatically.
- **Cinema mode** — press `F` or use the Cinema button for a distraction-free fullscreen performance view.
- **Shareable settings** — share language, tempo, chaos, sound, storm, and cinema settings in the URL.
- **Keyboard help** — built-in shortcut reference without sacrificing normal fake-typing keys.
- **Installable/offline shell** — a web app manifest and service worker cache the local application shell for repeat visits.
- **Responsive layout** — desktop and mobile friendly.
- **Reduced-motion support** — respects `prefers-reduced-motion`.

## How to use

1. Open the GitHub Pages site or serve the repository locally.
2. Start pressing random keys. You do **not** need to type the correct letters.
3. Choose **Presets** for an instant demo, or **Load text** for your own Markdown/plain text.
4. Use **PDF** or drag a PDF onto the page to analyze a local paper.
5. Adjust **Tempo** and **Chaos** to change rhythm and visual instability.
6. Use **Demo** if you want FakeType to perform automatically while Chaos ramps upward.
7. Turn on **Storm** when you want kinetic words to fly toward the viewer.
8. Press **F** for Cinema mode.
9. Use **Export** to save the currently visible/revealed manuscript as Markdown.
10. Use **Share** to copy/share a URL that recreates the current interface settings.

## Shortcuts

| Shortcut | Action |
| --- | --- |
| Any unmodified key | advance the manuscript |
| `F` | toggle Cinema mode |
| `Ctrl/⌘ + O` | open text import |
| `Ctrl/⌘ + E` | export the visible manuscript |
| `Ctrl/⌘ + D` | toggle Demo mode |
| `Ctrl/⌘ + /` | open help |

The modifier-based shortcuts are intentional: normal letter keys remain available as fake-typing input.

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

## Export behavior

Export creates a local `.md` download containing the part of the manuscript that is **currently revealed on screen**. This makes export useful as a snapshot of a performance rather than a way to silently recover the entire hidden source document.

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
4. looks for common headings such as Abstract, Introduction, Methods, Results, Discussion, Conclusion, References, and common Chinese equivalents,
5. falls back to chunked body sections when a reliable structure cannot be detected.

This is intentionally heuristic rather than a full scholarly-document parser. Complex layouts, scanned/image-only PDFs, mathematical notation, tables, and unusual multi-column documents may still produce imperfect results.

## Privacy

Imported text and files are processed in the browser and are not uploaded by FakeType. PDF parsing uses PDF.js loaded from a public CDN; the selected PDF itself stays local to the page.

Share URLs contain interface settings only, not imported manuscript content.

## Offline / PWA behavior

`manifest.webmanifest`, `favicon.svg`, and `sw.js` make FakeType installable as a lightweight web app on supported browsers. The service worker caches the local shell (`index.html`, CSS, JavaScript, manifest, and icon) for repeat visits.

PDF.js is still loaded from a CDN, so **offline PDF importing is not guaranteed**. Built-in manuscripts, presets, text import, fake typing, export, Cinema, and Chaos effects remain local features.

## Architecture

```text
index.html               # semantic application shell
styles.css               # core paper UI, responsive layout, Cinema + Chaos states
app.js                   # typing engine, imports, audio, storm, sharing and runtime
enhancements.css          # presets/help/demo/export + Academic Breakdown styling
enhancements.js           # optional product/interaction enhancement layer
manifest.webmanifest      # installable web-app metadata
favicon.svg               # application icon
sw.js                     # offline shell cache
.github/workflows/        # syntax and static-reference validation
.nojekyll                 # GitHub Pages compatibility
README.md                 # project documentation
```

There is no framework or build step. The core engine and enhancement layer are separate so product features can evolve without destabilizing PDF/typing runtime code.

## Performance

FakeType does **not** keep a permanent animation loop alive. `requestAnimationFrame` runs only while automatic typing is active or Word Storm particles actually exist. When the page is idle, the animation loop stops.

Demo mode uses a temporary interval and restores the user's Tempo and Chaos values when it stops.

## Browser support

A current Chromium, Firefox, or Safari release is recommended. PDF import requires dynamic ES modules and Web Workers supported by modern browsers. Fullscreen behavior depends on browser permissions; the Cinema layout still works if fullscreen is unavailable. PWA installation support varies by browser/platform.

## Development

Clone the repository and serve the directory with any static file server:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

For the same basic validation used by CI:

```bash
node --check app.js
node --check enhancements.js
node --check sw.js
```

GitHub Actions also validates the manifest and required file references on every push to `main` and on pull requests.

---

FakeType is designed as a playful interface experiment around writing, performance, structure, and controlled chaos.
