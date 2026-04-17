## MODIFIED Requirements

### Requirement: Calculator displays a numeric input
The calculator page SHALL render a read-only display area that shows the current input value, the result of the last operation, or an expression being composed with parentheses. Numbers that are very large (absolute value ≥ 1e10) or very small (absolute value < 1e-6 and non-zero) SHALL be formatted in scientific notation (e.g. `1.25E+7`). The display SHALL never truncate a number with an ellipsis or other placeholder — scientific notation is used instead.

#### Scenario: Initial state
- **WHEN** the calculator page first loads
- **THEN** the display shows `0`

#### Scenario: Large result uses scientific notation
- **WHEN** a calculation produces a result ≥ 1e10 (e.g. `99999999999`)
- **THEN** the display shows the value in scientific notation (e.g. `1E+11`)

#### Scenario: Very small result uses scientific notation
- **WHEN** a calculation produces a non-zero result with absolute value < 1e-6 (e.g. `0.0000001`)
- **THEN** the display shows the value in scientific notation (e.g. `1E-7`)

#### Scenario: Normal-range result shown as-is
- **WHEN** a calculation produces a result within the normal display range (e.g. `12345`)
- **THEN** the display shows the plain number without scientific notation

#### Scenario: No ellipsis for long numbers
- **WHEN** any calculation produces a number that would previously have been truncated
- **THEN** the display shows the number in scientific notation instead of truncating with `...`

## ADDED Requirements

### Requirement: Scientific notation format uses uppercase E
The calculator display SHALL use uppercase `E` (not lowercase `e`) and a signed exponent (e.g. `1.25E+7`, `3E-4`) for all scientific notation output. Trailing zeros in the significand SHALL be omitted.

#### Scenario: Positive exponent format
- **WHEN** the display formats a large number in scientific notation
- **THEN** the exponent is shown with a `+` sign (e.g. `1.25E+7`)

#### Scenario: Negative exponent format
- **WHEN** the display formats a very small number in scientific notation
- **THEN** the exponent is shown with a `-` sign (e.g. `3E-4`)

#### Scenario: Trailing zeros omitted
- **WHEN** the significand has trailing zeros (e.g. `1.50000E+7`)
- **THEN** they are stripped before display (e.g. `1.5E+7`)
