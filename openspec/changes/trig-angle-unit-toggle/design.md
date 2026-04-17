## Context

The calculator is a single self-contained HTML file (`public/calculator/index.html`) with all logic in an inline `<script>` block. The `calc` object holds all state. Trigonometric functions are implemented via `applyUnary` with `Math.sin`, `Math.cos`, `Math.tan` — which always expect radians. There is currently no angle-unit state.

The scientific panel is toggled with `[sci]`/`[basic]`. Two panels exist (`sci-panel`, `sci-panel-2`). The second panel (`row-4`) holds ±, %, (, ).

## Goals / Non-Goals

**Goals:**
- Add an angle-unit toggle button cycling DEG → RAD → GON, visible only in scientific mode
- Show the active unit as a persistent small label on the calculator
- Convert the input angle to radians before passing to `Math.sin/cos/tan` based on the active unit

**Non-Goals:**
- Inverse trig functions (asin, acos, atan) — not in scope
- Persisting the unit setting across page reloads
- Any unit other than DEG, RAD, GON

## Decisions

### Decision 1: Store angle unit on the `calc` object

A single `calc.angleUnit` property (`'RAD'` | `'DEG'` | `'GON'`) defaults to `'RAD'`. A `toggleAngleUnit()` method cycles through the three values.

**Alternatives considered:**
- Module-level variable — works but is inconsistent with how all other state is held
- CSS class on a DOM element as source of truth — inverts the model; DOM should reflect state, not hold it

### Decision 2: Conversion at the call site of sin/cos/tan only

A private `toRadians(x)` helper converts the display value before it reaches `Math.sin/cos/tan`. All other functions are unaffected.

```
DEG → rad: x * π / 180
GON → rad: x * π / 200
RAD → rad: identity
```

**Rationale:** Conversion in one place means the spec for each trig function only needs one extra sentence rather than duplicating conversion logic everywhere.

### Decision 3: Toggle button placed in `sci-panel-2` (the ±/% row)

The existing row already has 4 buttons in a 4-column grid. The toggle button becomes a 5th item, requiring the grid to expand to 5 columns when visible (matching `sci-panel`).

**Alternatives considered:**
- New third panel row — adds vertical height and an extra DOM element to hide/show
- Inside `sci-panel` (the sin/cos/tan row) — already full at 10 buttons across 2 columns of 5

### Decision 4: Unit indicator label sits between the display and the sci-panel

A small `<span id="angle-unit-label">` rendered below the display, visible only when the sci panel is open. Updated on every toggle and on `[sci]` open.

**Rationale:** Keeps the label spatially associated with the display (where trig results appear) rather than with the buttons.

## Risks / Trade-offs

- [Risk] GON (gradians) is unfamiliar to most users → Mitigation: the label always shows the active unit clearly; no additional explanation needed in the UI
- [Trade-off] Unit resets to RAD on page reload — acceptable for a stateless single-page tool
