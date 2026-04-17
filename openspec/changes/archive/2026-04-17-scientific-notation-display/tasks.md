## 1. Display Formatting Helper

- [ ] 1.1 Add a `formatDisplay(value)` function in `public/calculator/index.html` that: returns `value` unchanged if it is `"Error"` or `"0"`; parses the value as a float; returns the plain string if `|x| >= 1e-6 && |x| < 1e10` (or `x === 0`); otherwise calls `n.toExponential(5)`, strips trailing zeros from the significand, uppercases `e`, and ensures the exponent has a sign (e.g. `1.25E+7`)
- [ ] 1.2 Verify `formatDisplay` handles edge cases: `Infinity`, `NaN`, negative numbers, and `"0"` all pass through or return `"Error"` as appropriate

## 2. Wire formatDisplay into the Display Update Path

- [ ] 2.1 Identify all places in `public/calculator/index.html` where the display DOM element's text is set (e.g. `display.textContent = ...` or equivalent)
- [ ] 2.2 Wrap each such assignment with `formatDisplay(...)` so every displayed value goes through the formatter
- [ ] 2.3 Remove any existing ellipsis truncation logic (e.g. length checks that append `...`)

## 3. Tests

- [ ] 3.1 Add a `Scientific notation display` test group in `tests/dashboard.spec.js`
- [ ] 3.2 Write test: `9999999999 + 1 =` → display shows `1E+10`
- [ ] 3.3 Write test: `1 ÷ 10000000 =` (1e-7) → display shows `1E-7`
- [ ] 3.4 Write test: `12345 + 0 =` → display shows `12345` (no scientific notation for normal range)
- [ ] 3.5 Write test: `1.5 × 10000000000 =` (1.5e10) → display shows `1.5E+10` (trailing zeros stripped)
- [ ] 3.6 Write test: display never contains `...` for any computed result

## 4. Verification

- [ ] 4.1 Run `pnpm test` and confirm all tests (existing + new) pass
