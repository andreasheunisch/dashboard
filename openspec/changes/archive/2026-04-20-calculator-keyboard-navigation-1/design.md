## Context

The calculator display is currently a `<div>` styled to look like an input field. The `keyboard-input-handling` change added a global `keydown` listener that suppresses when a button is focused. This change upgrades the display to a real `<input>` and replaces the blunt "suppress on button focus" guard with nuanced per-key routing.

## Goals / Non-Goals

**Goals:**
- Make digit typing work from any focus state
- Support cursor-aware digit insertion when display is focused
- Arrow keys navigate the button grid spatially
- No visible caret when focus is on a button
- Enter on a focused button activates it without double-firing

**Non-Goals:**
- Backspace/delete editing of the current input
- Keyboard access to scientific functions
- Touch/mobile focus behavior

## Decisions

**Display: `<div>` → `<input type="text">`**

An `<input>` gives `selectionStart`/`selectionEnd` for free, enabling cursor-aware insertion. Alternatives:
- `contenteditable div`: more complex APIs, inconsistent cross-browser selection behavior
- Keep `<div>`, track virtual cursor manually: significant bookkeeping for no benefit

The input is not `readonly` (prevents caret in some browsers); instead all character keys call `e.preventDefault()` in the keydown handler so the browser never writes to the input directly — the `calc` object owns the value exclusively via `display.value`.

**Caret visibility: CSS + focus/blur events**

```css
#display { caret-color: transparent; }
#display:focus { caret-color: auto; }
```

This hides the caret by default and shows it only while the display is focused. No JS required.

**Cursor-aware `inputDigit`**

When `display === document.activeElement` and `selectionStart === selectionEnd` (no text selected), insert the digit at `selectionStart` within `currentInput` instead of appending. After updating `display.value`, restore `selectionStart + 1` with `setSelectionRange()`.

When the display is not focused (button has focus), `inputDigit` behaves as before (respects `waitingForOperand`, appends).

**Spatial button navigation with arrow keys**

On `keydown` of an arrow key while a button is focused:
1. Collect all focusable buttons via `querySelectorAll('button:not([disabled]):not([style*="visibility: hidden"])')`.
2. Get the focused button's `getBoundingClientRect()` center.
3. Filter candidates in the target direction (e.g., for ArrowRight: `candidateCenter.x > currentCenter.x`).
4. Among candidates, pick the one with smallest Euclidean distance.
5. Call `.focus()` on it.

Call `e.preventDefault()` to prevent page scroll.

**Revised keydown guard**

Old guard: skip everything if `activeElement` is a `BUTTON`.

New routing logic when `activeElement` is a button:
- **Digit / decimal key**: call `calc.startNewEntry(digit)` (focuses display, sets digit as new input) — then return
- **Operator key**: call the operator action directly — then return
- **`=` or Enter**: let the default button click fire; do NOT also call `evaluate()` — skip global handler
- **Arrow key**: spatial navigation — then return
- Non-calculator keys: ignore

`startNewEntry(digit)` is a new `calc` method that sets `waitingForOperand = true`, calls `inputDigit(digit)`, then calls `display.focus()`.

**`updateDisplay` migration**

Replace `display.textContent = formatDisplay(this.currentInput)` with `display.value = formatDisplay(this.currentInput)`. Preserve cursor position after programmatic value updates by saving/restoring `selectionStart`/`selectionEnd` when display is focused.

## Risks / Trade-offs

- **`<input>` styling drift** → Mitigation: mirror existing `.display` CSS properties exactly; add `border: none; outline: none; background: transparent` overrides to strip default input chrome
- **`e.preventDefault()` on all character keys** → suppresses browser paste shortcut if user tries Ctrl+V; acceptable given the calc is not a text editor
- **Spatial navigation on varying viewport sizes** → `getBoundingClientRect()` is live so navigation always reflects actual rendered positions; no hardcoded grid indices
- **`readonly` avoided** → user could theoretically edit the input value directly if JS is slow; the `input` event should call `e.preventDefault()` or re-sync `display.value` from `calc.currentInput` to guard against this
