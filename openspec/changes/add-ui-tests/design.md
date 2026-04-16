## Context

The project has no automated tests. The server and two HTML apps (dashboard home, calculator) are all hand-written with no build step. The test suite needs to verify real browser behaviour — button clicks, DOM updates, navigation — which rules out unit-testing JS in isolation.

## Goals / Non-Goals

**Goals:**
- End-to-end browser tests for all existing behaviour defined in the specs
- Tests run with a single command (`pnpm test`) and start/stop the server automatically
- Zero configuration friction: Playwright's `webServer` option handles server lifecycle

**Non-Goals:**
- Visual regression / screenshot testing
- Performance or load testing
- Testing on multiple browsers for now (Chromium only to keep setup simple)
- Mocking or stubbing the server

## Decisions

**Playwright over other frameworks (Cypress, Puppeteer)**
Playwright is the current standard for Node.js browser automation. It has first-class `webServer` support (starts the server before tests, stops it after), a clean async API, and works well with pnpm. Cypress would add significant overhead for a project with no bundler. Puppeteer lacks a built-in test runner.

**Single spec file**
All tests live in `tests/dashboard.spec.js`. The project only has two pages; splitting into multiple files would be premature. Split when a third app is added.

**`webServer` config in `playwright.config.js`**
Playwright starts `node server.js` before the test run and waits for port 3000 to be ready. This means `pnpm test` is self-contained — no need to manually start the server first.

**CommonJS over ESM**
`server.js` and `package.json` don't set `"type": "module"`, so keeping tests as CommonJS (`.js` with `require`) avoids any module format mismatch. Playwright supports both; CJS is the safe default here.

## Risks / Trade-offs

- **Port conflict if server is already running** → Mitigation: Playwright's `webServer` has a `reuseExistingServer` option; set to `true` in dev so tests don't fail if the server is manually running.
- **Playwright browser download on first install** → Expected behaviour (`pnpm exec playwright install --with-deps chromium`); documented in tasks.
- **Flaky timing on button clicks** → Mitigation: use Playwright's built-in auto-waiting (`locator.click()` waits for the element to be actionable before proceeding).
