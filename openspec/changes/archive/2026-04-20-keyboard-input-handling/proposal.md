## Why

The calculator currently has no keyboard support — all input requires mouse clicks. Users working on a desktop expect to type numbers and operators directly, making keyboard input a significant usability gap.

## What Changes

- Add a global `keydown` event listener to the calculator page
- Map digit keys `0`–`9` to `calc.inputDigit()`, same as pressing a digit button
- Map `.` to `calc.inputDecimal()`
- Map `+`, `-`, `*`, `/` to their corresponding operator buttons (`+`, `−`, `×`, `÷`)
- Map `=` and `Enter` to the equals button (`calc.evaluate()`)
- Keyboard events are ignored when the user is focused on a text input (no conflict with browser UI)

## Capabilities

### New Capabilities
- `keyboard-input`: Keyboard event handling for the calculator — maps physical keys to calculator operations

### Modified Capabilities
<!-- No existing spec-level requirements are changing — keyboard input is purely additive -->

## Impact

- `public/calculator/index.html`: Add `keydown` event listener in the `<script>` section
- No server changes required
- No new dependencies
