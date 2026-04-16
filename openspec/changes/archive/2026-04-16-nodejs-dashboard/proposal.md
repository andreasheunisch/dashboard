## Why

The project needs a starting point — a Node.js web app that serves a simple hello page today and can grow into a multi-app dashboard over time. Starting minimal keeps the foundation clean and prevents premature complexity.

## What Changes

- New Node.js HTTP server project scaffolded from scratch
- Single route (`/`) that returns a styled HTML hello message
- Basic project structure ready to be extended into a multi-panel dashboard

## Capabilities

### New Capabilities

- `hello-page`: A root HTTP endpoint that renders a styled "Hello" HTML page, establishing the server entry point and routing skeleton for future dashboard panels

### Modified Capabilities

<!-- none -->

## Impact

- New `package.json`, `server.js` (or `src/index.js`), and optional static assets
- No external dependencies required for the initial hello page (plain Node.js `http` module)
- Future dashboard panels will extend the routing layer added here
