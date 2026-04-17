## Why

The calculator currently has no way to store and recall a value between operations. Adding standard memory buttons (MC, M+, MR) gives users the ability to accumulate values across multiple calculations — a common workflow when doing multi-step arithmetic.

## What Changes

- Three new buttons added to `public/calculator/index.html`: **MC** (memory clear), **M+** (memory add), **MR** (memory recall)
- Memory state (`memoryValue`) added to the calculator's JS state machine
- Visual indicator when memory holds a non-zero value (optional but helpful)

## Capabilities

### New Capabilities

<!-- none -->

### Modified Capabilities

- `calculator-app`: New memory button requirements are being added to the existing calculator spec

## Impact

- `public/calculator/index.html`: HTML structure, CSS grid, and JS logic all need updating
- `openspec/specs/calculator-app/spec.md`: 3 new requirements added via delta spec
- No server changes, no new dependencies
