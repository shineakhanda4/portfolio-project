import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { createGzip } from "node:zlib";

const root = path.resolve("dist");
const port = Number(process.env.PORT || 4174);

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
};

async function findFile(pathname) {
  const decoded = decodeURIComponent(pathname);
  const safePath = path.normalize(decoded).replace(/^(\.\.[/\\])+/, "");
  const base = path.join(root, safePath);

  if (!base.startsWith(root)) return null;

  const candidates = decoded.endsWith("/")
    ? [path.join(base, "index.html")]
    : [base, `${base}.html`, path.join(base, "index.html")];

  for (const candidate of candidates) {
    try {
      const details = await stat(candidate);
      if (details.isFile()) return candidate;
    } catch {
      // Try the next candidate.
    }
  }

  return null;
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);
  const file = await findFile(url.pathname);
  const fallback = path.join(root, "404.html");
  const resolved = file || fallback;
  const contentType = contentTypes[path.extname(resolved)] || "application/octet-stream";

  const compressible = /\.(?:html|css|js|mjs|json|xml|txt|svg)$/i.test(resolved);
  const acceptsGzip = /\bgzip\b/.test(request.headers["accept-encoding"] || "");
  const useGzip = compressible && acceptsGzip;

  response.writeHead(file ? 200 : 404, {
    "Content-Type": contentType,
    "Cache-Control": "no-store",
    ...(useGzip ? { "Content-Encoding": "gzip", Vary: "Accept-Encoding" } : {}),
  });

  if (request.method === "HEAD") {
    response.end();
    return;
  }

  const stream = createReadStream(resolved);
  stream.on("error", () => {
    if (!response.headersSent) {
      response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    }
    response.end("The requested file could not be read.");
  });

  if (useGzip) {
    const compressor = createGzip();
    compressor.on("error", () => response.end());
    stream.pipe(compressor).pipe(response);
  } else {
    stream.pipe(response);
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Static preview: http://127.0.0.1:${port}`);
});
