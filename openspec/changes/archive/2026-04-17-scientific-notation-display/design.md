## Context

The calculator is a single HTML file (`public/calculator/index.html`) with inline JavaScript. The display is a DOM element updated by a `setDisplay(value)` helper (or equivalent inline logic). Currently, when a number string is too wide for the display area, it is truncated with `...`, which silently loses information and is visually confusing. The fix is a formatting layer that converts a number to scientific notation when it falls outside the comfortable display range, before writing it to the DOM.

## Goals / Non-Goals

**Goals:**
- Format numbers ≥ 1e10 or with absolute value < 1e-6 (and non-zero) as scientific notation (e.g. `1.25E+7`)
- Remove all ellipsis truncation from the display path
- Preserve full internal precision — formatting is applied only at the point of display update
- Keep the format simple and readable: significand rounded to a reasonable number of significant figures (e.g. up to 6), uppercase `E` notation

**Non-Goals:**
- Locale-aware formatting (no thousands separators, no comma-decimal)
- Engineering notation (exponents as multiples of 3) — plain scientific notation is sufficient
- Changing how intermediate operands are stored or computed

## Decisions

### Decision 1: Display-only formatting via a `formatDisplay(value)` helper

A single `formatDisplay(n)` function is introduced and called wherever the display DOM element is set. It receives the numeric (or string) value and returns the string to render.

**Alternatives considered:**
- Patching every `display.textContent = ...` call individually — fragile, misses future call sites
- CSS `overflow: hidden` — hides the problem without solving it; still loses information

**Rationale:** Centralising formatting in one function means the threshold and format string are defined once and are easy to test and change.

### Decision 2: Thresholds — ≥ 1e10 or 0 < |x| < 1e-6

These thresholds keep everyday arithmetic results (e.g. `9,999,999,999`) as plain integers while converting astronomically large or microscopically small results.

**Rationale:** Matches common scientific calculator conventions and avoids formatting numbers that fit comfortably on the display.

### Decision 3: Format using `Number.toExponential()` then normalise to `E+` notation

`(1.25e7).toExponential(5)` → `"1.25000e+7"`. Strip trailing zeros from the significand and uppercase the `e` → `"1.25E+7"`.

**Alternatives considered:**
- Manual string manipulation — more code, harder to maintain
- `toPrecision()` — can still produce long decimal strings that overflow

### Decision 4: Never display `E+0`; use plain decimal instead

When the exponent would be zero (i.e. `1 ≤ |x| < 10`), scientific notation wastes three characters on `E+0` that could show more significant digits. In this case the formatter switches to `toFixed()` with enough decimal places to fill the 12-character limit, then strips trailing zeros.

Example: a computed result of `3.14159265358979` is shown as `3.1415926535` (positive, 10 decimal places) rather than `3.14159E+0`.

**Rationale:** `E+0` conveys no useful magnitude information and makes results harder to read. The display budget is better spent on precision.

## Risks / Trade-offs

- [Risk] Existing Playwright tests that assert display values like `"1e+21"` (JS default) will fail → Mitigation: update those test assertions to match the new format
- [Risk] The `Error` string and `0` must pass through `formatDisplay` unchanged → Mitigation: guard clause at top of helper: if value is `"Error"` or non-finite, return as-is
- [Trade-off] Rounding in the significand can cause last-digit differences vs. raw float display → Acceptable: the full-precision value is still held internally; display is intentionally an abbreviation
