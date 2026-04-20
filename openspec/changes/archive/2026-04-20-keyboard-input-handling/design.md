## Context

The calculator is a single-file vanilla JS application (`public/calculator/index.html`). All interactions go through the `calc` object methods (`inputDigit`, `inputDecimal`, `inputOperator`, `evaluate`). There is currently no keyboard handling.

## Goals / Non-Goals

**Goals:**
- Allow users to type digits with number keys
- Allow users to trigger operator buttons with `+`, `-`, `*`, `/`
- Allow users to trigger the equals button with `=` or `Enter`
- Allow decimal input with `.`

**Non-Goals:**
- Backspace / delete key handling
- Keyboard shortcuts for memory or scientific functions
- Visual button highlight feedback on keypress

## Decisions

**Single global `keydown` listener on `document`**

A single `document.addEventListener('keydown', handler)` is the simplest approach. Alternatives:
- Attaching to the display div: would require the element to be focusable and focused, adding friction
- Attaching to `window`: functionally equivalent to `document` for keydown, no reason to prefer it

**Guard against active text inputs**

If the browser ever has a text input focused (e.g., browser address bar edge cases), we should skip: check `document.activeElement.tagName` and bail if it's `INPUT` or `TEXTAREA`. This avoids interfering with any future form elements added to the page.

**Key mapping**

| Key | Action |
|-----|--------|
| `0`–`9` | `calc.inputDigit(key)` |
| `.` | `calc.inputDecimal()` |
| `+` | `calc.inputOperator('+')` |
| `-` | `calc.inputOperator('−')` (Unicode minus) |
| `*` | `calc.inputOperator('×')` |
| `/` | `calc.inputOperator('÷')` — also call `e.preventDefault()` to block browser quick-find |
| `=`, `Enter` | `calc.evaluate()` |

The operator values must match what the `evaluate()` method checks (`+`, `−`, `×`, `÷`).

## Risks / Trade-offs

- **`/` key conflict** → Mitigation: `e.preventDefault()` prevents browser quick-find (Firefox) from hijacking the key
- **`Enter` on a focused button** → If a button is focused, pressing Enter fires both the button click and the keydown handler, doubling the action. Mitigation: check if `document.activeElement` is a button and skip the global handler in that case (the button's own click handler handles it)
