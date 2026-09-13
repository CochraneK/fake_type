# Security Policy

FakeType is a static, client-side application. Imported text and PDFs are intended to remain in the browser; protecting that property is a core project expectation.

## Supported version

Security fixes target the current `main` branch and the latest published GitHub Pages deployment.

## Reporting a vulnerability

Please do **not** publish sensitive exploit details in a public issue. Prefer GitHub's private vulnerability reporting for this repository if it is available. If private reporting is not available, contact the repository owner through their GitHub profile before sharing exploit details publicly.

Useful reports include:

- a concise description of the issue,
- affected browser/version,
- exact reproduction steps,
- whether imported manuscript/PDF content can leave the browser,
- any proof-of-concept that is safe to share privately.

## Security boundaries

The project should not silently upload imported documents, add analytics that capture manuscript content, or broaden remote-script permissions without explicit review. PDF.js is the main third-party runtime dependency and is loaded from a pinned public CDN version.
