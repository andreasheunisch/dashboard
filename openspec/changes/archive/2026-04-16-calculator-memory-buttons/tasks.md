## 1. Calculator JS — Memory State & Logic

- [x] 1.1 Add `memoryValue: 0` to the `calc` state object in `public/calculator/index.html`
- [x] 1.2 Implement `calc.memoryAdd()`: parse `currentInput` as float and add to `memoryValue`; no-op if `currentInput === 'Error'`
- [x] 1.3 Implement `calc.memoryRecall()`: set `currentInput` to `memoryValue.toString()` and update display; set `waitingForOperand` to `false`
- [x] 1.4 Implement `calc.memoryClear()`: reset `memoryValue` to `0`

## 2. Calculator HTML — Memory Button Row

- [x] 2.1 Add a new button row above the existing rows with `MC`, `MR`, and `M+` buttons wired to their respective `calc.*` methods
- [x] 2.2 Style the memory buttons distinctly from digit and operator buttons (e.g. muted/secondary colour)

## 3. Update Tests

- [x] 3.1 Add a `Calculator memory` test group to `tests/dashboard.spec.js`
- [x] 3.2 Write test: `M+` stores value — enter `5`, press `M+`, press `C`, press `MR`, display shows `5`
- [x] 3.3 Write test: `MC` clears memory — enter `5`, press `M+`, press `MC`, press `MR`, display shows `0`
- [x] 3.4 Write test: `M+` accumulates — enter `3`, press `M+`, enter `4`, press `M+`, press `C`, press `MR`, display shows `7`

## 4. Verification

- [x] 4.1 Run `pnpm test` and confirm all tests (existing + new memory tests) pass
