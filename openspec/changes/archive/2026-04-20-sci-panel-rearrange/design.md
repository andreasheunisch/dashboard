## Context

The calculator has two sci-panel `<div>`s (`#sci-panel` with 7 columns, `#sci-panel-2` with 5 columns) plus a `#angle-unit-label` span. The `toggleSci()` method toggles both panels and the label. The `toggleAngleUnit()` method updates both the label span and the last button of `#sci-panel-2`.

## Goals / Non-Goals

**Goals:**
- Single consolidated panel, three rows in the specified order
- Toggle button is the unit indicator (no separate label element)
- Arrow navigation naturally correct via geometry (no hardcoding)

**Non-Goals:**
- Changing any button's function or calculation logic
- Reordering the main (non-sci) button grid

## Decisions

**Single panel div, two CSS grids via inner wrappers — OR — one 6-column grid with ± spanning row 3**

Row 1 and 2 have 6 buttons; row 3 has 7. Options:
1. **One 6-column grid, ± on a separate mini-row** — clean, but ± looks orphaned
2. **One 7-column grid, rows 1–2 leave last cell empty** — wastes space visibly
3. **Two inner wrappers**: a 6-column `div` holding rows 1–2 (12 buttons), a 7-column `div` holding row 3 (7 buttons), both inside one outer `#sci-panel`

Option 3 is cleanest visually and matches the current two-panel pattern. The outer `#sci-panel` becomes a flex column; the two inner grids each have their own `grid-template-columns`. This also means `toggleSci()` just toggles `#sci-panel[hidden]` — one DOM operation.

**Toggle button as unit indicator**

The toggle button already renders the current unit as its text content (RAD/GON/DEG). The `toggleAngleUnit()` method currently updates two places: `#angle-unit-label` and the last button of `#sci-panel-2`. After this change it only needs to update the toggle button (`#btn-sci-angle` or whichever ID it gets).

The `#angle-unit-label` span and all code that shows/hides it are removed.

**Button ID for the toggle**

The toggle was the last button in `#sci-panel-2` with no ID. Give it a stable ID (e.g. `#btn-angle-unit`) so `toggleAngleUnit()` can reference it directly by ID instead of a fragile `querySelector` selector.

**Arrow navigation**

The spatial `navigateButtons()` algorithm uses `getBoundingClientRect()` and requires no changes — the new layout is reflected automatically in the geometry. The spec scenario needs updating to name the correct top-row buttons for documentation/testing purposes.

## Risks / Trade-offs

- **`toggleAngleUnit()` uses `document.querySelector('#sci-panel-2 button:last-child')`** — this selector breaks after the restructure. Mitigation: assign a stable `id` to the toggle button and update the query.
- **`toggleSci()` currently reads `panel.hidden` to sync two panels** — after consolidation it only needs to toggle one element; the simplified logic is less error-prone.
- **CSS gap/padding on inner wrappers** — the two inner grids should inherit the same `gap: 0.35rem` as the current sci panels to maintain visual consistency.
