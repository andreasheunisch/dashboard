## 1. Display Element Migration

- [x] 1.1 Replace `<div class="display" id="display">0</div>` with `<input type="text" class="display" id="display" value="0" spellcheck="false" autocomplete="off">`
- [x] 1.2 Update `.display` CSS to remove `text-align: right` conflict and add `border: none; outline: none; background: transparent; width: 100%; text-align: right` so the input looks identical to the old div
- [x] 1.3 Add CSS rules `#display { caret-color: transparent; }` and `#display:focus { caret-color: auto; }` for caret visibility management
- [x] 1.4 Update `updateDisplay()` to set `display.value` instead of `display.textContent`
- [x] 1.5 Add an `input` event listener on the display that calls `e.preventDefault()` and resets `display.value` to `formatDisplay(calc.currentInput)` to prevent direct user edits

## 2. Cursor-Aware Digit Insertion

- [x] 2.1 Add `calc.startNewEntry(digit)` method: sets `this.waitingForOperand = true`, calls `this.inputDigit(digit)`, then calls `display.focus()`
- [x] 2.2 Modify `inputDigit(digit)` to check if `display === document.activeElement`; if so, insert `digit` at `display.selectionStart` within `this.currentInput` rather than appending, then restore the cursor one position forward with `display.setSelectionRange()`
- [x] 2.3 Modify `inputDecimal()` similarly: if display is focused, insert `.` at cursor position (if not already present before the cursor position)

## 3. Revised Keydown Guard and Routing

- [x] 3.1 Update the keydown guard condition: suppress the global handler only when `activeElement.tagName` is `INPUT` (and `activeElement !== display`), `TEXTAREA`, or `SELECT` — no longer suppress for `BUTTON`
- [x] 3.2 When a button is focused and a digit key (`0`–`9`) is pressed: call `calc.startNewEntry(e.key)` and return (do not fall through to other handlers)
- [x] 3.3 When a button is focused and `.` is pressed: call `calc.startNewEntry('.')` and return
- [x] 3.4 When a button is focused and `=` or `Enter` is pressed: do nothing in the global handler (let the button's own click event fire via the browser default)
- [x] 3.5 When a button is focused and an operator key (`+`, `-`, `*`, `/`) is pressed: call the operator action as normal (same as when display is focused)

## 4. Spatial Button Navigation

- [x] 4.1 Implement `getFocusableButtons()` helper: returns all `button` elements that are visible (not `hidden` attribute, not `visibility: hidden` style, not `disabled`)
- [x] 4.2 Implement `navigateButtons(direction)` function: collects focusable buttons, gets the focused button's `getBoundingClientRect()` center, filters candidates in the given direction, picks the one with smallest Euclidean distance to center, and calls `.focus()` on it
- [x] 4.3 In the keydown handler, when a button is focused and `ArrowLeft`/`ArrowRight`/`ArrowUp`/`ArrowDown` is pressed: call `navigateButtons(direction)`, call `e.preventDefault()`, and return
- [x] 4.4 When the display is focused and `ArrowLeft`/`ArrowRight` is pressed: do NOT intercept — allow native cursor movement within the input
- [x] 4.5 When the display is focused and `ArrowUp`/`ArrowDown` is pressed: optionally move focus to the nearest button above/below (treat display as a navigation node); call `e.preventDefault()`
