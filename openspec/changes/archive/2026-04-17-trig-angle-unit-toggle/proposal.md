## Why

The scientific calculator's trigonometric functions (sin, cos, tan) always operate in radians, with no way to switch units. Users who work in degrees or gradians must manually convert, which is error-prone and defeats the purpose of a scientific calculator.

## What Changes

- Add a cyclic toggle button (`DEG → RAD → GON`) visible in scientific mode
- Display the active angular unit as a small status label on the calculator
- Apply the selected unit conversion when evaluating sin, cos, tan (and their results for inverse trig, if added later)

## Capabilities

### New Capabilities

_(none — this extends existing scientific calculator behaviour)_

### Modified Capabilities

- `scientific-functions`: Trigonometric functions must respect the active angular unit (DEG / RAD / GON); the unit toggle button and indicator label are new UI requirements.
- `calculator-app`: The calculator layout gains a unit indicator label and a toggle button in scientific mode.

## Impact

- `public/calculator/index.html`: inline JS and HTML only — no external dependencies
- The angle unit state is ephemeral (reset to RAD on page load is acceptable)
- No changes to server, build pipeline, or other pages
