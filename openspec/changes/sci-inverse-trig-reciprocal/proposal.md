## Why

The scientific panel currently offers sin, cos, and tan but no inverse trigonometric functions, leaving users unable to recover angles from ratios. A reciprocal (1/x) button rounds out the panel with a common shortcut that avoids a manual `1 ÷ x =` sequence.

## What Changes

- Add `arcsin` button: computes the inverse sine of the display value (result in active angular unit); shows `Error` if |x| > 1
- Add `arccos` button: computes the inverse cosine of the display value (result in active angular unit); shows `Error` if |x| > 1
- Add `arctan` button: computes the inverse tangent of the display value (result in active angular unit); no domain restriction
- Add `1/x` button: computes the reciprocal of the display value; shows `Error` if x = 0

## Capabilities

### New Capabilities

_(none — all additions extend the existing scientific-functions capability)_

### Modified Capabilities

- `scientific-functions`: Four new button requirements (arcsin, arccos, arctan, 1/x), each with domain validation and angular-unit awareness for the inverse trig functions.

## Impact

- `public/calculator/index.html` only — inline HTML and JS, no external dependencies
- The sci-panel grid currently holds 10 buttons (2 rows of 5); 4 new buttons bring the total to 14, requiring a layout adjustment (e.g. 3 rows of 5 minus one, or 2 rows of 7 — see design.md)
- No server, build pipeline, or other page changes
