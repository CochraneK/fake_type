# Changelog

All notable changes to FakeType are documented here.

## 1.0.0 — 2026-09-14

### Product
- Rebuilt the app as a direct top-level static application instead of an iframe/srcdoc bundle.
- Added clear onboarding around the core mechanic: mash random keys to reveal a manuscript.
- Added plain-text and Markdown import, drag-and-drop, and ready-made manuscript presets.
- Added PDF import with progress, cancel, academic section detection, and a two-column reading-order heuristic.
- Added English / 中文 UI, typing audio, Tempo, Chaos tiers, Word Storm, Cinema mode, Demo mode, export, and shareable URL settings.
- Added a touch-friendly interactive virtual keyboard for phones and tablets.

### Reliability and accessibility
- Stopped the animation loop while idle.
- Added reduced-motion support, skip navigation, focus styling, ARIA labels, progress semantics, and quieter screen-reader behavior.
- Added clearer guidance for scanned/image-only PDFs and an 80 MB browser-safety guard.
- Added a PWA shell with network-first navigation and stale-while-revalidate static assets.

### Engineering
- Split core runtime, product enhancements, and QA/accessibility layers into maintainable files.
- Added static GitHub Actions validation.
- Added Playwright browser smoke tests for desktop and mobile Chromium.
- Added release QA documentation, crawler metadata, sitemap, and project social card.

## Pre-1.0

The repository began as a single-file fake academic typing experiment with PDF import, bilingual UI, typing audio, and a kinetic word-storm effect.
