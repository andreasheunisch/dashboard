const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME_TYPES = {
  '.html': 'text/html',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.svg':  'image/svg+xml',
};

function resolvePath(urlPath) {
  // Strip query string
  const cleanPath = urlPath.split('?')[0];

  // Treat "/" and directory-style paths as index.html
  let relative = cleanPath === '/' ? '/index.html' : cleanPath;
  if (relative.endsWith('/')) relative += 'index.html';

  let resolved = path.normalize(path.join(PUBLIC_DIR, relative));

  // Path traversal guard
  if (!resolved.startsWith(PUBLIC_DIR + path.sep) && resolved !== PUBLIC_DIR) {
    return null;
  }

  // If the resolved path is a directory, look for index.html inside
  try {
    const stat = fs.statSync(resolved);
    if (stat.isDirectory()) {
      resolved = path.join(resolved, 'index.html');
    }
  } catch (e) {
    // File doesn't exist — let readFile handle the ENOENT
  }

  return resolved;
}

const server = http.createServer((req, res) => {
  if (req.method !== 'GET') {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
    return;
  }

  const filePath = resolvePath(req.url);

  if (!filePath) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      }
      return;
    }

    const ext = path.extname(filePath);
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
