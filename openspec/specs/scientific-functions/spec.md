### Requirement: Scientific panel is toggleable
The calculator SHALL provide a `[sci]` toggle button that shows or hides the scientific button panel. The panel SHALL be hidden by default.

#### Scenario: Opening the scientific panel
- **WHEN** the user presses the `[sci]` button and the panel is hidden
- **THEN** the scientific button panel becomes visible

#### Scenario: Closing the scientific panel
- **WHEN** the user presses the `[sci]` button and the panel is visible
- **THEN** the scientific button panel becomes hidden

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

### Requirement: log computes the base-10 logarithm
The calculator SHALL provide a `log` button that replaces the current display value with its base-10 logarithm. If the value is ≤ 0, the display SHALL show `Error`.

#### Scenario: log of 100
- **WHEN** the display shows `100` and the user presses `log`
- **THEN** the display shows `2`

#### Scenario: log of zero shows Error
- **WHEN** the display shows `0` and the user presses `log`
- **THEN** the display shows `Error`

#### Scenario: log of negative shows Error
- **WHEN** the display shows `-5` and the user presses `log`
- **THEN** the display shows `Error`

### Requirement: ln computes the natural logarithm
The calculator SHALL provide an `ln` button that replaces the current display value with its natural logarithm. If the value is ≤ 0, the display SHALL show `Error`.

#### Scenario: ln of e
- **WHEN** the display shows `2.718281828459045` and the user presses `ln`
- **THEN** the display shows `1`

#### Scenario: ln of zero shows Error
- **WHEN** the display shows `0` and the user presses `ln`
- **THEN** the display shows `Error`

### Requirement: √ computes the square root
The calculator SHALL provide a `√` button that replaces the current display value with its square root. If the value is negative, the display SHALL show `Error`.

#### Scenario: √ of 9
- **WHEN** the display shows `9` and the user presses `√`
- **THEN** the display shows `3`

#### Scenario: √ of negative shows Error
- **WHEN** the display shows `-4` and the user presses `√`
- **THEN** the display shows `Error`

### Requirement: x² squares the display value
The calculator SHALL provide an `x²` button that replaces the current display value with its square.

#### Scenario: squaring 5
- **WHEN** the display shows `5` and the user presses `x²`
- **THEN** the display shows `25`

### Requirement: xʸ raises base to an exponent
The calculator SHALL provide an `xʸ` button that stores the current display value as the base and waits for the exponent. Pressing `=` SHALL compute and display `base ^ exponent`.

#### Scenario: 2 to the power of 8
- **WHEN** the user enters `2`, presses `xʸ`, enters `8`, then presses `=`
- **THEN** the display shows `256`

### Requirement: π inserts the value of pi
The calculator SHALL provide a `π` button that sets the display to the value of π (`3.141592653589793`).

#### Scenario: pressing π
- **WHEN** the user presses `π`
- **THEN** the display shows `3.141592653589793`

### Requirement: e inserts Euler's number
The calculator SHALL provide an `e` button that sets the display to the value of e (`2.718281828459045`).

#### Scenario: pressing e
- **WHEN** the user presses `e`
- **THEN** the display shows `2.718281828459045`

### Requirement: ± toggles the sign of the display value
The calculator SHALL provide a `±` button that negates the current display value. If the display shows `0` or `Error`, pressing `±` SHALL have no effect.

#### Scenario: negating a positive value
- **WHEN** the display shows `5` and the user presses `±`
- **THEN** the display shows `-5`

#### Scenario: negating a negative value
- **WHEN** the display shows `-3` and the user presses `±`
- **THEN** the display shows `3`

### Requirement: % divides the display value by 100
The calculator SHALL provide a `%` button that divides the current display value by 100.

#### Scenario: percentage of a value
- **WHEN** the display shows `50` and the user presses `%`
- **THEN** the display shows `0.5`

### Requirement: Parentheses enable sub-expression grouping
The calculator SHALL provide `(` and `)` buttons that allow the user to group sub-expressions. Pressing `)` SHALL evaluate the innermost complete parenthesised expression and replace it with the result. An unmatched `)` SHALL show `Error`.

#### Scenario: simple grouped expression
- **WHEN** the user presses `(`, enters `3`, presses `+`, enters `4`, then presses `)`
- **THEN** the display shows `7`

#### Scenario: unmatched closing parenthesis
- **WHEN** the user presses `)` without a matching `(`
- **THEN** the display shows `Error`

### Requirement: Scientific results are rounded to avoid floating-point noise
The calculator SHALL round scientific function results to 10 significant figures before displaying them.

#### Scenario: sin(π) displays 0 not a near-zero float
- **WHEN** the display shows `3.141592653589793` and the user presses `sin`
- **THEN** the display shows `0`
