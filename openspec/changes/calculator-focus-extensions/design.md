## Context

`calculator-keyboard-navigation` implemented `navigateButtons(direction)` using `getBoundingClientRect()` over a list of visible buttons. The display input was excluded from that candidate list. `keyboard-delete-input` implemented `calc.deleteAt(direction)` but only invoked it when `document.activeElement === display`. This change wires the two together at the edges where they meet.

## Goals / Non-Goals

**Goals:**
- Display is reachable via arrow keys from its visual neighbours (sci toggle above, sci-panel buttons below)
- Backspace/Del always edit the number, regardless of which element is focused

**Non-Goals:**
- ArrowUp from the display moving focus to `[sci]` (downward-only bridge at that edge; upward would fight cursor movement in the input)
- ArrowDown from sci-panel buttons moving focus to the main button grid (already handled by the existing spatial algorithm)
- Keyboard access to sci functions or memory buttons via the display

## Decisions

**Extend `navigateButtons` to include the display as a candidate**

The simplest approach is to add the display element to the candidate list inside `navigateButtons`. Since the display is not a `<button>`, the function needs a small generalisation: collect focusable elements (buttons + display), compute their bounding rect centres, run the same directional distance filter and nearest-pick algorithm, then call `.focus()` on whichever wins — button or input.

This means ArrowDown from `[sci]` will naturally route to the display because the display's centre is directly below the toggle and closer than any button. ArrowUp from the top sci-panel row will similarly route to the display. No special-casing of element IDs is needed — geometry does the work.

Alternative considered: hardcode "if focused element is `#btn-sci` and key is ArrowDown, focus display". This works but breaks if the layout changes and duplicates logic already in the spatial algorithm.

**Backspace/Del when a button is focused**

Currently the keydown handler short-circuits for Backspace/Del if `document.activeElement !== display`. Change the logic to:

```
if Backspace pressed:
  if display is active → deleteAt('backward')   // existing behaviour
  else if a button is active → focus display at end, deleteAt('backward')

if Del pressed:
  if display is active → deleteAt('forward')    // existing behaviour
  else if a button is active → focus display at pos 0, deleteAt('forward')
```

For "focus display at end": call `display.focus()` then `display.setSelectionRange(display.value.length, display.value.length)` before calling `deleteAt`.  
For "focus display at pos 0": call `display.focus()` then `display.setSelectionRange(0, 0)` before calling `deleteAt`.

`deleteAt` already handles cursor position via `display.selectionStart`, so this is sufficient.

Call `e.preventDefault()` in both cases to suppress any browser default for those keys.

## Risks / Trade-offs

- **`navigateButtons` including display as candidate may redirect ArrowDown from other buttons to the display unexpectedly** → Only likely if a button is vertically close to the display. In the current layout the display sits between the header and sci panel with clear vertical separation, so the geometry filter will not pick it over a closer button. If the layout changes, the spatial algorithm self-corrects.
- **Backspace/Del on a button clears one digit without the user seeing the cursor move first** → The focus call and delete call are synchronous, so the display will show the updated value with the cursor at the correct position after the keydown returns. Acceptable UX.
