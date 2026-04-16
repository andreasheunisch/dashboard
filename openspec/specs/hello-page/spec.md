# Hello Page

## Requirements

### Requirement: Root route returns hello page
The server SHALL respond to `GET /` with a `200 OK` status and an HTML page containing a visible hello message.

#### Scenario: Browser loads root URL
- **WHEN** a client sends `GET /` to the server
- **THEN** the server responds with HTTP `200`, `Content-Type: text/html`, and an HTML body containing the text "Hello"

### Requirement: Non-existent routes return 404
The server SHALL respond to any request for a path other than `/` with a `404 Not Found` status.

#### Scenario: Unknown path requested
- **WHEN** a client sends a request for any path that is not `/`
- **THEN** the server responds with HTTP `404`

### Requirement: Server listens on configurable port
The server SHALL bind to the port defined by the `PORT` environment variable, falling back to port `3000` when the variable is not set.

#### Scenario: Default port used when PORT is unset
- **WHEN** the server starts without a `PORT` environment variable
- **THEN** the server listens on port `3000`

#### Scenario: Custom port used when PORT is set
- **WHEN** the server starts with `PORT=8080`
- **THEN** the server listens on port `8080`
