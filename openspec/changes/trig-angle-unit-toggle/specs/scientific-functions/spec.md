## MODIFIED Requirements

### Requirement: sin computes the sine of the display value
The calculator SHALL provide a `sin` button that replaces the current display value with its sine. The input is interpreted in the active angular unit (DEG, RAD, or GON) and converted to radians before computation. If the display shows `Error`, pressing `sin` SHALL have no effect.

#### Scenario: sin of zero
- **WHEN** the display shows `0` and the user presses `sin`
- **THEN** the display shows `0`

#### Scenario: sin of π/2 in RAD mode
- **WHEN** the active unit is RAD, the display shows `1.5707963267948966`, and the user presses `sin`
- **THEN** the display shows `1`

#### Scenario: sin of 90 in DEG mode
- **WHEN** the active unit is DEG, the display shows `90`, and the user presses `sin`
- **THEN** the display shows `1`

#### Scenario: sin of 100 in GON mode
- **WHEN** the active unit is GON, the display shows `100`, and the user presses `sin`
- **THEN** the display shows `1`

### Requirement: cos computes the cosine of the display value
The calculator SHALL provide a `cos` button that replaces the current display value with its cosine. The input is interpreted in the active angular unit (DEG, RAD, or GON) and converted to radians before computation.

#### Scenario: cos of zero
- **WHEN** the display shows `0` and the user presses `cos`
- **THEN** the display shows `1`

#### Scenario: cos of π in RAD mode
- **WHEN** the active unit is RAD, the display shows `3.141592653589793`, and the user presses `cos`
- **THEN** the display shows `-1`

#### Scenario: cos of 180 in DEG mode
- **WHEN** the active unit is DEG, the display shows `180`, and the user presses `cos`
- **THEN** the display shows `-1`

#### Scenario: cos of 200 in GON mode
- **WHEN** the active unit is GON, the display shows `200`, and the user presses `cos`
- **THEN** the display shows `-1`

### Requirement: tan computes the tangent of the display value
The calculator SHALL provide a `tan` button that replaces the current display value with its tangent. The input is interpreted in the active angular unit (DEG, RAD, or GON) and converted to radians before computation.

#### Scenario: tan of zero
- **WHEN** the display shows `0` and the user presses `tan`
- **THEN** the display shows `0`

#### Scenario: tan of π/4 in RAD mode
- **WHEN** the active unit is RAD, the display shows `0.7853981633974483`, and the user presses `tan`
- **THEN** the display shows `1`

#### Scenario: tan of 45 in DEG mode
- **WHEN** the active unit is DEG, the display shows `45`, and the user presses `tan`
- **THEN** the display shows `1`

#### Scenario: tan of 50 in GON mode
- **WHEN** the active unit is GON, the display shows `50`, and the user presses `tan`
- **THEN** the display shows `1`

## ADDED Requirements

### Requirement: Angle unit toggle cycles through DEG, RAD, GON
The calculator SHALL provide an angle-unit toggle button, visible only when the scientific panel is open, that cycles the active angular unit through DEG → RAD → GON → DEG. The default unit SHALL be RAD.

#### Scenario: Default unit is RAD
- **WHEN** the page loads and the scientific panel is opened
- **THEN** the angle-unit indicator shows `RAD`

#### Scenario: Pressing toggle cycles DEG → RAD → GON
- **WHEN** the active unit is DEG and the user presses the toggle button
- **THEN** the active unit becomes RAD and the indicator updates to `RAD`

#### Scenario: Pressing toggle wraps from GON back to DEG
- **WHEN** the active unit is GON and the user presses the toggle button
- **THEN** the active unit becomes DEG and the indicator updates to `DEG`

### Requirement: Active angle unit is shown as a label on the display
The calculator SHALL display a small label indicating the current angular unit (e.g. `DEG`, `RAD`, `GON`) when the scientific panel is visible. The label SHALL be hidden when the scientific panel is hidden.

#### Scenario: Label visible in scientific mode
- **WHEN** the user opens the scientific panel
- **THEN** the angle-unit label is visible and shows the current unit

#### Scenario: Label hidden in basic mode
- **WHEN** the user closes the scientific panel
- **THEN** the angle-unit label is not visible
