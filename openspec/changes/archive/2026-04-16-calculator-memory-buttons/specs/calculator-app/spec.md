## ADDED Requirements

### Requirement: M+ stores the current value in memory
The calculator SHALL provide an `M+` button that adds the current display value to the memory register. If the display shows `Error`, pressing `M+` SHALL have no effect.

#### Scenario: Adding a value to empty memory
- **WHEN** memory is `0` and the display shows `5`, and the user presses `M+`
- **THEN** memory holds `5`

#### Scenario: Accumulating into memory
- **WHEN** memory holds `5` and the display shows `3`, and the user presses `M+`
- **THEN** memory holds `8`

#### Scenario: M+ ignored on Error
- **WHEN** the display shows `Error` and the user presses `M+`
- **THEN** memory is unchanged

### Requirement: MR recalls the memory value to the display
The calculator SHALL provide an `MR` button that copies the current memory register value onto the display as the current input.

#### Scenario: Recalling a stored value
- **WHEN** memory holds `42` and the user presses `MR`
- **THEN** the display shows `42`

#### Scenario: Recalling from empty memory
- **WHEN** memory holds `0` and the user presses `MR`
- **THEN** the display shows `0`

### Requirement: MC clears the memory register
The calculator SHALL provide an `MC` button that resets the memory register to `0`. It SHALL NOT affect the current display value or any pending operation.

#### Scenario: Clearing memory
- **WHEN** memory holds `99` and the user presses `MC`
- **THEN** memory holds `0`

#### Scenario: MC does not affect the display
- **WHEN** the display shows `7` and memory holds `99`, and the user presses `MC`
- **THEN** the display still shows `7`
