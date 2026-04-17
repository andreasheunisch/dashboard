## Context

The calculator is a single-page vanilla JS app in `public/calculator/index.html`. State is held in a `calc` object with properties for `currentInput`, `previousInput`, `operator`, `waitingForOperand`, and (as of the last change) `memoryValue`. All button actions call methods on `calc`; the display is updated by a shared `updateDisplay()` helper.

## Goals / Non-Goals

**Goals:**
- Add a scientific button panel (sin, cos, tan, log, ln, √, x², xʸ, π, e, ±, %, parentheses)
- Unary functions execute immediately on the current display value
- `xʸ` (power) integrates with the existing operator pipeline
- Parentheses enable sub-expression grouping
- Invalid inputs (e.g. `√(-1)`, `log(0)`) display `Error`

**Non-Goals:**
- Full expression parser / infix precedence engine (stays a simple two-operand model, extended for grouping)
- Graphing, unit conversion, or history features
- Mobile-specific layout changes

## Decisions

**Unary functions modify `currentInput` in place**
Simpler than introducing a new operator pipeline stage. The function reads the display value as a float, applies `Math.*`, and writes the result back. Consistent with how `±` and `%` will work.
- Alternative considered: queue functions like operators — rejected, adds complexity with no benefit for single-argument functions.

**`xʸ` reuses the existing operator slot**
Store `'pow'` in `calc.operator` and evaluate via `Math.pow(prev, current)` in the `=` handler. No new state needed.
- Alternative: dedicated `powerBase` field — unnecessary given the existing operator model.

**Parentheses via expression string accumulation**
Track an `expressionBuffer` string alongside `currentInput`. Opening `(` starts a sub-expression; `)` evaluates it with `Function('return ' + buffer)()` (safe — no external input). Parentheses are the only feature that needs an expression buffer; everything else stays numeric.
- Alternative: full recursive descent parser — overkill for the scope.

**Angles in radians**
`Math.sin/cos/tan` operate in radians. No degree/radian toggle in scope. A tooltip on each button will note "rad".
- Alternative: always degrees — breaks standard calculator convention.

**Layout: collapsible scientific panel**
Add a `<div class="sci-panel">` above the main grid, revealed by a `[sci]` toggle button. Keeps the basic layout clean for casual users.
- Alternative: always-visible expanded grid — clutters the UI.

## Risks / Trade-offs

- `Function('return …')()` for parenthesis evaluation is eval-adjacent → Mitigation: only ever called on the internally-built `expressionBuffer` (user keystrokes, not raw text input); no XSS surface.
- Floating-point display for trig results (e.g. `sin(π)` ≈ `1.2246e-16` instead of `0`) → Mitigation: round to 10 significant figures before display.
- Adding buttons increases layout width on small screens → out of scope for this change; noted for follow-up.

## Open Questions

- Should `π` and `e` replace the display value or append? → Decision: replace (treat like digit `0` press on a fresh state).
