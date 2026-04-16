## ADDED Requirements

### Requirement: Home page displays an app navigation section
The dashboard home page SHALL render a navigation section containing at least one app card. Each card SHALL display the app name and be a clickable link navigating to the app's route.

#### Scenario: Home page loads with calculator card
- **WHEN** a client requests `GET /`
- **THEN** the response HTML contains a navigation card for the calculator with a link to `/calculator`

### Requirement: Calculator is the first navigation entry
The calculator app card SHALL appear as the first item in the navigation section.

#### Scenario: Card order on home page
- **WHEN** the home page navigation section is rendered
- **THEN** the calculator card is the first visible app card
