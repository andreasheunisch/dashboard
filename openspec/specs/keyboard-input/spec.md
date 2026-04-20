### Requirement: Keyboard input is suppressed when a form element is focused
The calculator SHALL ignore keyboard shortcuts only when a non-button form element (`INPUT` other than the display, `TEXTAREA`, or `SELECT`) is the active element. When a calculator **button** is focused, the global handler SHALL NOT be suppressed — instead, each key type is routed appropriately: digit and decimal keys refocus the display (handled by keyboard-navigation), operator keys trigger their operation, and `=`/`Enter` defers to the button's own click handler.

#### Scenario: Non-button input element focused — global handler suppressed
- **WHEN** a `TEXTAREA` element is focused and the user presses `5`
- **THEN** the calculator display is not affected

#### Scenario: Button focused — operator keys still fire
- **WHEN** the `=` button is focused and the user presses `+`
- **THEN** the `+` operator is stored, same as clicking the `+` button

#### Scenario: Button focused — Enter defers to button click
- **WHEN** the `C` button is focused and the user presses Enter
- **THEN** the calculator is cleared (the button's own action fires) and `evaluate()` is NOT called a second time

### Requirement: Esc and C keys clear the calculator
The calculator SHALL treat the `Escape` key and the `C` letter key as equivalent to clicking the `C` (clear) button, resetting the display to `0` and clearing any pending operator or stored value. This mapping SHALL apply globally under the same suppression rules as other global keys (suppressed only when a non-display `INPUT`, `TEXTAREA`, or `SELECT` is focused). Modifier keys (`Ctrl`, `Meta`, `Alt`) SHALL prevent the `C` key from firing so that clipboard shortcuts are not intercepted.

#### Scenario: Esc clears mid-entry
- **WHEN** the display shows `42` and the user presses `Escape`
- **THEN** the display shows `0` and no pending operation is stored

#### Scenario: C key clears mid-entry
- **WHEN** the display shows `99` and the user presses the `C` letter key (no modifier)
- **THEN** the display shows `0` and no pending operation is stored

#### Scenario: Ctrl+C is not intercepted
- **WHEN** the user presses `Ctrl+C`
- **THEN** the calculator is not cleared (the browser copy shortcut is unaffected)

#### Scenario: Esc clears when a button is focused
- **WHEN** the `+` button is focused and the user presses `Escape`
- **THEN** the display shows `0` (same as clicking the `C` button)

### Requirement: Backspace removes the character left of the cursor when the display is focused
When the display input has focus, pressing `Backspace` SHALL remove the character immediately to the left of the text cursor from the current input. If the input becomes empty as a result, the display SHALL show `0`. If the current input is `Error`, `Backspace` SHALL have no effect. If `waitingForOperand` is `true` (a computed result is shown), `Backspace` SHALL reset the display to `0` and begin a new entry.

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

#### Scenario: Backspace ignored when display is not focused
- **WHEN** the `=` button is focused and the user presses `Backspace`
- **THEN** the display is unchanged

### Requirement: Del removes the character right of the cursor when the display is focused
When the display input has focus, pressing `Delete` SHALL remove the character immediately to the right of the text cursor from the current input. If the input becomes empty, the display SHALL show `0`. If the current input is `Error` or `waitingForOperand` is `true`, behavior matches the `Backspace` rule for those states.

#### Scenario: Del removes digit to the right of cursor
- **WHEN** the display shows `123`, cursor is between `1` and `2`, and the user presses `Delete`
- **THEN** the display shows `13` and the cursor stays at position 1

#### Scenario: Del at end of input has no effect
- **WHEN** the display shows `42`, cursor is at the end, and the user presses `Delete`
- **THEN** the display is unchanged

#### Scenario: Del ignored when display is not focused
- **WHEN** the `C` button is focused and the user presses `Delete`
- **THEN** the display is unchanged
