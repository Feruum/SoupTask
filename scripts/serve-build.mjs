import http from 'node:http'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
const root = path.resolve(process.argv[2] || 'dist')
const port = Number(process.argv[3] || 4173)
const mime = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.json':'application/json', '.svg':'image/svg+xml', '.png':'image/png', '.woff2':'font/woff2' }
http.createServer(async (req,res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname)
  const file = path.resolve(root, '.' + pathname)
  if (!file.startsWith(root + path.sep) && file !== root) { res.writeHead(403).end(); return }
  try { const data = await readFile(file); res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream'); res.end(data) }
  catch { if (path.extname(pathname)) { res.writeHead(404).end(); return }; res.setHeader('Content-Type','text/html'); res.end(await readFile(path.join(root,'index.html'))) }
}).listen(port,'127.0.0.1',()=>console.log(`Production build ${root} on http://127.0.0.1:${port}`))
