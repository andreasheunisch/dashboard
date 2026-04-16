## Context

The dashboard currently serves a single static hello page from `public/index.html` via a hand-rolled Node.js `http` server with one route. This change introduces a second route and a second HTML app, which makes hardcoded routing awkward. It also introduces a navigation layer on the home page.

## Goals / Non-Goals

**Goals:**
- Serve `public/calculator/index.html` at `GET /calculator`
- Update `server.js` with minimal generalized static-file serving for the `public/` tree
- Add a navigation card on the home page pointing to the calculator
- Keep everything dependency-free (no npm packages, no bundler)

**Non-Goals:**
- Full generic static file server (only routes needed by current pages)
- Persistent calculator history or state across page loads
- Keyboard input handling (buttons only for now)
- Responsive/mobile layout beyond basic usability

## Decisions

**Static file serving approach**

Instead of adding a one-off `GET /calculator` handler alongside the existing `GET /` handler, extend `server.js` to resolve any request path to a file under `public/`. The mapping is: `GET /` → `public/index.html`, `GET /calculator` → `public/calculator/index.html`, `GET /calculator/` → same. This pattern scales to every future app without touching `server.js` again.

A path traversal guard (`path.normalize` + prefix check) keeps this safe without adding a dependency.

**Calculator implementation**

Single self-contained `public/calculator/index.html` with embedded `<style>` and `<script>`. No external files, no module bundler. The calculator logic uses a simple state machine: `currentInput`, `previousInput`, `operator`. Operations are evaluated when `=` is pressed or when a second operator is entered after a pending calculation.

**Dashboard navigation**

The home page gains a `<nav>` section containing app cards. Each card is a plain `<a>` tag pointing to the app's route. The card for the calculator is the first (and currently only) entry.

## Risks / Trade-offs

- **Path traversal on static serving** → Mitigation: normalize the resolved path and assert it starts with the `public/` directory absolute path before reading.
- **Calculator edge cases** (divide by zero, chained operations) → Mitigation: display "Error" on divide-by-zero; handle chained operators by evaluating the pending operation first.
- **Inline script in HTML** → acceptable for a self-contained app with no build step; revisit if complexity grows.
