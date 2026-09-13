# Contributing to FakeType

Thanks for helping improve FakeType. The project intentionally stays framework-free and deploys directly as static files on GitHub Pages.

## Local development

Serve the repository root with any static server:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

For browser tests:

```bash
npm install
npx playwright install chromium
npm test
```

## Architecture boundaries

- `app.js` contains the core typing/import/audio/storm runtime.
- `enhancements.js` contains optional product features such as presets, Demo, export, and help.
- `qa.js` contains accessibility, touch interaction, and browser-safety guardrails.
- Keep the core engine independent from optional presentation features where practical.

## Before opening a pull request

1. Run the JavaScript syntax checks used by CI.
2. Run `npm test` and make sure both desktop and mobile Chromium smoke tests pass.
3. Check `QA.md` for the manual release checklist when changing layout, PDF import, PWA behavior, or accessibility.
4. Avoid adding a framework or build step unless the benefit clearly outweighs the project's current zero-build simplicity.
5. Keep imported documents local to the browser; do not introduce uploads or analytics that capture user manuscript content without explicit product discussion.

## Pull requests

Keep changes focused and explain the user-visible behavior. Include screenshots or recordings when a visual change is substantial. If a change affects keyboard interaction, verify both physical keyboard and touch/virtual-keyboard paths.
