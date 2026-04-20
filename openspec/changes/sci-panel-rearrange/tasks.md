## 1. HTML Structure — Consolidate to One Panel

- [x] 1.1 Replace `#sci-panel` and `#sci-panel-2` with a single `<div id="sci-panel" hidden>` that contains two inner grid wrappers: `<div class="sci-row-ab">` (rows 1–2, 12 buttons) and `<div class="sci-row-c">` (row 3, 7 buttons)
- [x] 1.2 Remove the `<span id="angle-unit-label">` element entirely
- [x] 1.3 Add `id="btn-angle-unit"` to the RAD/GON/DEG toggle button and place it as the **first** button inside `sci-row-ab`
- [x] 1.4 Populate `sci-row-ab` in order: btn-angle-unit (RAD), x², xʸ, sin, cos, tan *(row 1)*, ln, √, 1/x, arcsin, arccos, arctan *(row 2)*
- [x] 1.5 Populate `sci-row-c` in order: log, %, (, ), π, e, ±

## 2. CSS — Update Grid Definitions

- [x] 2.1 Add `.sci-row-ab { display: grid; grid-template-columns: repeat(6, 1fr); gap: 0.35rem; }` (replaces the old 7-column `.sci-panel` rule)
- [x] 2.2 Add `.sci-row-c { display: grid; grid-template-columns: repeat(7, 1fr); gap: 0.35rem; }` (replaces the old 5-column `.sci-panel.row-4` rule)
- [x] 2.3 Update `#sci-panel` to use `display: flex; flex-direction: column; gap: 0.35rem` when visible (so the two inner grids stack with consistent spacing)
- [x] 2.4 Remove the now-unused `.sci-panel.row-4` CSS rule and the `#angle-unit-label` CSS rule

## 3. JavaScript — Update `toggleSci`

- [x] 3.1 Simplify `toggleSci()` to toggle only `#sci-panel` hidden attribute (remove all references to `#sci-panel-2` and `#angle-unit-label`)
- [x] 3.2 Remove the line that sets `label.style.display` and `label.textContent`

## 4. JavaScript — Update `toggleAngleUnit`

- [x] 4.1 Replace the `document.querySelector('#sci-panel-2 button:last-child')` selector with `document.getElementById('btn-angle-unit')`
- [x] 4.2 Remove the `document.getElementById('angle-unit-label').textContent = this.angleUnit` update (label element is gone)
- [x] 4.3 Verify the toggle button text updates correctly when cycling RAD → GON → DEG → RAD
