## 1. Replace Distance Metric in `navigateButtons`

- [x] 1.1 Locate the `navigateButtons(direction)` function in `public/calculator/index.html`
- [x] 1.2 After computing `deltaX` and `deltaY` for each candidate (signed, candidate minus current), add a cone-filter pass before the distance ranking:
  - `ArrowRight`: keep only candidates where `deltaX > 0 && deltaX > Math.abs(deltaY)`
  - `ArrowLeft`: keep only candidates where `deltaX < 0 && Math.abs(deltaX) > Math.abs(deltaY)`
  - `ArrowDown`: keep only candidates where `deltaY > 0 && deltaY > Math.abs(deltaX)`
  - `ArrowUp`: keep only candidates where `deltaY < 0 && Math.abs(deltaY) > Math.abs(deltaX)`
- [x] 1.3 If the cone-filtered list is empty, fall back to the original directional filter (pressed-axis displacement only, no cone) so navigation at panel edges still works
- [x] 1.4 Among the surviving candidates (cone-filtered or fallback), pick the one with minimum Euclidean distance — no change to this final step

## 2. Verify Key Scenarios

- [x] 2.1 ArrowRight from `arcsin` → `arccos` (was: `π`) — primary regression to verify
- [x] 2.2 ArrowRight from `arccos` → `arctan`
- [x] 2.3 ArrowLeft from `arccos` → `arcsin`
- [x] 2.4 ArrowDown from `arctan` (last in row 2) → nearest row-3 button (`e` or `±` depending on alignment) — verify fallback works if cone yields nothing
- [x] 2.5 ArrowRight from `7` → `8` and ArrowDown from `7` → `4` still work (main grid unaffected)
