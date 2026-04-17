## MODIFIED Requirements

### Requirement: Scientific panel is toggleable
The calculator SHALL provide a `[sci]` toggle button that shows or hides the scientific button panel and the angle-unit indicator label. Both SHALL be hidden by default.

#### Scenario: Opening the scientific panel
- **WHEN** the user presses the `[sci]` button and the panel is hidden
- **THEN** the scientific button panel and angle-unit label become visible

#### Scenario: Closing the scientific panel
- **WHEN** the user presses the `[sci]` button and the panel is visible
- **THEN** the scientific button panel and angle-unit label become hidden
