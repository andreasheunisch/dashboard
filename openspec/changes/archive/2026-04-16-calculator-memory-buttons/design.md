## Context

The calculator is a single self-contained HTML file with embedded JS state machine (`currentInput`, `previousInput`, `operator`). Adding memory requires one new state variable and three new buttons wired into the existing pattern. The change is entirely within `public/calculator/index.html` — no server or routing changes needed.

## Goals / Non-Goals

**Goals:**
- Add `memoryValue` to the JS state (initialised to `0`)
- **M+**: add the current display value to `memoryValue`
- **MR**: copy `memoryValue` into `currentInput` (shown on display)
- **MC**: reset `memoryValue` to `0`
- Fit the three new buttons into the existing grid without breaking the layout

**Non-Goals:**
- M− (memory subtract) — not requested
- Persisting memory across page reloads (session/localStorage)
- Multiple memory slots

## Decisions

**Button placement**
Add a new top row: `MC | MR | M+` spanning 3 columns, with an empty 4th cell (or a future slot). This keeps the existing 4-column grid intact and groups memory controls visually above the numeric pad, matching the convention of physical calculators.

**`memoryValue` initialised to `0`, not `null`**
Using `0` avoids a null-check on MR — recalling an empty memory simply puts `0` on the display, which is correct and unsurprising.

**MR sets `waitingForOperand: false`**
After recalling memory the display shows the recalled value as the current input, so digit presses should append to it (not replace it). Setting `waitingForOperand: false` achieves this naturally.

**No persistent memory indicator for now**
A visual "M" badge when memory is non-zero is a nice-to-have but adds complexity; deferred to a future change.

## Risks / Trade-offs

- **Grid reflow** → Mitigation: adding one row above the existing rows leaves all other button positions unchanged; verify visually after implementation.
- **M+ on an Error state** → Mitigation: guard `M+` so it does nothing when `currentInput === 'Error'`.
