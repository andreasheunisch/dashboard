### Requirement: Calculator is served at /calculator
The server SHALL respond to `GET /calculator` with HTTP `200`, `Content-Type: text/html`, and the calculator page HTML.

#### Scenario: Browser navigates to /calculator
- **WHEN** a client sends `GET /calculator`
- **THEN** the server responds with HTTP `200` and `Content-Type: text/html`

### Requirement: Calculator displays a numeric input
The calculator page SHALL render a read-only display area that shows the current input value or the result of the last operation.

#### Scenario: Initial state
- **WHEN** the calculator page first loads
- **THEN** the display shows `0`

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
