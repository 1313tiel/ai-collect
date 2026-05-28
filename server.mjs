import { createServer } from "node:http";
import { readFile, writeFile } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve(import.meta.dirname);
const port = Number.parseInt(process.env.PORT || "4173", 10);
const toolsFile = join(root, "data", "tools.json");
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp"
};

function sendJson(response, status, data) {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(data));
}

async function readJsonBody(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  const body = Buffer.concat(chunks).toString("utf8");
  return body ? JSON.parse(body) : {};
}

function isLocalRequest(request) {
  const address = request.socket.remoteAddress || "";
  return address === "127.0.0.1" || address === "::1" || address === "::ffff:127.0.0.1";
}

async function handleToolsApi(request, response, url) {
  if (request.method === "GET" && url.pathname === "/api/tools") {
    const body = await readFile(toolsFile, "utf8");
    response.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    response.end(body);
    return true;
  }

  const match = url.pathname.match(/^\/api\/tools\/([^/]+)$/);
  if (request.method === "POST" && match) {
    if (!isLocalRequest(request)) {
      sendJson(response, 403, { message: "Editing is only allowed from this computer" });
      return true;
    }

    try {
      const id = decodeURIComponent(match[1]);
      const payload = await readJsonBody(request);
      const data = JSON.parse(await readFile(toolsFile, "utf8"));
      const tools = Array.isArray(data.tools) ? data.tools : [];
      const index = tools.findIndex((tool) => tool.id === id);

      if (index < 0) {
        sendJson(response, 404, { message: "Tool not found" });
        return true;
      }

      const current = tools[index];
      const next = {
        ...current,
        ...payload,
        id: current.id,
        categoryId: current.categoryId,
        categoryTitle: current.categoryTitle
      };

      tools[index] = next;
      await writeFile(toolsFile, `${JSON.stringify({ tools }, null, 2)}\n`, "utf8");
      sendJson(response, 200, { tool: next });
      return true;
    } catch (error) {
      sendJson(response, 400, { message: "Invalid JSON payload" });
      return true;
    }
  }

  return false;
}

createServer(async (request, response) => {
  const url = new URL(request.url || "/", `http://${request.headers.host}`);

  if (await handleToolsApi(request, response, url)) {
    return;
  }

  const pathname = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
  const filepath = normalize(join(root, pathname));

  if (!filepath.startsWith(root)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  try {
    const body = await readFile(filepath);
    response.writeHead(200, { "Content-Type": types[extname(filepath)] || "application/octet-stream" });
    response.end(body);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`AI tools page running at http://127.0.0.1:${port}`);
});
