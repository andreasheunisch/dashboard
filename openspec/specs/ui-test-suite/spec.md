### Requirement: Test suite runs with a single command
The project SHALL provide a `test` script in `package.json` that executes all Playwright tests. The script SHALL start the server automatically if it is not already running, and stop it when tests finish.

#### Scenario: Running tests from scratch
- **WHEN** a developer runs `pnpm test` with no server running
- **THEN** the server starts, all tests execute, and the server stops when done

### Requirement: Dashboard home page is verified
The test suite SHALL verify that the dashboard home page loads and displays the app navigation card for the calculator.

#### Scenario: Home page title
- **WHEN** the browser navigates to `/`
- **THEN** the page title is "Dashboard"

#### Scenario: Calculator card is present
- **WHEN** the browser navigates to `/`
- **THEN** an element linking to `/calculator` is visible on the page

### Requirement: Calculator page loads correctly
The test suite SHALL verify that the calculator page loads and renders the expected UI elements.

#### Scenario: Calculator page title
- **WHEN** the browser navigates to `/calculator`
- **THEN** the page title contains "Calculator"

#### Scenario: Display initialises to zero
- **WHEN** the browser navigates to `/calculator`
- **THEN** the display element shows `0`

#### Scenario: All operator buttons are present
- **WHEN** the browser navigates to `/calculator`
- **THEN** buttons for `+`, `−`, `×`, `÷`, `=`, and `C` are all visible

### Requirement: Calculator arithmetic is verified
The test suite SHALL verify that basic arithmetic operations produce the correct result in the display.

#### Scenario: Addition
- **WHEN** the user clicks `3`, `+`, `4`, `=`
- **THEN** the display shows `7`

#### Scenario: Division by zero
- **WHEN** the user clicks `5`, `÷`, `0`, `=`
- **THEN** the display shows `Error`

#### Scenario: Clear resets the display
- **WHEN** the user clicks `9`, `9`, then `C`
- **THEN** the display shows `0`

### Requirement: Unknown routes return 404
The test suite SHALL verify that requesting a non-existent path results in a 404 response.

#### Scenario: 404 on unknown path
- **WHEN** a request is made to `/nonexistent`
- **THEN** the HTTP response status is `404`
