## 1. Keyboard Event Handler

- [x] 1.1 Add a `keydown` event listener on `document` in `public/calculator/index.html`
- [x] 1.2 Implement guard: skip handler if `document.activeElement` is an `INPUT`, `TEXTAREA`, `SELECT`, or `BUTTON`
- [x] 1.3 Map digit keys `0`–`9` to `calc.inputDigit(e.key)`
- [x] 1.4 Map `.` key to `calc.inputDecimal()`
- [x] 1.5 Map `+` key to `calc.inputOperator('+')`
- [x] 1.6 Map `-` key to `calc.inputOperator('−')` (Unicode minus `\u2212`)
- [x] 1.7 Map `*` key to `calc.inputOperator('×')`
- [x] 1.8 Map `/` key to `calc.inputOperator('÷')` and call `e.preventDefault()`
- [x] 1.9 Map `=` and `Enter` keys to `calc.evaluate()`
