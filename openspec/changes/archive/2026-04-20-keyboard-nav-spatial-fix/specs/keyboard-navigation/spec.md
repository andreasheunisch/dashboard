## MODIFIED Requirements

### Requirement: Arrow keys navigate between buttons spatially
When a calculator button has focus, pressing an arrow key SHALL move focus to the nearest focusable element — button or display input — in the pressed direction. A candidate is only eligible if it lies within a **45° cone** of the pressed direction: the displacement along the navigation axis MUST be strictly greater than the displacement along the perpendicular axis. If no candidate satisfies the cone constraint, the nearest element in the general pressed direction (any positive displacement along the navigation axis) is chosen instead. The display input SHALL be included as a candidate alongside buttons.

#### Scenario: Navigate right from a button — same row preferred over diagonal
- **WHEN** the `arcsin` button is focused and the user presses ArrowRight
- **THEN** the `arccos` button receives focus (not a button in the row below)

#### Scenario: Navigate right from a button
- **WHEN** the `7` button is focused and the user presses ArrowRight
- **THEN** the `8` button receives focus

#### Scenario: Navigate down from a button
- **WHEN** the `7` button is focused and the user presses ArrowDown
- **THEN** the `4` button receives focus

#### Scenario: No button in direction
- **WHEN** the focused button is at the rightmost edge and the user presses ArrowRight
- **THEN** focus does not move (or falls back to nearest in general direction if available)

#### Scenario: Arrow key does not scroll the page
- **WHEN** any button is focused and the user presses an arrow key
- **THEN** the page does not scroll

#### Scenario: ArrowDown from sci toggle focuses the display
- **WHEN** the `[sci]`/`[basic]` toggle button is focused and the user presses ArrowDown
- **THEN** the display input receives focus

#### Scenario: ArrowUp from top sci-panel row focuses the display
- **WHEN** any button in the first row of the scientific panel (RAD/GON/DEG toggle, x², xʸ, sin, cos, tan) is focused and the user presses ArrowUp
- **THEN** the display input receives focus
