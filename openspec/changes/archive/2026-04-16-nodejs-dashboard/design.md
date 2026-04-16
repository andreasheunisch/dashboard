## Context

This is a greenfield Node.js project with no existing codebase. The goal is a minimal but extensible web server that serves a hello page today and can evolve into a multi-app dashboard. No framework or build toolchain is assumed yet.

## Goals / Non-Goals

**Goals:**
- Working HTTP server with a single `/` route
- Clean project structure that can be extended with new routes/panels later
- Zero external runtime dependencies for the initial version

**Non-Goals:**
- Authentication, sessions, or user management
- Database or persistent state
- Frontend build pipeline (webpack, Vite, etc.) — not needed for a static hello page
- Multi-app routing or iframe embedding — that comes later

## Decisions

**Plain `http` module vs. Express**
Use the built-in `http` module for the initial hello page. It avoids a dependency for something trivially simple. When dashboard panels are added, introducing Express (or Fastify) at that point is a natural, low-risk migration.

**Project layout**
```
/
├── package.json
├── server.js          ← entry point
└── public/
    └── index.html     ← hello page HTML
```
`server.js` reads and serves `public/index.html` for `GET /`, and returns 404 for everything else. This separates server logic from content early, making it easy to add a proper static-file middleware later.

**Port configuration**
Read from `process.env.PORT`, defaulting to `3000`. Follows the 12-factor convention with zero effort.

## Risks / Trade-offs

- **Plain `http` is verbose for routing** → Mitigation: acceptable at one route; migrate to Express when a second route is needed.
- **No hot-reload in development** → Mitigation: acceptable for a hello page; add `nodemon` as a dev dependency when active development begins.
