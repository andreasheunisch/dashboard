## MODIFIED Requirements

### Requirement: Active angle unit is shown on the toggle button
The calculator SHALL display the active angular unit (RAD, GON, or DEG) as the text label of the angle-unit toggle button itself. A separate angle-unit indicator element is not required. The label SHALL update immediately when the unit changes.

#### Scenario: Default unit label on toggle button
- **WHEN** the page loads and the scientific panel is opened
- **THEN** the angle-unit toggle button shows `RAD`

#### Scenario: Label updates after cycling
- **WHEN** the active unit is DEG and the user presses the toggle button
- **THEN** the toggle button text becomes `RAD`

#### Scenario: Label hidden in basic mode
- **WHEN** the user closes the scientific panel
- **THEN** the angle-unit toggle button is not visible (it is inside the panel)
