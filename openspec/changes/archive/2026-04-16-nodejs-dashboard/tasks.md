## 1. Project Setup

- [x] 1.1 Create `package.json` with name, version, and `"main": "server.js"`
- [x] 1.2 Add a `start` script (`node server.js`) to `package.json`

## 2. Hello Page

- [x] 2.1 Create `public/index.html` with a styled HTML hello message
- [x] 2.2 Create `server.js` using the built-in `http` module
- [x] 2.3 Implement `GET /` handler: read and serve `public/index.html` with status 200 and `Content-Type: text/html`
- [x] 2.4 Implement fallback handler: return 404 for all other paths

## 3. Port Configuration

- [x] 3.1 Read `process.env.PORT` in `server.js`, defaulting to `3000`
- [x] 3.2 Log the listening address to stdout on startup

## 4. Verification

- [x] 4.1 Start the server with `npm start` and confirm the hello page loads at `http://localhost:3000`
- [x] 4.2 Confirm a request to an unknown path (e.g. `/foo`) returns 404
- [x] 4.3 Confirm the server respects a custom `PORT` environment variable
