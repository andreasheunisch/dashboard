## Why

The calculator currently truncates long numbers with an ellipsis (`...`) when they exceed the display width, silently hiding precision. Very large and very small numbers should instead be shown in scientific notation (e.g. `1.25E+7`), which is both readable and lossless — the internal full-precision value is preserved while the display remains unambiguous.

## What Changes

- The display rendering logic will format numbers using scientific notation when they are very large (e.g. ≥ 1e10) or very small (e.g. < 1e-6 and non-zero)
- Numbers within the normal displayable range are shown as-is (existing behaviour)
- Ellipsis truncation is removed entirely — numbers are never cut off with `...`
- Internal computed values retain full floating-point precision; scientific notation is display-only

## Capabilities

### New Capabilities

*(none — this is a display behaviour change on an existing capability)*

### Modified Capabilities

- `calculator-app`: Requirements for how numeric results are displayed change — large/small numbers must use scientific notation; ellipsis truncation is explicitly prohibited

## Impact

- `public/calculator/index.html` — display update function that sets the screen value
- No API changes, no new dependencies
- Existing tests that assert display values for large/small numbers may need updating
