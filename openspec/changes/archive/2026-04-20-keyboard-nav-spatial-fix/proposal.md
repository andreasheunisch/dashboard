## Why

After the sci-panel rearrangement, the second row uses a 6-column grid while the third row uses a 7-column grid. Because the columns have different widths, some buttons in row 3 end up closer in straight-line (Euclidean) distance to a row-2 button than the adjacent row-2 button does. The spatial navigation algorithm uses pure Euclidean distance, so it incorrectly routes ArrowRight from "arcsin" to "π" (which is diagonally below-right at 14px horizontal / 43px vertical) instead of to "arccos" (which is 41px directly to the right).

## What Changes

- The spatial navigation distance metric is replaced: instead of pure Euclidean distance, a **45° directional cone filter** is applied first, then Euclidean distance among surviving candidates
- For ArrowRight: only consider elements where `deltaX > |deltaY|` (element is more to the right than it is up/down)
- For ArrowLeft: `|deltaX| > |deltaY|` and `deltaX < 0`
- For ArrowDown: `deltaY > |deltaX|`
- For ArrowUp: `|deltaY| > |deltaX|` and `deltaY < 0`
- If no candidates survive the cone filter, fall back to the current directional-only filter (any element in the general direction) to preserve navigability at panel edges

## Capabilities

### New Capabilities
<!-- No new capabilities -->

### Modified Capabilities
- `keyboard-navigation`: The "nearest in the pressed direction" requirement is tightened — navigation only crosses rows/columns if the target lies within a 45° cone of the pressed direction

## Impact

- `public/calculator/index.html`: one function (`navigateButtons`) updated, no HTML or CSS changes
- No server changes, no new dependencies
