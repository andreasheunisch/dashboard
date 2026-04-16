## Why

As the dashboard grows with more apps, there is no automated way to verify that existing features still work after changes. Adding a UI test suite now — while the project is still small — establishes a safety net and a pattern that every future app can follow.

## What Changes

- New `tests/` directory with a Playwright test suite
- Test scripts added to `package.json` (`test`, `test:ui`)
- Playwright installed as a dev dependency (via pnpm)
- Tests covering the dashboard home page, calculator app, and server routing (404)

## Capabilities

### New Capabilities

- `ui-test-suite`: An automated browser test suite (Playwright) that verifies the dashboard home page renders correctly, the calculator app loads and performs basic arithmetic, divide-by-zero shows "Error", the clear button resets the display, and unknown routes return 404

### Modified Capabilities

<!-- none — existing specs describe behaviour, not how it is tested -->

## Impact

- New dev dependency: `@playwright/test` (installed via pnpm)
- New files: `tests/dashboard.spec.js`, `playwright.config.js`
- `package.json`: new `test` and `test:ui` scripts
- No changes to `server.js` or any `public/` files
- CI: tests require the server to be running (Playwright webServer config handles this automatically)
