## Why

The dashboard needs its first real app to demonstrate the multi-app concept and give users something useful. A calculator is the ideal first entry: self-contained, zero dependencies, and immediately familiar to any user.

## What Changes

- New `public/calculator/` directory containing the calculator app (HTML + CSS + JS)
- New server route `GET /calculator` that serves the calculator app
- Dashboard home page (`public/index.html`) updated to display a navigation card linking to the calculator
- `server.js` updated to serve files from `public/` subdirectories (basic static file serving for the `/calculator` route)

## Capabilities

### New Capabilities

- `calculator-app`: A self-contained calculator web page with a display, digit buttons (0–9), basic operation buttons (+, −, ×, ÷), equals, clear, and decimal point
- `dashboard-nav`: A navigation panel on the home page that lists available apps as clickable cards; the calculator is the first entry

### Modified Capabilities

<!-- none -->

## Impact

- `server.js`: needs a new route (or simple static-file handler) for `GET /calculator`
- `public/index.html`: home page gains a navigation card section
- New files: `public/calculator/index.html` (markup + embedded CSS + JS — no build step required)
- No new npm dependencies
