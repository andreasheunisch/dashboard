## Why

The calculator has no way to correct a mis-typed digit without pressing C on-screen. Users naturally reach for Backspace or Delete when they make a typo, and Escape to reset quickly — not having these keys mapped makes keyboard-driven entry frustrating.

## What Changes

- `Esc` and the `C` letter key both trigger `calc.clear()` globally (same rules as other global keys — suppressed only when a non-display text field is focused)
- `Backspace` removes the character immediately to the left of the cursor in the display input, when the display is focused
- `Del` removes the character immediately to the right of the cursor in the display input, when the display is focused
- Both `Backspace` and `Del` operate on `calc.currentInput` directly (keeping the calc object as sole owner of state) rather than allowing free browser editing of the input value
- If editing reduces `currentInput` to an empty string, it is set to `'0'`

## Capabilities

### New Capabilities
<!-- No new capabilities — all changes extend existing keyboard-input behavior -->

### Modified Capabilities
- `keyboard-input`: Add mappings for `Esc`, `C`, `Backspace`, and `Del` keys

## Impact

- `public/calculator/index.html`: New key mappings in the `keydown` handler; new `deleteAtCursor(direction)` helper on `calc`; depends on the display being an `<input>` element (introduced by `calculator-keyboard-navigation`)
- No server changes, no new dependencies
