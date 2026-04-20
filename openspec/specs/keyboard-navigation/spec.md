### Requirement: Display is an interactive text input
The calculator display SHALL be rendered as an `<input type="text">` element that can receive focus and supports a text cursor, replacing the previous read-only `<div>` display.

#### Scenario: Display is focusable
- **WHEN** the user clicks on the display area
- **THEN** the display element receives focus

### Requirement: Caret is hidden when display is not focused
The display input SHALL show no text cursor (caret) when it does not have focus, so that the current value appears as plain read-only text when a button is focused instead.

#### Scenario: Caret hidden on button focus
- **WHEN** the user tabs to or clicks a calculator button
- **THEN** no cursor bar is visible inside the display

#### Scenario: Caret visible when display is focused
- **WHEN** the user clicks the display or the display receives focus programmatically
- **THEN** a text cursor is visible inside the display

### Requirement: Arrow keys move the cursor within the focused display
When the display input has focus, pressing the left or right arrow key SHALL move the text cursor one position in that direction, allowing the user to position the cursor for mid-expression digit insertion.

#### Scenario: Moving cursor left
- **WHEN** the display is focused and shows `123` with cursor at the end, and the user presses ArrowLeft
- **THEN** the cursor moves one position to the left

#### Scenario: Moving cursor right
- **WHEN** the display is focused, cursor is not at the end, and the user presses ArrowRight
- **THEN** the cursor moves one position to the right

### Requirement: Digit typed at cursor position is inserted there
When the display input is focused and has a cursor positioned mid-value, pressing a digit key SHALL insert that digit at the cursor position rather than appending it to the end.

#### Scenario: Insert digit at cursor
- **WHEN** the display shows `13` with cursor between `1` and `3`, and the user presses `2`
- **THEN** the display shows `123` and the cursor advances one position

### Requirement: Arrow keys navigate between buttons spatially
When a calculator button has focus, pressing an arrow key SHALL move focus to the nearest button in the pressed direction, based on each button's rendered screen position.

#### Scenario: Navigate right from a button
- **WHEN** the `7` button is focused and the user presses ArrowRight
- **THEN** the `8` button receives focus

#### Scenario: Navigate down from a button
- **WHEN** the `7` button is focused and the user presses ArrowDown
- **THEN** the `4` button receives focus

#### Scenario: No button in direction
- **WHEN** the focused button is at the rightmost edge and the user presses ArrowRight
- **THEN** focus does not move

#### Scenario: Arrow key does not scroll the page
- **WHEN** any button is focused and the user presses an arrow key
- **THEN** the page does not scroll

### Requirement: Pressing Enter on a focused button triggers it
When a calculator button has focus, pressing Enter SHALL activate that button's action, identical to clicking it.

#### Scenario: Enter triggers the focused button
- **WHEN** the `+` button is focused and the user presses Enter
- **THEN** the `+` operator is applied, same as clicking the `+` button

### Requirement: Typing a digit while a button is focused refocuses the display
When a calculator button has focus and the user presses a digit key (`0`–`9`) or decimal point, focus SHALL move to the display input and the typed character SHALL begin a new number entry, replacing the current display value.

#### Scenario: Digit key refocuses display
- **WHEN** the `=` button is focused and the user presses `5`
- **THEN** the display receives focus and shows `5`

#### Scenario: New digit entry replaces existing value
- **WHEN** the display shows `42`, the `+` button is focused, and the user presses `3`
- **THEN** the display shows `3` (not `423`) and is focused
