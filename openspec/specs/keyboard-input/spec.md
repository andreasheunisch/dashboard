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
