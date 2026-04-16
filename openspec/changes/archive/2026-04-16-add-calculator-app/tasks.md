## 1. Generalize Static File Serving in server.js

- [x] 1.1 Replace the hardcoded `GET /` handler with a general file resolver: map request path to a file under `public/`, treating `/` and directory paths as `index.html`
- [x] 1.2 Add a path traversal guard (normalize path, assert it starts with the `public/` absolute path)
- [x] 1.3 Infer and set `Content-Type` header based on file extension (`.html` → `text/html`, `.css` → `text/css`, `.js` → `application/javascript`)
- [x] 1.4 Return `404` for paths that resolve to no file, `500` on read errors

## 2. Calculator App

- [x] 2.1 Create `public/calculator/` directory and `public/calculator/index.html`
- [x] 2.2 Add calculator HTML structure: display area, digit buttons (0–9), decimal point, operator buttons (+, −, ×, ÷), equals (`=`), and clear (`C`)
- [x] 2.3 Style the calculator with embedded CSS: grid layout for buttons, distinct styling for operators vs digits, readable display
- [x] 2.4 Implement calculator logic in embedded `<script>`: state (`currentInput`, `previousInput`, `operator`), digit/decimal input, operator selection
- [x] 2.5 Implement `=` evaluation: compute result, handle divide-by-zero by showing `Error`
- [x] 2.6 Implement `C` (clear): reset all state and display to `0`

## 3. Dashboard Navigation on Home Page

- [x] 3.1 Update `public/index.html` to replace the hello card with a dashboard header and an app navigation section
- [x] 3.2 Add a calculator app card with name, short description, and link to `/calculator`

## 4. Verification

- [x] 4.1 Start server and confirm `GET /` loads the updated home page with the calculator card
- [x] 4.2 Click the calculator card and confirm it navigates to `/calculator` and loads the calculator UI
- [x] 4.3 Test basic arithmetic: enter `3 + 4 =` and confirm display shows `7`
- [x] 4.4 Test divide by zero: enter `5 ÷ 0 =` and confirm display shows `Error`
- [x] 4.5 Test clear: enter some digits, press `C`, confirm display resets to `0`
- [x] 4.6 Confirm `GET /nonexistent` returns `404`
