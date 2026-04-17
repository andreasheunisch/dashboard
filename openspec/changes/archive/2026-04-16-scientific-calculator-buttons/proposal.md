## Why

The calculator currently handles only basic arithmetic (+, −, ×, ÷) and memory operations. Users who need trigonometry, logarithms, powers, or square roots must leave the app, reducing its utility for technical work.

## What Changes

- Add a scientific button panel with: `sin`, `cos`, `tan`, `log`, `ln`, `√`, `x²`, `xʸ`, `π`, `e`, `(`, `)`, `±`, `%`
- Scientific functions operate on the current display value and immediately replace it with the result
- `xʸ` (power) works like an operator: stores the base, waits for the exponent, evaluates on `=`
- Parentheses enable sub-expression grouping in the input
- `±` toggles the sign of the current value; `%` divides the current value by 100
- All scientific functions show `Error` when the input is mathematically invalid (e.g. `√` of a negative, `log` of zero)

## Capabilities

### New Capabilities

- `scientific-functions`: Scientific unary functions (sin, cos, tan, log, ln, √, x², π, e, ±, %) and the binary power operator (xʸ) with parenthesis support

### Modified Capabilities

- `calculator-app`: Existing calculator requirements are unchanged; the UI gains a new scientific button panel

## Impact

- `public/calculator/index.html` — add scientific button markup and JS handlers
- `tests/dashboard.spec.js` — new test group for scientific function behaviour
- No new dependencies; all math via the built-in `Math` object
