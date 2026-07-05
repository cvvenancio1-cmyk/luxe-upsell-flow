import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      const normalized = await normalizeCatastrophicSsrResponse(response);
      return withEdgeCache(request, normalized);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};

// Cache static HTML pages on Cloudflare's edge. The upsell page is the same for
// every visitor (no per-user data), so we let Cloudflare serve it from the POP
// closest to the LATAM viewer without invoking the Worker on every request.
// This is what brings TTFB from ~2s down to <200ms.
const CACHEABLE_PATHS = new Set<string>(["/"]);

function withEdgeCache(request: Request, response: Response): Response {
  if (request.method !== "GET") return response;
  if (response.status !== 200) return response;

  const url = new URL(request.url);
  if (!CACHEABLE_PATHS.has(url.pathname)) return response;

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("text/html")) return response;

  // Skip if the SSR layer already set caching semantics.
  if (response.headers.has("cache-control")) return response;

  const headers = new Headers(response.headers);
  // s-maxage: Cloudflare caches for 1h. stale-while-revalidate: keep serving
  // for another 24h while refetching in the background. max-age=0: browsers
  // always revalidate so we can ship new HTML without users seeing stale copies.
  headers.set(
    "cache-control",
    "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
  );
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

