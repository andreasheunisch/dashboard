### Requirement: Calculator is served at /calculator
The server SHALL respond to `GET /calculator` with HTTP `200`, `Content-Type: text/html`, and the calculator page HTML.

#### Scenario: Browser navigates to /calculator
- **WHEN** a client sends `GET /calculator`
- **THEN** the server responds with HTTP `200` and `Content-Type: text/html`

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

### Requirement: Digit buttons update the display
The calculator SHALL provide buttons for digits 0 through 9 and a decimal point. Pressing a digit button SHALL append that digit to the current input shown on the display.

#### Scenario: Pressing a digit
- **WHEN** the display shows `0` and the user presses `7`
- **THEN** the display shows `7`

#### Scenario: Pressing multiple digits
- **WHEN** the user presses `1`, then `2`, then `3`
- **THEN** the display shows `123`

#### Scenario: Pressing decimal point
- **WHEN** the display shows `3` and the user presses `.`
- **THEN** the display shows `3.`

### Requirement: Operator buttons set the pending operation
The calculator SHALL provide buttons for addition (+), subtraction (−), multiplication (×), and division (÷). Pressing an operator button SHALL store the current display value and the chosen operator, ready for the next operand.

#### Scenario: Pressing an operator
- **WHEN** the user has entered `5` and presses `+`
- **THEN** the display retains `5` (or clears for next input) and `+` is stored as the pending operator

### Requirement: Equals evaluates the pending operation
Pressing the `=` button SHALL compute the result of `previousInput operator currentInput` and display it.

#### Scenario: Simple addition
- **WHEN** the user enters `3`, presses `+`, enters `4`, then presses `=`
- **THEN** the display shows `7`

#### Scenario: Division by zero
- **WHEN** the user enters any number, presses `÷`, enters `0`, then presses `=`
- **THEN** the display shows `Error`

### Requirement: Clear resets the calculator
The calculator SHALL provide a `C` (clear) button that resets the display to `0` and clears any pending operator or stored value.

#### Scenario: Clearing mid-entry
- **WHEN** the user has entered `42` and presses `C`
- **THEN** the display shows `0` and no pending operation is stored

### Requirement: M+ stores the current value in memory
The calculator SHALL provide an `M+` button that adds the current display value to the memory register. If the display shows `Error`, pressing `M+` SHALL have no effect.

#### Scenario: Adding a value to empty memory
- **WHEN** memory is `0` and the display shows `5`, and the user presses `M+`
- **THEN** memory holds `5`

#### Scenario: Accumulating into memory
- **WHEN** memory holds `5` and the display shows `3`, and the user presses `M+`
- **THEN** memory holds `8`

#### Scenario: M+ ignored on Error
- **WHEN** the display shows `Error` and the user presses `M+`
- **THEN** memory is unchanged

### Requirement: MR recalls the memory value to the display
The calculator SHALL provide an `MR` button that copies the current memory register value onto the display as the current input.

#### Scenario: Recalling a stored value
- **WHEN** memory holds `42` and the user presses `MR`
- **THEN** the display shows `42`

#### Scenario: Recalling from empty memory
- **WHEN** memory holds `0` and the user presses `MR`
- **THEN** the display shows `0`

### Requirement: MC clears the memory register
The calculator SHALL provide an `MC` button that resets the memory register to `0`. It SHALL NOT affect the current display value or any pending operation.

#### Scenario: Clearing memory
- **WHEN** memory holds `99` and the user presses `MC`
- **THEN** memory holds `0`

#### Scenario: MC does not affect the display
- **WHEN** the display shows `7` and memory holds `99`, and the user presses `MC`
- **THEN** the display still shows `7`
