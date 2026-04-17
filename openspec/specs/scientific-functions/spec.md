### Requirement: Scientific panel is toggleable
The calculator SHALL provide a `[sci]` toggle button that shows or hides the scientific button panel. The panel SHALL be hidden by default.

#### Scenario: Opening the scientific panel
- **WHEN** the user presses the `[sci]` button and the panel is hidden
- **THEN** the scientific button panel becomes visible

#### Scenario: Closing the scientific panel
- **WHEN** the user presses the `[sci]` button and the panel is visible
- **THEN** the scientific button panel becomes hidden

### Requirement: sin computes the sine of the display value
The calculator SHALL provide a `sin` button that replaces the current display value with its sine (in radians). If the display shows `Error`, pressing `sin` SHALL have no effect.

#### Scenario: sin of zero
- **WHEN** the display shows `0` and the user presses `sin`
- **THEN** the display shows `0`

#### Scenario: sin of π/2
- **WHEN** the display shows `1.5707963267948966` and the user presses `sin`
- **THEN** the display shows `1`

### Requirement: cos computes the cosine of the display value
The calculator SHALL provide a `cos` button that replaces the current display value with its cosine (in radians).

#### Scenario: cos of zero
- **WHEN** the display shows `0` and the user presses `cos`
- **THEN** the display shows `1`

#### Scenario: cos of π
- **WHEN** the display shows `3.141592653589793` and the user presses `cos`
- **THEN** the display shows `-1`

### Requirement: tan computes the tangent of the display value
The calculator SHALL provide a `tan` button that replaces the current display value with its tangent (in radians).

#### Scenario: tan of zero
- **WHEN** the display shows `0` and the user presses `tan`
- **THEN** the display shows `0`

#### Scenario: tan of π/4
- **WHEN** the display shows `0.7853981633974483` and the user presses `tan`
- **THEN** the display shows `1`

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
