## 1. Scientific State & Helpers

- [ ] 1.1 Add `expressionBuffer: ''` and `parenDepth: 0` to the `calc` state object in `public/calculator/index.html`
- [ ] 1.2 Add a `roundResult(n)` helper that rounds a float to 10 significant figures (handles near-zero trig noise)
- [ ] 1.3 Extend the `=` handler to support `'pow'` as an operator using `Math.pow(prev, current)`

## 2. Unary Scientific Functions

- [ ] 2.1 Implement `calc.applyUnary(fn)`: parse `currentInput` as float, apply `fn`, round via `roundResult`, update display; no-op if `currentInput === 'Error'`
- [ ] 2.2 Wire `sin` → `calc.applyUnary(x => Math.sin(x))`
- [ ] 2.3 Wire `cos` → `calc.applyUnary(x => Math.cos(x))`
- [ ] 2.4 Wire `tan` → `calc.applyUnary(x => Math.tan(x))`
- [ ] 2.5 Wire `log` → `calc.applyUnary(x => x <= 0 ? NaN : Math.log10(x))`; display `Error` on `NaN`
- [ ] 2.6 Wire `ln` → `calc.applyUnary(x => x <= 0 ? NaN : Math.log(x))`; display `Error` on `NaN`
- [ ] 2.7 Wire `√` → `calc.applyUnary(x => x < 0 ? NaN : Math.sqrt(x))`; display `Error` on `NaN`
- [ ] 2.8 Wire `x²` → `calc.applyUnary(x => x * x)`
- [ ] 2.9 Wire `±` → negate `currentInput` (no-op on `0` or `Error`)
- [ ] 2.10 Wire `%` → `calc.applyUnary(x => x / 100)`

## 3. Constants & Power Operator

- [ ] 3.1 Implement `calc.insertConstant(val)`: set `currentInput` to `val.toString()` and update display; set `waitingForOperand` to `false`
- [ ] 3.2 Wire `π` → `calc.insertConstant(Math.PI)`
- [ ] 3.3 Wire `e` → `calc.insertConstant(Math.E)`
- [ ] 3.4 Wire `xʸ` → store current value in `previousInput`, set `operator` to `'pow'`, set `waitingForOperand` to `true`

## 4. Parentheses

- [ ] 4.1 Implement `calc.openParen()`: append `(` to `expressionBuffer`, increment `parenDepth`, clear display for new sub-expression
- [ ] 4.2 Implement `calc.closeParen()`: if `parenDepth === 0` show `Error`; otherwise append current input + `)` to `expressionBuffer`, evaluate buffer with `Function('return ' + buffer)()`, display rounded result, decrement `parenDepth`

## 5. HTML — Scientific Button Panel

- [ ] 5.1 Add a `<button id="btn-sci">[sci]</button>` toggle button to the calculator header area
- [ ] 5.2 Add a `<div class="sci-panel" hidden>` containing rows for: `sin cos tan log ln`, `√ x² xʸ π e`, `± % ( )`
- [ ] 5.3 Wire the `[sci]` toggle to show/hide `.sci-panel` and update button label
- [ ] 5.4 Style `.sci-panel` buttons distinctly (e.g. a muted blue/teal) to differentiate from digit and operator buttons

## 6. Tests

- [ ] 6.1 Add a `Scientific calculator` test group to `tests/dashboard.spec.js`
- [ ] 6.2 Write test: `sin(0)` → `0`; open sci panel, enter 0, press sin, verify display
- [ ] 6.3 Write test: `cos(0)` → `1`
- [ ] 6.4 Write test: `log(100)` → `2`
- [ ] 6.5 Write test: `log(0)` → `Error`
- [ ] 6.6 Write test: `√(9)` → `3`
- [ ] 6.7 Write test: `√(-1)` → `Error`
- [ ] 6.8 Write test: `x²` of `5` → `25`
- [ ] 6.9 Write test: `2 xʸ 8 =` → `256`
- [ ] 6.10 Write test: `π` inserts `3.141592653589793`
- [ ] 6.11 Write test: `±` negates `5` → `-5`
- [ ] 6.12 Write test: `%` of `50` → `0.5`
- [ ] 6.13 Write test: `(3 + 4)` → `7`
- [ ] 6.14 Write test: unmatched `)` → `Error`
- [ ] 6.15 Write test: `sin(π)` rounds to `0` (not near-zero float)

## 7. Verification

- [ ] 7.1 Run `pnpm test` and confirm all tests (existing + new scientific tests) pass
