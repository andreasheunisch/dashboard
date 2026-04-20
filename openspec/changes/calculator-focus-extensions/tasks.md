## 1. Extend Spatial Navigation to Include the Display

- [ ] 1.1 In `navigateButtons(direction)`, extend the candidate collection to include the display input alongside focusable buttons: build a list of `{ el, rect }` objects for all visible buttons plus the display element
- [ ] 1.2 After picking the nearest candidate in the pressed direction, call `candidate.el.focus()` — this works for both `<button>` and `<input>` elements without special-casing
- [ ] 1.3 Verify that ArrowDown from `#btn-sci` naturally routes to the display (geometry-driven; no hardcoded element IDs needed)
- [ ] 1.4 Verify that ArrowUp from the top sci-panel row (sin, cos, tan, arcsin, arccos, arctan, 1/x) naturally routes to the display

## 2. Backspace from Button Focus

- [ ] 2.1 In the `keydown` handler's Backspace case, change the condition from `if (document.activeElement === display)` to a two-branch check:
  - If `document.activeElement === display` → `calc.deleteAt('backward')` (existing behaviour, unchanged)
  - Else if `document.activeElement` is a button (not a suppressed form element) → focus display at end, then `calc.deleteAt('backward')`
- [ ] 2.2 "Focus display at end" sequence: `display.focus()` then `display.setSelectionRange(display.value.length, display.value.length)`
- [ ] 2.3 Ensure `e.preventDefault()` is called in both branches

## 3. Del from Button Focus

- [ ] 3.1 In the `keydown` handler's Delete case, apply the same two-branch pattern:
  - If `document.activeElement === display` → `calc.deleteAt('forward')` (existing behaviour, unchanged)
  - Else if `document.activeElement` is a button → focus display at position 0, then `calc.deleteAt('forward')`
- [ ] 3.2 "Focus display at pos 0" sequence: `display.focus()` then `display.setSelectionRange(0, 0)`
- [ ] 3.3 Ensure `e.preventDefault()` is called in both branches
