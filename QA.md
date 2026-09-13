# FakeType release QA

Use this checklist before treating a `main` commit as a release-quality build.

## Core interaction

- Random letter keys advance the manuscript.
- Space / Enter / Backspace do not trigger browser navigation while typing.
- Auto mode starts, pauses, and stops at completion.
- Reset returns title, sections, feed, and progress to the initial state.
- Tempo changes auto-typing cadence.
- Chaos changes revision frequency and the visual intensity tier.
- Sound and Storm toggles preserve their pressed state.

## Import

- Plain text can be pasted and used as one body section.
- Markdown `#` title and `##` headings become manuscript structure.
- `.txt` and `.md` files work by drag and drop.
- PDF import shows progress and can be canceled.
- Typical one-column academic PDFs preserve readable order.
- Typical two-column academic PDFs preserve left-to-right column order well enough to read.
- Image-only/scanned PDFs produce an OCR-oriented explanation instead of an ambiguous failure.
- PDFs above 80 MB are blocked with a browser-safety message.

## Presentation

- Demo mode starts and restores the previous Tempo / Chaos values when stopped.
- Cinema mode works even when fullscreen permission is denied.
- `F` exits/enters Cinema outside form controls and dialogs.
- Academic Breakdown remains readable with reduced motion respected.
- Export downloads only the currently revealed manuscript.
- Share URLs reproduce interface settings without embedding imported document text.

## Responsive / touch

Check at approximately 360 px, 390 px, 768 px, and desktop widths.

- Top controls stay on one horizontally scrollable row on narrow screens.
- Primary controls remain reachable without forcing a multi-row header.
- Touch targets are at least roughly 44 px high on coarse-pointer devices.
- Dialog content stays within the viewport and scrolls internally when necessary.
- Text import retains a usable editing height on phones.
- PDF progress and cancel controls stack cleanly on narrow screens.

## Accessibility

- Tab focus is clearly visible.
- A keyboard-visible “Skip to manuscript” link appears when focused.
- Icon-only mobile controls retain descriptive `aria-label` values.
- Main manuscript and PDF progress bars expose progressbar semantics and values.
- Keyboard activity is exposed as a visualization rather than a group of interactive keys.
- Built-in shortcuts expose `aria-keyshortcuts` metadata where practical.
- `prefers-reduced-motion` disables decorative transition/animation behavior.

## PWA / offline shell

- Manifest parses successfully.
- Service worker installs on HTTPS / GitHub Pages.
- Reloading after the first visit can open the local application shell offline.
- Navigations use network-first so deployed updates are not trapped behind stale cache.
- Static shell assets use stale-while-revalidate.
- Offline PDF parsing is not guaranteed because PDF.js is loaded from a CDN.

## Automated checks

GitHub Actions currently verifies:

```bash
node --check app.js
node --check enhancements.js
node --check qa.js
node --check sw.js
```

It also validates `manifest.webmanifest`, required files, page references, and QA assets in the service-worker cache list.

## Known limits

- PDF structure detection is heuristic rather than a full scholarly-document parser.
- Scanned PDFs require OCR before FakeType can use their text.
- Complex tables, equations, unusual multi-column layouts, and heavily positioned PDFs may have imperfect reading order.
- Fullscreen, Web Share, clipboard, and PWA installation support vary across browsers and operating systems.
