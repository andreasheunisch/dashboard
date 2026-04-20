## Why

The initial keyboard input feature suppresses all keys when a button is focused, making it impossible to keep typing after clicking an operator or equals. Users expect a physical keyboard to always work, with the focused button acting as a cursor-navigation target rather than a keyboard blocker.

## What Changes

- **BREAKING** The display `<div>` is replaced with an `<input>` element, enabling native cursor positioning; `updateDisplay()` switches from `textContent` to `value`
- When the display input is focused, arrow keys left/right move the text cursor; the next digit typed is inserted at that cursor position
- When focus moves to a button, the text cursor in the display is hidden (no caret bar visible)
- Arrow keys navigate spatially between buttons (up/down/left/right) based on their on-screen grid positions
- Pressing Enter on a focused button triggers that button (no global handler interference)
- When any digit key is pressed while a button is focused, focus returns to the display input and the digit replaces the current value (new number entry begins)
- Operator keys (`+`, `-`, `*`, `/`) continue to work globally regardless of focus — they are no longer suppressed when a button is focused

## Capabilities

### New Capabilities
- `keyboard-navigation`: Spatial arrow-key focus navigation between buttons, caret visibility management, and focus-return-on-digit behavior

### Modified Capabilities
- `keyboard-input`: The "keyboard input is suppressed when a button is focused" requirement is replaced — operator keys now always fire, digit keys refocus the display; only non-calculator form elements (`INPUT`, `TEXTAREA`, `SELECT`) still suppress the global handler

## Impact

- `public/calculator/index.html`: Display element type change, CSS caret rules, updated `updateDisplay()`, `inputDigit()` cursor-aware insertion, new spatial navigation logic, revised keydown handler guard logic
- No server changes, no new dependencies
