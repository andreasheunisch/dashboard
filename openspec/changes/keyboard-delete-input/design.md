## Context

The calculator's `keydown` handler already routes digits, operators, `=`, and `Enter`. The display is an `<input>` element (per `calculator-keyboard-navigation`), meaning `selectionStart`/`selectionEnd` are available for cursor-aware editing. The `calc` object owns all state via `calc.currentInput`.

## Goals / Non-Goals

**Goals:**
- `Esc`/`C` always clear the calculator (same global scope as operator keys)
- `Backspace`/`Del` do character-level editing of `currentInput` when the display is focused
- Editing stays controlled (calc object remains sole state owner)

**Non-Goals:**
- `Backspace`/`Del` when display is not focused (no accidental deletes from button focus)
- Selecting a range of digits and deleting (selection-aware delete)
- Undo/redo history

## Decisions

**Esc and C key are global clears**

Both map to `calc.clear()` and follow the same suppression rules as other global keys: fire unless a non-display `INPUT`/`TEXTAREA`/`SELECT` is the active element. `C` is the letter key (`e.key === 'c'` or `'C'`); `Esc` is `e.key === 'Escape'`.

Note: when the `C` button itself is focused, pressing Enter already fires it via the button's click handler. The `C` key mapping fires in addition, but since both call `calc.clear()` the effect is idempotent.

**Backspace/Del only when display is focused**

These keys are not mapped globally — they only act when `document.activeElement === display`. This avoids accidentally clearing characters when navigating buttons.

**Controlled editing via `calc.deleteAt(direction)`**

Rather than removing the `e.preventDefault()` guard and letting the browser edit `display.value` freely, a new `calc.deleteAt(direction)` method:
1. Reads `display.selectionStart` / `selectionEnd`
2. Computes the new `currentInput` string (splice out one character)
3. Falls back to `'0'` if the result is empty or only a minus sign
4. Calls `updateDisplay()` and restores the cursor with `display.setSelectionRange()`

Direction is `'backward'` (Backspace) or `'forward'` (Delete).

For Backspace: remove `currentInput[pos - 1]`; new cursor = `pos - 1`.  
For Del: remove `currentInput[pos]`; cursor stays at `pos`.

The method does nothing if `currentInput === 'Error'` (can't partially edit an error state — press C instead).

**`waitingForOperand` after a delete**

After any delete operation, set `waitingForOperand = false` so subsequent digits append rather than replace. This is consistent with the user still being mid-entry.

**Mapping `currentInput` index ↔ `display.value` index**

`display.value` shows `formatDisplay(currentInput)`. During active digit entry, `formatDisplay` returns the raw string unchanged (values are short and within the normal range), so cursor positions map 1:1. After a computed result `waitingForOperand === true` — in this case `deleteAt` treats the entire display as a single unit and Backspace/Del both reset to `'0'` (start fresh), because the formatted result string doesn't correspond to an editable digit sequence.

## Risks / Trade-offs

- **C key conflicts with copy shortcut (Ctrl+C)** → `e.ctrlKey`/`e.metaKey` check: skip if any modifier key is held, so Ctrl+C still copies
- **Esc closes browser dialogs** → `e.preventDefault()` after calling `calc.clear()` to suppress default Esc behavior (e.g., exiting fullscreen)
- **`waitingForOperand = true` after delete on result** → A computed result is a single atomic value; deleting one "digit" from `1.23E+7` is meaningless, so resetting to `'0'` is the least surprising behavior
