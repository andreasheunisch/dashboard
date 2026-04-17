## Context

The calculator is a single self-contained HTML file (`public/calculator/index.html`) with all logic in an inline `<script>` block. The `calc` object holds all state. Scientific functions are implemented via `applyUnary` callbacks.

The sci-panel currently has 10 buttons in a 5-column grid (sin, cos, tan, log, ln, √, x², xʸ, π, e). A second panel (`sci-panel-2`) holds 5 buttons (±, %, (, ), angle-unit toggle) also in 5 columns. Adding 4 buttons (arcsin, arccos, arctan, 1/x) means the first panel grows to 14 buttons.

Angular unit conversion already exists via `calc.toRadians(x)`. The inverse trig functions (`Math.asin`, `Math.acos`, `Math.atan`) always return radians; their results must be converted from radians to the active unit before display.

## Goals / Non-Goals

**Goals:**
- Add arcsin, arccos, arctan buttons with angular-unit awareness (input in radians → convert result to active unit)
- Add 1/x (reciprocal) button with divide-by-zero guard
- Keep the layout clean with no horizontal scrolling

**Non-Goals:**
- atan2 (two-argument arctangent) — not in scope
- Hyperbolic functions (sinh, cosh, tanh) — separate change
- Any change to `toRadians` or the angle-unit toggle behaviour

## Decisions

### Decision 1: Place all 4 new buttons in `sci-panel` (row 1), expanding to 14 buttons

14 buttons at 5 columns = 2 full rows + 4 buttons on a third row. That looks unbalanced. Better option: **7 columns**, giving exactly 2 rows of 7.

**Alternatives considered:**
- Keep 5 columns → 3 rows (2 full + 1 partial) — asymmetric, wastes space
- New third panel — adds more toggle complexity and vertical height
- Split into two 7-button panels — unnecessary DOM complexity

**Chosen:** Change `sci-panel` grid to `repeat(7, 1fr)`. Button order: sin, cos, tan, arcsin, arccos, arctan, 1/x, log, ln, √, x², xʸ, π, e.

### Decision 2: Result conversion for inverse trig — `fromRadians(x)` helper

`Math.asin/acos/atan` return radians. A `fromRadians(x)` helper on `calc` converts the result to the active unit before `applyUnary` stores it.

```
rad → DEG: x * 180 / π
rad → GON: x * 200 / π
rad → RAD: identity
```

**Alternatives considered:**
- Inline conversion in each button's onclick — duplicates the formula three times
- Inverse of `toRadians` using the same function — cleaner but naming would be confusing

### Decision 3: Domain validation for arcsin/arccos via NaN guard in `applyUnary`

`Math.asin(x)` returns `NaN` for |x| > 1; `applyUnary` already maps `isNaN(result)` to `Error`. No additional guard needed — the existing pattern handles it.

## Risks / Trade-offs

- [Risk] 7-column grid makes buttons narrower on the 280px calculator — each cell ≈ 34px. Mitigation: reduce horizontal padding on `.btn-sci-fn` for the sci-panel or accept the compact look; trig abbreviations (sin, cos, arcsin) are short enough.
- [Trade-off] arcsin label is 5 chars vs sin's 3 — slightly asymmetric visual weight. Acceptable at this scale.
