## 1. Install Playwright

- [x] 1.1 Add `@playwright/test` as a dev dependency: `pnpm add -D @playwright/test`
- [x] 1.2 Install the Chromium browser: `pnpm exec playwright install --with-deps chromium`

## 2. Playwright Configuration

- [x] 2.1 Create `playwright.config.js` with `webServer` pointing to `node server.js` on port 3000 (`reuseExistingServer: true`)
- [x] 2.2 Set `testDir: 'tests'` and `use: { baseURL: 'http://localhost:3000' }` in config

## 3. Test Scripts

- [x] 3.1 Add `"test": "playwright test"` script to `package.json`
- [x] 3.2 Add `"test:ui": "playwright test --ui"` script to `package.json`

## 4. Write Tests

- [x] 4.1 Create `tests/` directory and `tests/dashboard.spec.js`
- [x] 4.2 Write home page tests: page title is "Dashboard", calculator card with link to `/calculator` is visible
- [x] 4.3 Write calculator load tests: page title contains "Calculator", display shows `0`, all operator/control buttons are present
- [x] 4.4 Write arithmetic tests: `3 + 4 =` → `7`, `5 ÷ 0 =` → `Error`, `99 C` → `0`
- [x] 4.5 Write routing test: HTTP request to `/nonexistent` returns status `404`

## 5. Verification

- [x] 5.1 Run `pnpm test` and confirm all tests pass with no server running beforehand
- [x] 5.2 Confirm test output shows each named test as passed
