import { mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { chromium } from "playwright-core";

const require = createRequire(import.meta.url);
const axePath = require.resolve("axe-core/axe.min.js");
const base = process.env.BASE_URL || "http://127.0.0.1:4174";
const out = path.resolve(process.env.OUT_DIR || "audit-artifacts");
const executablePath =
  process.env.CHROME_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const routes = [
  "/",
  "/about",
  "/projects",
  "/projects/hylic-sketch",
  "/skills",
  "/services",
  "/services/website-development",
  "/blog",
  "/blog/choosing-the-right-technology-stack",
  "/blog/categories/seo",
  "/blog/tags/typescript",
  "/infrastructure",
  "/contact",
  "/privacy",
];

await mkdir(out, { recursive: true });

const browser = await chromium.launch({ executablePath, headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
});
const page = await context.newPage();
const consoleErrors = [];
const expectedHttpErrors = [];
const failedImages = [];
page.on("console", (message) => {
  if (message.type() !== "error") return;
  const text = message.text();
  const currentUrl = page.url();
  const intentional404 =
    text.includes("Failed to load resource: the server responded with a status of 404") &&
    (currentUrl.includes("/contact") || currentUrl.includes("/definitely-not-a-page"));

  if (intentional404) {
    expectedHttpErrors.push(`${currentUrl} :: ${text}`);
  } else {
    consoleErrors.push(`${currentUrl} :: ${text}`);
  }
});
page.on("pageerror", (error) => consoleErrors.push(`${page.url()} :: PAGEERROR ${error.message}`));
page.on("response", (response) => {
  if (response.request().resourceType() === "image" && response.status() >= 400) {
    failedImages.push(`${response.status()} ${response.url()}`);
  }
});
page.on("requestfailed", (request) => {
  if (request.resourceType() === "image") {
    failedImages.push(`FAILED ${request.url()} :: ${request.failure()?.errorText}`);
  }
});

const axeRoutes = new Set([
  "/",
  "/about",
  "/projects",
  "/projects/hylic-sketch",
  "/skills",
  "/services/website-development",
  "/blog",
  "/blog/choosing-the-right-technology-stack",
  "/contact",
  "/privacy",
]);

const results = [];
const accessibility = [];
for (const route of routes) {
  const response = await page.goto(`${base}${route}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(250);
  const data = await page.evaluate(() => {
    const h1s = [...document.querySelectorAll("h1")].map((node) =>
      node.textContent?.trim().replace(/\s+/g, " "),
    );
    const jsonLd = [...document.querySelectorAll('script[type="application/ld+json"]')].map(
      (script) => {
        try {
          JSON.parse(script.textContent || "");
          return { valid: true };
        } catch (error) {
          return { valid: false, error: String(error) };
        }
      },
    );
    return {
      title: document.title,
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? null,
      htmlLang: document.documentElement.lang,
      h1s,
      bodyChars: document.body.innerText.length,
      imageCount: document.images.length,
      jsonLd,
      horizontalOverflow:
        document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      headerHeight: document.querySelector("header")?.getBoundingClientRect().height ?? 0,
    };
  });

  if (axeRoutes.has(route)) {
    await page.addScriptTag({ path: axePath });
    const axeResult = await page.evaluate(async (runAllRules) => {
      const result = await window.axe.run(
        document,
        runAllRules
          ? {}
          : {
              runOnly: {
                type: "tag",
                values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"],
              },
            },
      );
      return result.violations.map((violation) => ({
        id: violation.id,
        impact: violation.impact,
        help: violation.help,
        nodes: violation.nodes.length,
        targets: violation.nodes.slice(0, 4).map((node) => node.target.join(" ")),
      }));
    }, Boolean(process.env.AXE_ALL));
    accessibility.push({ route, violations: axeResult });
  }

  results.push({ route, status: response?.status(), ...data });
}

await page.goto(`${base}/`, { waitUntil: "networkidle" });
await page.screenshot({ path: path.join(out, "home-desktop.png"), fullPage: true });

await page.goto(`${base}/projects`, { waitUntil: "networkidle" });
await page.screenshot({ path: path.join(out, "projects-top.png") });
await page.evaluate(() => window.scrollTo(0, 1050));
await page.waitForTimeout(500);
await page.screenshot({ path: path.join(out, "projects-scroll.png") });
const bookState = await page.evaluate(() => {
  const cards = [...document.querySelectorAll(".project-book-card")];
  return cards.map((card) => {
    const inner = card.querySelector(".book-page");
    return {
      top: Math.round(card.getBoundingClientRect().top),
      position: getComputedStyle(card).position,
      transform: inner ? getComputedStyle(inner).transform : null,
      zIndex: getComputedStyle(card).zIndex,
    };
  });
});

await page.goto(`${base}/blog`, { waitUntil: "networkidle" });
await page.fill("#journal-search", "typescript");
await page.waitForTimeout(250);
const searchState = await page.evaluate(() => ({
  articleCards: document.querySelectorAll("article").length,
  resultText: document.querySelector('[aria-live="polite"]')?.textContent?.trim(),
}));
await page.screenshot({ path: path.join(out, "blog-search.png") });

await page.goto(`${base}/contact`, { waitUntil: "networkidle" });
await page.click('button[type="submit"]');
await page.waitForTimeout(150);
const formErrors = await page.evaluate(() => ({
  errors: [...document.querySelectorAll("[id$='-error']")].map((node) =>
    node.textContent?.trim(),
  ),
  activeId: document.activeElement?.id,
}));
await page.screenshot({ path: path.join(out, "contact-validation.png"), fullPage: true });

await page.goto(`${base}/`, { waitUntil: "networkidle" });
await page.locator('header nav[aria-label="Primary navigation"] a[href="/projects"]').click();
await page.waitForURL("**/projects");
await page.waitForFunction(() => document.querySelector("main h1")?.textContent?.includes("Work that"));
await page.waitForTimeout(300);
const clientNavigation = await page.evaluate(() => ({
  path: window.location.pathname,
  title: document.title,
  canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href"),
  h1: document.querySelector("main h1")?.textContent?.trim().replace(/\s+/g, " "),
  loadingVisible: Boolean(document.querySelector('[role="status"]')?.textContent?.includes("Loading")),
}));

await page.locator('main a[href="/projects/hylic-sketch"]').first().click();
await page.waitForURL("**/projects/hylic-sketch");
await page.waitForFunction(() => document.querySelector("main h1")?.textContent?.includes("Hylic"));
await page.waitForTimeout(250);
const projectNavigation = await page.evaluate(() => ({
  path: window.location.pathname,
  title: document.title,
  canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href"),
  h1: document.querySelector("main h1")?.textContent?.trim().replace(/\s+/g, " "),
}));

await page.goto(`${base}/contact`, { waitUntil: "networkidle" });
await page.fill("#name", "Browser Audit");
await page.fill("#email", "audit@example.com");
await page.selectOption("#projectType", "Business website");
await page.fill("#message", "This is a test enquiry generated by the local browser audit.");
await page.check("#consent");
await page.click('button[type="submit"]');
await page.waitForSelector('[role="alert"]', { timeout: 5000 }).catch(() => null);
const contactFailureState = await page.evaluate(() => ({
  alert: document.querySelector('[role="alert"]')?.textContent?.trim().replace(/\s+/g, " "),
  success: Boolean(document.querySelector('[role="status"]')),
}));

const missingResponse = await page.goto(`${base}/definitely-not-a-page`, { waitUntil: "networkidle" });
const notFoundState = await page.evaluate(() => ({
  title: document.title,
  robots: document.querySelector('meta[name="robots"]')?.getAttribute("content"),
  h1: document.querySelector("main h1")?.textContent?.trim(),
}));
notFoundState.status = missingResponse?.status();

const mobile = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 1,
  isMobile: true,
  hasTouch: true,
});
const mobilePage = await mobile.newPage();
await mobilePage.goto(`${base}/`, { waitUntil: "networkidle" });
await mobilePage.screenshot({ path: path.join(out, "home-mobile.png"), fullPage: true });
await mobilePage.click('button[aria-controls="mobile-navigation"]');
await mobilePage.waitForTimeout(300);
const mobileMenu = await mobilePage.evaluate(() => ({
  expanded: document
    .querySelector('button[aria-controls="mobile-navigation"]')
    ?.getAttribute("aria-expanded"),
  visible: Boolean(document.querySelector("#mobile-navigation")),
  bodyOverflow: document.body.style.overflow,
  horizontalOverflow:
    document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
}));
await mobilePage.screenshot({ path: path.join(out, "mobile-menu.png") });

const initialMenuFocus = await mobilePage.evaluate(
  () => document.activeElement?.textContent?.trim().replace(/\s+/g, " "),
);
await mobilePage.locator('#mobile-navigation a[href]').last().focus();
await mobilePage.keyboard.press("Tab");
const focusAfterLast = await mobilePage.evaluate(() => ({
  label: document.activeElement?.getAttribute("aria-label"),
  text: document.activeElement?.textContent?.trim().replace(/\s+/g, " "),
}));
await mobilePage.keyboard.press("Escape");
await mobilePage.waitForTimeout(100);
const escapeState = await mobilePage.evaluate(() => ({
  expanded: document
    .querySelector('button[aria-controls="mobile-navigation"]')
    ?.getAttribute("aria-expanded"),
  activeLabel: document.activeElement?.getAttribute("aria-label"),
  menuPresent: Boolean(document.querySelector("#mobile-navigation")),
}));
const menuKeyboard = { initialMenuFocus, focusAfterLast, escapeState };

const tablet = await browser.newContext({ viewport: { width: 820, height: 1180 } });
const tabletPage = await tablet.newPage();
await tabletPage.goto(`${base}/projects`, { waitUntil: "networkidle" });
const tabletState = await tabletPage.evaluate(() => {
  const card = document.querySelector(".project-book-card");
  return card ? { position: getComputedStyle(card).position } : null;
});

const reduced = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "reduce",
});
const reducedPage = await reduced.newPage();
await reducedPage.goto(`${base}/projects`, { waitUntil: "networkidle" });
const reducedState = await reducedPage.evaluate(() => {
  const card = document.querySelector(".project-book-card");
  return card
    ? { position: getComputedStyle(card).position, marginBottom: getComputedStyle(card).marginBottom }
    : null;
});

console.log(
  JSON.stringify(
    {
      results,
      consoleErrors,
      expectedHttpErrors,
      failedImages,
      accessibility,
      bookState,
      searchState,
      formErrors,
      contactFailureState,
      notFoundState,
      clientNavigation,
      projectNavigation,
      mobileMenu,
      menuKeyboard,
      tabletState,
      reducedState,
    },
    null,
    2,
  ),
);

await browser.close();
