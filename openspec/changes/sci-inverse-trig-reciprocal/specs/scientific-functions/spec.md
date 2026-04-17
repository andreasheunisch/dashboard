## ADDED Requirements

### Requirement: arcsin computes the inverse sine of the display value
The calculator SHALL provide an `arcsin` button that replaces the current display value with its inverse sine. The result is expressed in the active angular unit (DEG, RAD, or GON). If the display value is outside the domain [−1, 1], the display SHALL show `Error`. If the display shows `Error`, pressing `arcsin` SHALL have no effect.

#### Scenario: arcsin of 1 in RAD mode
- **WHEN** the active unit is RAD, the display shows `1`, and the user presses `arcsin`
- **THEN** the display shows `1.5707963268` (π/2)

#### Scenario: arcsin of 1 in DEG mode
- **WHEN** the active unit is DEG, the display shows `1`, and the user presses `arcsin`
- **THEN** the display shows `90`

#### Scenario: arcsin of 1 in GON mode
- **WHEN** the active unit is GON, the display shows `1`, and the user presses `arcsin`
- **THEN** the display shows `100`

#### Scenario: arcsin of out-of-domain value shows Error
- **WHEN** the display shows `2` and the user presses `arcsin`
- **THEN** the display shows `Error`

### Requirement: arccos computes the inverse cosine of the display value
The calculator SHALL provide an `arccos` button that replaces the current display value with its inverse cosine. The result is expressed in the active angular unit (DEG, RAD, or GON). If the display value is outside the domain [−1, 1], the display SHALL show `Error`. If the display shows `Error`, pressing `arccos` SHALL have no effect.

#### Scenario: arccos of 1 in RAD mode
- **WHEN** the active unit is RAD, the display shows `1`, and the user presses `arccos`
- **THEN** the display shows `0`

#### Scenario: arccos of 0 in DEG mode
- **WHEN** the active unit is DEG, the display shows `0`, and the user presses `arccos`
- **THEN** the display shows `90`

#### Scenario: arccos of 0 in GON mode
- **WHEN** the active unit is GON, the display shows `0`, and the user presses `arccos`
- **THEN** the display shows `100`

#### Scenario: arccos of out-of-domain value shows Error
- **WHEN** the display shows `-2` and the user presses `arccos`
- **THEN** the display shows `Error`

### Requirement: arctan computes the inverse tangent of the display value
The calculator SHALL provide an `arctan` button that replaces the current display value with its inverse tangent. The result is expressed in the active angular unit (DEG, RAD, or GON). The domain is all real numbers; no `Error` case applies. If the display shows `Error`, pressing `arctan` SHALL have no effect.

#### Scenario: arctan of 1 in RAD mode
- **WHEN** the active unit is RAD, the display shows `1`, and the user presses `arctan`
- **THEN** the display shows `0.7853981634` (π/4)

#### Scenario: arctan of 1 in DEG mode
- **WHEN** the active unit is DEG, the display shows `1`, and the user presses `arctan`
- **THEN** the display shows `45`

#### Scenario: arctan of 1 in GON mode
- **WHEN** the active unit is GON, the display shows `1`, and the user presses `arctan`
- **THEN** the display shows `50`

### Requirement: 1/x computes the reciprocal of the display value
The calculator SHALL provide a `1/x` button that replaces the current display value with its reciprocal. If the display value is `0`, the display SHALL show `Error`. If the display shows `Error`, pressing `1/x` SHALL have no effect.

#### Scenario: reciprocal of 2
- **WHEN** the display shows `2` and the user presses `1/x`
- **THEN** the display shows `0.5`

#### Scenario: reciprocal of 0.25
- **WHEN** the display shows `0.25` and the user presses `1/x`
- **THEN** the display shows `4`

#### Scenario: reciprocal of zero shows Error
- **WHEN** the display shows `0` and the user presses `1/x`
- **THEN** the display shows `Error`
