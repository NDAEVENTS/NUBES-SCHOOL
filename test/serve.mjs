// Serves dist/ like Cloudflare Pages: real files, otherwise index.html
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';
const T = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.pdf': 'application/pdf', '.png': 'image/png' };
export function serve(port = 8788) {
  return new Promise(r => { const s = createServer((req, res) => {
    let p = join('dist', decodeURIComponent(new URL(req.url, 'http://x').pathname));
    if (!existsSync(p) || statSync(p).isDirectory()) p = 'dist/index.html';
    res.writeHead(200, { 'Content-Type': T[extname(p)] || 'application/octet-stream' }); res.end(readFileSync(p));
  }).listen(port, () => r(s)); });
}
