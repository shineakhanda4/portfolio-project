import { app, type Bindings } from "../src/server/api";

type Env = Bindings & {
  ASSETS: {
    fetch(request: Request): Promise<Response>;
  };
};

const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Frame-Options": "DENY",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
  "Content-Security-Policy":
    "default-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; object-src 'none'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; upgrade-insecure-requests",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
};

function withHeaders(
  response: Response,
  pathname: string,
  status = response.status,
): Response {
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    headers.set(key, value);
  }
  if (pathname === "/privacy" || pathname.startsWith("/blog/tags/")) {
    headers.set("X-Robots-Tag", "noindex, follow");
  }
  return new Response(response.body, {
    status,
    statusText: response.statusText,
    headers,
  });
}

async function fetchAsset(
  env: Env,
  request: Request,
  assetPath: string,
): Promise<Response> {
  const url = new URL(assetPath, request.url);
  const assetRequest = new Request(url, {
    method: request.method,
    headers: request.headers,
  });
  return env.ASSETS.fetch(assetRequest);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    let pathname: string;
    try {
      pathname = decodeURIComponent(url.pathname);
    } catch {
      return new Response("Bad Request", { status: 400, headers: SECURITY_HEADERS });
    }

    if (pathname === "/api" || pathname.startsWith("/api/")) {
      return app.fetch(request, env);
    }

    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method Not Allowed", { status: 405, headers: SECURITY_HEADERS });
    }

    if (pathname !== "/" && pathname.endsWith("/")) {
      const redirectUrl = new URL(url);
      redirectUrl.pathname = pathname.replace(/\/+$/, "");
      return Response.redirect(redirectUrl.toString(), 301);
    }

    let response: Response;
    if (pathname === "/") {
      response = await fetchAsset(env, request, "/index.html");
    } else if (/\.[a-z0-9]+$/i.test(pathname)) {
      response = await fetchAsset(env, request, pathname);
    } else {
      response = await fetchAsset(env, request, `${pathname}/index.html`);
      if (response.status === 404) {
        response = await fetchAsset(env, request, `${pathname}.html`);
      }
    }

    if (response.status === 404) {
      const notFound = await fetchAsset(env, request, "/404.html");
      return withHeaders(notFound, pathname, 404);
    }

    return withHeaders(response, pathname);
  },
};
