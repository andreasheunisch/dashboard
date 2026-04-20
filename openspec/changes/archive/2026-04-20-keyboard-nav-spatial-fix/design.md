## Context

`navigateButtons(direction)` currently:
1. Collects all focusable elements (buttons + display)
2. Filters to those strictly in the pressed direction (e.g. `candidateCenter.x > currentCenter.x` for ArrowRight)
3. Picks the one with smallest Euclidean distance

The bug: in the sci panel, `arcsin` is at roughly x=140px in the 6-column grid. `arccos` is at x=181px (same row, Δx=41px, Δy=0). `π` is at x=155px in the 7-column grid below (Δx=15px, Δy=43px). Euclidean distances: arccos ≈ 41px, π ≈ 45px. They are close enough that measurement noise or slightly different panel sizes can swap the winner, and in practice π wins.

## Goals / Non-Goals

**Goals:**
- ArrowRight from any button always prefers an element in the same row over a diagonal element below
- ArrowDown always prefers an element in the same column over a diagonal element to the side
- Fix is minimal (one function, no data structures)

**Non-Goals:**
- Changing which elements are navigable
- Fixing the underlying grid-width mismatch (that is a visual layout decision, not a navigation concern)

## Decisions

**45° cone filter before distance ranking**

Replace step 2 with a two-stage filter:

```
Stage 1 (cone): keep only candidates where the pressed axis distance
                is strictly greater than the perpendicular axis distance.

  ArrowRight:  deltaX > 0  AND  deltaX > |deltaY|
  ArrowLeft:   deltaX < 0  AND  |deltaX| > |deltaY|
  ArrowDown:   deltaY > 0  AND  deltaY > |deltaX|
  ArrowUp:     deltaY < 0  AND  |deltaY| > |deltaX|

Stage 2 (fallback): if cone yields no candidates, fall back to the
                    original directional filter (pressed-axis only).
```

Among the surviving candidates, keep the minimum-Euclidean-distance winner.

**Why 45° and not a narrower cone?**

A 45° cone is the largest symmetric angle that guarantees strictly preferring movement along the pressed axis. Narrower cones (e.g. 30°) would fail for angled grids or when a button is slightly offset. 45° reliably handles all grid layouts encountered in this calculator without special-casing.

**Fallback rationale**

At panel edges (e.g. ArrowRight from the last button in a row) there is no candidate in the cone. The fallback allows focus to optionally wrap or skip to the next row — preserving the existing behaviour for out-of-cone navigations and ensuring no dead ends.

**No other algorithm changes**

Euclidean distance among cone-filtered candidates is still the right tie-breaker. The display-as-candidate extension and ArrowUp-from-sci-panel logic are unaffected.

## Risks / Trade-offs

- **Edge buttons at row boundaries** → The cone filter may exclude elements that a user would intuitively reach with ArrowDown/Up at the edge of a shorter row. The fallback restores this. No regression expected.
- **Very small buttons or unusual zoom levels** → `getBoundingClientRect()` values change with zoom; the cone filter uses ratios so it is zoom-invariant.
