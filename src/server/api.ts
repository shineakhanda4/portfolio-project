import { Hono } from "hono";

export type Bindings = {
  RESEND_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
};

type ContactBody = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  projectType?: unknown;
  budget?: unknown;
  message?: unknown;
  company?: unknown;
  consent?: unknown;
};

const app = new Hono<{ Bindings: Bindings }>().basePath("/api");

app.use("*", async (c, next) => {
  c.header("X-Content-Type-Options", "nosniff");
  c.header("X-Powered-By", "Hono");
  c.header("X-Robots-Tag", "noindex");
  c.header("Cache-Control", "no-store");
  await next();
});

app.get("/health", (c) =>
  c.json({
    ok: true,
    service: "shineakhanda.dev",
    backend: "Hono",
    runtime: "Cloudflare Workers / Pages Functions",
    timestamp: new Date().toISOString(),
  }),
);

app.get("/contact", (c) =>
  c.json({ ok: false, message: "Use POST to submit an enquiry." }, 405),
);

app.post("/contact", async (c) => {
  const origin = c.req.header("Origin");
  if (origin && origin !== new URL(c.req.url).origin) {
    return c.json({ ok: false, message: "Request origin is not allowed." }, 403);
  }

  const contentType = c.req.header("Content-Type") ?? "";
  if (!contentType.includes("application/json")) {
    return c.json({ ok: false, message: "Expected a JSON request." }, 415);
  }

  let payload: ContactBody;
  try {
    payload = await c.req.json<ContactBody>();
  } catch {
    return c.json({ ok: false, message: "The request body could not be read." }, 400);
  }

  const text = (value: unknown): string => (typeof value === "string" ? value.trim() : "");
  const name = text(payload.name);
  const email = text(payload.email);
  const phone = text(payload.phone);
  const projectType = text(payload.projectType);
  const budget = text(payload.budget);
  const message = text(payload.message);
  const consent = payload.consent === true;

  // Honeypot: acknowledge without sending anything.
  if (text(payload.company).length > 0) {
    return c.json({ ok: true, message: "Thank you." });
  }

  if (name.length < 2 || name.length > 100) {
    return c.json({ ok: false, message: "Please provide a valid name." }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return c.json({ ok: false, message: "Please provide a valid email address." }, 400);
  }
  if (phone.length > 30) {
    return c.json({ ok: false, message: "The phone number is too long." }, 400);
  }
  if (!projectType || projectType.length > 80) {
    return c.json({ ok: false, message: "Please choose a project type." }, 400);
  }
  if (budget.length > 80) {
    return c.json({ ok: false, message: "The budget selection is invalid." }, 400);
  }
  if (message.length < 20 || message.length > 5000) {
    return c.json({ ok: false, message: "The message must be between 20 and 5,000 characters." }, 400);
  }
  if (!consent) {
    return c.json({ ok: false, message: "Consent is required to process the enquiry." }, 400);
  }

  const recipient = c.env.CONTACT_TO_EMAIL || "me@shineakhanda.dev";
  if (!c.env.RESEND_API_KEY || !c.env.CONTACT_FROM_EMAIL) {
    return c.json(
      {
        ok: false,
        message:
          "The contact form is not configured yet. Please email me@shineakhanda.dev or call +8801302776234.",
      },
      503,
    );
  }

  const escapeHtml = (value: string): string =>
    value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const html = `
    <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.6; max-width: 640px;">
      <h1 style="font-size: 22px; margin: 0 0 20px;">New project enquiry</h1>
      <table style="border-collapse: collapse; width: 100%; margin-bottom: 24px;">
        <tr><td style="padding: 6px 0; color: #666; width: 120px;">Name</td><td>${escapeHtml(name)}</td></tr>
        <tr><td style="padding: 6px 0; color: #666;">Email</td><td>${escapeHtml(email)}</td></tr>
        <tr><td style="padding: 6px 0; color: #666;">Phone</td><td>${escapeHtml(phone || "Not provided")}</td></tr>
        <tr><td style="padding: 6px 0; color: #666;">Project type</td><td>${escapeHtml(projectType)}</td></tr>
        <tr><td style="padding: 6px 0; color: #666;">Budget</td><td>${escapeHtml(budget || "Not provided")}</td></tr>
      </table>
      <div style="border-top: 1px solid #ddd; padding-top: 18px; white-space: pre-wrap;">${escapeHtml(message)}</div>
      <p style="color: #666; font-size: 12px; margin-top: 30px;">Sent from shineakhanda.dev via Hono on Cloudflare. Direct line: +8801302776234</p>
    </div>
  `;

  let resendResponse: Response;
  try {
    resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${c.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: c.env.CONTACT_FROM_EMAIL,
        to: [recipient],
        reply_to: email,
        subject: `New portfolio enquiry — ${projectType}`,
        html,
      }),
    });
  } catch {
    return c.json(
      {
        ok: false,
        message:
          "The email provider could not be reached. Please try again, email me@shineakhanda.dev, or call +8801302776234.",
      },
      502,
    );
  }

  if (!resendResponse.ok) {
    return c.json(
      {
        ok: false,
        message:
          "The message could not be delivered by the email provider. Please email me@shineakhanda.dev or call +8801302776234.",
      },
      502,
    );
  }

  return c.json({ ok: true, message: "Your message has been sent." });
});

app.notFound((c) => c.json({ ok: false, message: "API route not found." }, 404));

export { app };
