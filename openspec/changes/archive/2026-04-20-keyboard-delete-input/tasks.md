## 1. Esc and C Key — Global Clear

- [x] 1.1 In the `keydown` handler, add a case for `e.key === 'Escape'`: call `calc.clear()`, call `e.preventDefault()`, and return
- [x] 1.2 Add a case for `e.key === 'c' || e.key === 'C'` with no modifier keys (`!e.ctrlKey && !e.metaKey && !e.altKey`): call `calc.clear()` and return
- [x] 1.3 Verify both cases respect the existing suppression guard (skip when a non-display `INPUT`/`TEXTAREA`/`SELECT` is focused)

## 2. `calc.deleteAt(direction)` Method

- [x] 2.1 Add `deleteAt(direction)` to the `calc` object; `direction` is `'backward'` (Backspace) or `'forward'` (Delete)
- [x] 2.2 If `this.currentInput === 'Error'`, return immediately (no-op)
- [x] 2.3 If `this.waitingForOperand === true` (computed result shown), reset: `this.currentInput = '0'`, `this.waitingForOperand = false`, call `this.updateDisplay()`, focus display, and return
- [x] 2.4 Read cursor position: `const pos = display.selectionStart`
- [x] 2.5 For `'backward'`: if `pos === 0`, return (nothing to delete); otherwise splice out `currentInput[pos - 1]`; set `newPos = pos - 1`
- [x] 2.6 For `'forward'`: if `pos === currentInput.length`, return; otherwise splice out `currentInput[pos]`; set `newPos = pos`
- [x] 2.7 If the resulting string is empty, `-`, or `-0`, set `currentInput = '0'` and `newPos = 1`; otherwise assign spliced string
- [x] 2.8 Set `this.waitingForOperand = false`, call `this.updateDisplay()`, then restore cursor: `display.setSelectionRange(newPos, newPos)`

## 3. Backspace and Del Key Routing

- [x] 3.1 In the `keydown` handler, add a case for `e.key === 'Backspace'`: if `document.activeElement === display`, call `calc.deleteAt('backward')`, call `e.preventDefault()`, and return; otherwise do nothing
- [x] 3.2 Add a case for `e.key === 'Delete'`: if `document.activeElement === display`, call `calc.deleteAt('forward')`, call `e.preventDefault()`, and return; otherwise do nothing
