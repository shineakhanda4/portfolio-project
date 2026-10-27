import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";

const moduleUrl = pathToFileURL("functions/api/[[path]].ts").href;
let capturedEmail = null;

globalThis.fetch = async (input, init) => {
  if (!String(input).includes("api.resend.com")) {
    throw new Error(`Unexpected outbound request: ${String(input)}`);
  }
  capturedEmail = JSON.parse(init.body);
  return new Response(JSON.stringify({ id: "test-email" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

const { app } = await import(`${moduleUrl}?test=${Date.now()}`);

const health = await app.request("http://localhost/api/health");
assert.equal(health.status, 200);
const healthBody = await health.json();
assert.equal(healthBody.backend, "Hono");
assert.equal(healthBody.runtime, "Cloudflare Pages Functions");
assert.equal(health.headers.get("x-powered-by"), "Hono");

const getContact = await app.request("http://localhost/api/contact");
assert.equal(getContact.status, 405);

const invalid = await app.request(
  "http://localhost/api/contact",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "X",
      email: "not-an-email",
      projectType: "",
      message: "short",
      consent: false,
    }),
  },
  {},
);
assert.equal(invalid.status, 400);

const notConfigured = await app.request(
  "http://localhost/api/contact",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Test User",
      email: "test@example.com",
      projectType: "Business website",
      message: "This is a valid test enquiry for the Hono contact endpoint.",
      consent: true,
    }),
  },
  {},
);
assert.equal(notConfigured.status, 503);

const configured = await app.request(
  "http://localhost/api/contact",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Test User",
      email: "test@example.com",
      projectType: "Business website",
      budget: "Not sure yet",
      message: "This is a valid configured test enquiry for the Hono contact endpoint.",
      consent: true,
    }),
  },
  {
    RESEND_API_KEY: "test-key",
    CONTACT_FROM_EMAIL: "Shine Akhanda Website <website@shineakhanda.dev>",
  },
);
assert.equal(configured.status, 200);
assert.deepEqual(capturedEmail.to, ["me@shineakhanda.dev"]);
assert.equal(capturedEmail.reply_to, "test@example.com");
assert.match(capturedEmail.html, /New project enquiry/);

const missing = await app.request("http://localhost/api/nope");
assert.equal(missing.status, 404);

console.log("Hono API tests passed (health, validation, 503, configured delivery, 404).");
