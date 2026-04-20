## 1. JS — fromRadians helper

- [ ] 1.1 Add `fromRadians(x)` method to `calc` object that converts a radian value to the active `angleUnit` (DEG: × 180/π, GON: × 200/π, RAD: identity)

## 2. JS — new button functions

- [ ] 2.1 Add `arcsin` button handler: `applyUnary(x => calc.fromRadians(Math.asin(x)))` (NaN when |x| > 1 → Error via existing guard)
- [ ] 2.2 Add `arccos` button handler: `applyUnary(x => calc.fromRadians(Math.acos(x)))`
- [ ] 2.3 Add `arctan` button handler: `applyUnary(x => calc.fromRadians(Math.atan(x)))`
- [ ] 2.4 Add `1/x` button handler: `applyUnary(x => x === 0 ? NaN : 1 / x)`

## 3. HTML — layout

- [ ] 3.1 Change `sci-panel` CSS grid from `repeat(5, 1fr)` to `repeat(7, 1fr)`
- [ ] 3.2 Add the four new buttons to `sci-panel` in order: arcsin, arccos, arctan after tan; 1/x after arctan (before log)
