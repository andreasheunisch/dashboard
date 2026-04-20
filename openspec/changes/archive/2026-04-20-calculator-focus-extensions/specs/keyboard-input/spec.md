## MODIFIED Requirements

### Requirement: Backspace removes the character left of the cursor when the display is focused
When the display input has focus, pressing `Backspace` SHALL remove the character immediately to the left of the text cursor from the current input. If the input becomes empty as a result, the display SHALL show `0`. If the current input is `Error`, `Backspace` SHALL have no effect. If `waitingForOperand` is `true` (a computed result is shown), `Backspace` SHALL reset the display to `0` and begin a new entry.

When the display is **not** focused and a calculator button is focused, pressing `Backspace` SHALL focus the display with the cursor placed at the end, then delete the last character — identical in effect to Backspace with the cursor already at the end of the input.

#### Scenario: Backspace removes last digit
- **WHEN** the display shows `123`, cursor is at the end, and the user presses `Backspace`
- **THEN** the display shows `12` and the cursor remains at the end

#### Scenario: Backspace removes mid-expression digit
- **WHEN** the display shows `123`, cursor is between `1` and `2`, and the user presses `Backspace`
- **THEN** the display shows `23` and the cursor stays at position 1

#### Scenario: Backspace on single digit resets to zero
- **WHEN** the display shows `5` and the user presses `Backspace`
- **THEN** the display shows `0`

#### Scenario: Backspace ignored on Error
- **WHEN** the display shows `Error` and the user presses `Backspace`
- **THEN** the display is unchanged

#### Scenario: Backspace on computed result starts fresh
- **WHEN** a calculation result is shown and the user presses `Backspace`
- **THEN** the display shows `0` and the next digit typed begins a new entry

#### Scenario: Backspace from button focus focuses display and deletes last digit
- **WHEN** the `=` button is focused, the display shows `123`, and the user presses `Backspace`
- **THEN** the display receives focus and shows `12`

### Requirement: Del removes the character right of the cursor when the display is focused
When the display input has focus, pressing `Delete` SHALL remove the character immediately to the right of the text cursor from the current input. If the input becomes empty, the display SHALL show `0`. If the current input is `Error` or `waitingForOperand` is `true`, behavior matches the `Backspace` rule for those states.

When the display is **not** focused and a calculator button is focused, pressing `Delete` SHALL focus the display with the cursor placed at position 0, then delete the first character — identical in effect to Delete with the cursor at the start of the input.

#### Scenario: Del removes digit to the right of cursor
- **WHEN** the display shows `123`, cursor is between `1` and `2`, and the user presses `Delete`
- **THEN** the display shows `13` and the cursor stays at position 1

#### Scenario: Del at end of input has no effect
- **WHEN** the display shows `42`, cursor is at the end, and the user presses `Delete`
- **THEN** the display is unchanged

#### Scenario: Del from button focus focuses display and deletes first digit
- **WHEN** the `+` button is focused, the display shows `123`, and the user presses `Delete`
- **THEN** the display receives focus and shows `23`
