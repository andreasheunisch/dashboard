## 1. State

- [x] 1.1 Add `angleUnit` property to `calc` object, defaulting to `'RAD'`
- [x] 1.2 Add `toggleAngleUnit()` method that cycles `RAD → GON → DEG → RAD`
- [x] 1.3 Add `toRadians(x)` helper that converts using `calc.angleUnit`

## 2. Trig functions

- [x] 2.1 Update `sin` button's `applyUnary` call to pass `toRadians(x)` to `Math.sin`
- [x] 2.2 Update `cos` button's `applyUnary` call to pass `toRadians(x)` to `Math.cos`
- [x] 2.3 Update `tan` button's `applyUnary` call to pass `toRadians(x)` to `Math.tan`

## 3. UI — toggle button

- [x] 3.1 Add toggle button to `sci-panel-2`, expand its grid to 5 columns
- [x] 3.2 Wire button `onclick` to `calc.toggleAngleUnit()` and display-label update

## 4. UI — angle unit label

- [x] 4.1 Add `<span id="angle-unit-label">` element between the display and sci-panel
- [x] 4.2 Style the label (small, muted, right-aligned)
- [x] 4.3 Show/hide label together with sci-panels in `toggleSci()`
- [x] 4.4 Update label text in `toggleAngleUnit()` and on `toggleSci()` open
