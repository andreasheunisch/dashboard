## Why

The current scientific panel splits 19 buttons across two rows of 7 and one row of 5, mixing unrelated functions. The new layout groups buttons thematically: power/trig on row 1, inverse-trig/roots on row 2, logarithms/utilities on row 3 — making the panel easier to scan and use.

## What Changes

- The two existing sci-panel divs are consolidated into one panel with three rows
- Button order (left to right, top to bottom):
  - **Row 1 (6):** RAD/GON/DEG toggle, x², xʸ, sin, cos, tan
  - **Row 2 (6):** ln, √, 1/x, arcsin, arccos, arctan
  - **Row 3 (7):** log, %, (, ), π, e, ±
- The separate `#angle-unit-label` span is removed; the toggle button already displays the active unit (RAD/GON/DEG) so the label is redundant
- CSS grid is updated to accommodate the new 3-row structure (6-column grid for rows 1–2, 7-column row 3, or a single adaptive grid)
- The `toggleSci` JS function is simplified to toggle one panel instead of two

## Capabilities

### New Capabilities
<!-- No new capabilities — all buttons already exist -->

### Modified Capabilities
- `keyboard-navigation`: The "ArrowUp from top sci-panel row focuses the display" scenario must name the new top-row buttons (RAD/toggle, x², xʸ, sin, cos, tan)
- `scientific-functions`: The "Active angle unit is shown as a label on the display" requirement is updated — the label is now the toggle button itself (which always shows the current unit), not a separate span element

## Impact

- `public/calculator/index.html`: HTML restructure (two panels → one), CSS grid update, `toggleSci()` simplified, `#angle-unit-label` element removed, `toggleAngleUnit()` label update call removed
- No server changes, no new dependencies
