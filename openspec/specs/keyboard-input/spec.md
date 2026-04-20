### Requirement: Number keys input digits
The calculator SHALL listen for `keydown` events on the document and, when a digit key `0`–`9` is pressed, call `inputDigit` with that digit — identical in effect to clicking the corresponding digit button.

#### Scenario: Pressing a digit key
- **WHEN** the calculator page is active and the user presses the `7` key
- **THEN** the display updates as if the `7` button was clicked

#### Scenario: Pressing multiple digit keys in sequence
- **WHEN** the user presses `1`, `2`, `3` in sequence via keyboard
- **THEN** the display shows `123`

### Requirement: Period key inputs a decimal point
The calculator SHALL treat the `.` key as equivalent to pressing the decimal point button.

#### Scenario: Pressing the period key
- **WHEN** the display shows `3` and the user presses the `.` key
- **THEN** the display shows `3.`

#### Scenario: Period key ignored when decimal already present
- **WHEN** the current input already contains a decimal point and the user presses `.`
- **THEN** the display is unchanged

### Requirement: Operator keys trigger operator buttons
The calculator SHALL map `+`, `-`, `*`, and `/` keys to the corresponding operator buttons (`+`, `−`, `×`, `÷`).

#### Scenario: Pressing plus key
- **WHEN** the user has entered `5` and presses `+` via keyboard
- **THEN** `+` is stored as the pending operator, equivalent to clicking the `+` button

#### Scenario: Pressing minus key
- **WHEN** the user has entered `8` and presses `-` via keyboard
- **THEN** `−` is stored as the pending operator

#### Scenario: Pressing asterisk key
- **WHEN** the user presses `*` via keyboard
- **THEN** `×` is stored as the pending operator

#### Scenario: Pressing slash key
- **WHEN** the user presses `/` via keyboard
- **THEN** `÷` is stored as the pending operator and the browser quick-find shortcut is suppressed

### Requirement: Equals and Enter evaluate the expression
The calculator SHALL treat the `=` key and the `Enter` key as equivalent to clicking the `=` button.

#### Scenario: Pressing equals key completes a calculation
- **WHEN** the user has entered `3`, pressed `+`, entered `4`, then presses `=` via keyboard
- **THEN** the display shows `7`

#### Scenario: Pressing Enter completes a calculation
- **WHEN** the user has entered `3`, pressed `+`, entered `4`, then presses `Enter` via keyboard
- **THEN** the display shows `7`

### Requirement: Keyboard input is suppressed when a form element is focused
The calculator SHALL ignore keyboard shortcuts when a form element (`INPUT`, `TEXTAREA`, `SELECT`) or a button element is the active element, to avoid double-triggering or interfering with other controls.

#### Scenario: Input element focused
- **WHEN** an `INPUT` element is focused and the user presses `5`
- **THEN** the calculator display is not affected

#### Scenario: Button element focused
- **WHEN** a calculator button is focused and the user presses `Enter`
- **THEN** the button's own click handler fires but the global keyboard handler does not double-evaluate
