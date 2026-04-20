## Why

The spatial button navigation introduced by `calculator-keyboard-navigation` treats the display input as invisible to arrow-key routing. This creates two dead ends: the `[sci]` toggle has no downward neighbour, and the top row of sci-panel buttons has no upward neighbour — even though the display is visually between them. Similarly, Backspace and Delete silently do nothing when a button is focused, which surprises users who expect those keys to always edit the number.

## What Changes

- Pressing **ArrowDown** on the `[sci]`/`[basic]` toggle button focuses the display input
- Pressing **ArrowUp** on any button in the first row of the sci panel (sin, cos, tan, arcsin, arccos, arctan, 1/x) focuses the display input
- Pressing **Backspace** when the display is not focused: focus the display with cursor at the end, then delete the last digit (same effect as Backspace with cursor at end)
- Pressing **Del** when the display is not focused: focus the display with cursor at position 0, then delete the first digit (same effect as Del with cursor at start)

## Capabilities

### New Capabilities
<!-- No new capabilities — all changes extend existing keyboard-navigation and keyboard-input behavior -->

### Modified Capabilities
- `keyboard-navigation`: Display input becomes a spatial navigation target reachable via ArrowDown from `[sci]` and ArrowUp from the sci-panel top row
- `keyboard-input`: Backspace and Del now focus the display and edit when called from button focus (not silently ignored)

## Impact

- `public/calculator/index.html`: Extend `navigateButtons()` to include the display as a candidate target; update Backspace/Del routing in the keydown handler to handle the unfocused case
- No server changes, no new dependencies
