import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { load as loadYaml } from "js-yaml";

const root = process.cwd();
const publicDir = path.join(root, "public");
const imagesDir = path.join(publicDir, "images");
const projectsDir = path.join(publicDir, "projects");
const blogDir = path.join(publicDir, "blog");

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function coverSvg({ dark, number, category, variant }) {
  const bg = dark ? "#11100e" : "#eeebe3";
  const fg = dark ? "#f2f0ea" : "#11100e";
  const line = dark ? "rgba(242,240,234,0.22)" : "rgba(17,16,14,0.2)";
  const soft = dark ? "rgba(242,240,234,0.08)" : "rgba(17,16,14,0.06)";

  const motifs = [
    `<circle cx="915" cy="326" r="238" fill="none" stroke="${line}" stroke-width="1.5"/>
     <circle cx="915" cy="326" r="184" fill="none" stroke="${line}" stroke-width="1"/>
     <circle cx="915" cy="326" r="130" fill="none" stroke="${line}" stroke-width="1"/>
     <circle cx="915" cy="326" r="76" fill="${soft}"/>`,
    `<path d="M0 675 L430 0" stroke="${line}" stroke-width="1"/>
     <path d="M90 675 L520 0" stroke="${line}" stroke-width="1"/>
     <path d="M180 675 L610 0" stroke="${line}" stroke-width="1"/>
     <rect x="760" y="120" width="340" height="340" fill="none" stroke="${line}" stroke-width="1.5"/>`,
    `<g stroke="${line}" stroke-width="1">
      ${Array.from({ length: 9 }, (_, i) => `<line x1="620" y1="${110 + i * 54}" x2="1130" y2="${110 + i * 54}"/>`).join("")}
     </g>
     <rect x="620" y="164" width="510" height="108" fill="${soft}"/>`,
    `<g stroke="${line}" stroke-width="1">
      ${Array.from({ length: 8 }, (_, i) => `<line x1="${620 + i * 64}" y1="90" x2="${620 + i * 64}" y2="585"/>`).join("")}
     </g>
     <circle cx="980" cy="330" r="112" fill="none" stroke="${line}" stroke-width="2"/>`,
    `<rect x="650" y="105" width="405" height="405" fill="none" stroke="${line}" stroke-width="1.5"/>
     <rect x="710" y="165" width="285" height="285" fill="${soft}"/>
     <line x1="650" y1="510" x2="1055" y2="105" stroke="${line}" stroke-width="1"/>`,
    `<path d="M600 610 C720 470 790 590 900 420 C980 300 1060 300 1160 130" fill="none" stroke="${line}" stroke-width="1.5"/>
     <path d="M600 560 C735 420 790 540 920 370 C1000 260 1080 250 1160 90" fill="none" stroke="${line}" stroke-width="1"/>
     <circle cx="955" cy="205" r="14" fill="${fg}" opacity=".35"/>`,
  ];

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
    <rect width="1200" height="675" fill="${bg}"/>
    <g>${motifs[variant % motifs.length]}</g>
    <text x="72" y="92" font-family="Arial, sans-serif" font-size="16" font-weight="700" letter-spacing="5" fill="${fg}" opacity=".7">SHINE AKHANDA / JOURNAL</text>
    <line x1="72" y1="122" x2="1128" y2="122" stroke="${line}" stroke-width="1"/>
    <text x="1128" y="560" text-anchor="end" font-family="Georgia, 'Times New Roman', serif" font-size="250" font-weight="400" letter-spacing="-12" fill="${fg}" opacity=".16">${number}</text>
    <text x="72" y="555" font-family="Arial, sans-serif" font-size="15" font-weight="700" letter-spacing="4" fill="${fg}" opacity=".6">EDUCATIONAL NOTE</text>
    <text x="72" y="608" font-family="Georgia, 'Times New Roman', serif" font-size="35" fill="${fg}">${escapeXml(category)}</text>
  </svg>`;
}

async function generatePortrait() {
  const source = path.join(publicDir, "android-chrome-512x512.png");
  await sharp(source)
    .trim({ background: "#ffffff", threshold: 8 })
    .resize(512, 512, { fit: "contain", background: "#f2f0ea" })
    .flatten({ background: "#f2f0ea" })
    .webp({ quality: 84 })
    .toFile(path.join(imagesDir, "shine-akhanda-portrait.webp"));
  await sharp(source)
    .trim({ background: "#ffffff", threshold: 8 })
    .resize(512, 512, { fit: "contain", background: "#f2f0ea" })
    .flatten({ background: "#f2f0ea" })
    .jpeg({ quality: 92, progressive: true })
    .toFile(path.join(imagesDir, "shine-akhanda.jpg"));
}

async function generateDefaultOg() {
  const portrait = await sharp(path.join(publicDir, "android-chrome-512x512.png"))
    .trim({ background: "#ffffff", threshold: 8 })
    .resize(420, 420, { fit: "contain", background: "#f2f0ea" })
    .flatten({ background: "#f2f0ea" })
    .toBuffer();

  const background = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <rect width="1200" height="630" fill="#11100e"/>
    <line x1="72" y1="124" x2="700" y2="124" stroke="rgba(242,240,234,0.2)"/>
    <text x="72" y="88" font-family="Arial, sans-serif" font-size="16" font-weight="700" letter-spacing="5" fill="#f2f0ea" opacity=".62">PORTFOLIO / MYMENSINGH, BANGLADESH</text>
    <text x="72" y="250" font-family="Georgia, 'Times New Roman', serif" font-size="82" fill="#f2f0ea">Shine</text>
    <text x="72" y="338" font-family="Georgia, 'Times New Roman', serif" font-size="82" font-style="italic" fill="#f2f0ea">Akhanda</text>
    <text x="72" y="418" font-family="Arial, sans-serif" font-size="17" font-weight="700" letter-spacing="3.5" fill="#f2f0ea" opacity=".62">WEB DEVELOPER / DIGITAL MARKETING EXPERT</text>
    <text x="72" y="480" font-family="Georgia, 'Times New Roman', serif" font-size="26" fill="#f2f0ea" opacity=".72">Web development is my profession;</text>
    <text x="72" y="514" font-family="Georgia, 'Times New Roman', serif" font-size="26" font-style="italic" fill="#f2f0ea" opacity=".72">system administration is my passion.</text>
    <text x="72" y="586" font-family="Arial, sans-serif" font-size="14" font-weight="700" letter-spacing="3" fill="#f2f0ea" opacity=".38">FOUNDER &amp; CEO, CAVE TECHNOLOGIES</text>
    <rect x="716" y="105" width="420" height="420" fill="#f2f0ea"/>
    <rect x="704" y="93" width="444" height="444" fill="none" stroke="rgba(242,240,234,0.28)"/>
    <text x="716" y="566" font-family="Arial, sans-serif" font-size="13" font-weight="700" letter-spacing="3" fill="#f2f0ea" opacity=".45">SHINE AKHANDA / PORTRAIT</text>
  </svg>`;

  await sharp(Buffer.from(background))
    .composite([{ input: portrait, left: 716, top: 105 }])
    .jpeg({ quality: 90, progressive: true })
    .toFile(path.join(imagesDir, "og-default.jpg"));
}

async function generateProjectAssets() {
  const files = await readdir(projectsDir);
  for (const file of files) {
    if (!file.endsWith(".jpg") || file.endsWith("-og.jpg")) continue;
    const source = path.join(projectsDir, file);
    const base = file.replace(/\.jpg$/, "");
    await sharp(source)
      .resize({ width: 1440, withoutEnlargement: true })
      .webp({ quality: 84 })
      .toFile(path.join(projectsDir, `${base}.webp`));
    await sharp(source)
      .resize(1200, 630, { fit: "cover", position: "top" })
      .jpeg({ quality: 84, progressive: true })
      .toFile(path.join(projectsDir, `${base}-og.jpg`));
  }
}

async function generateBlogCovers() {
  const contentDir = path.join(root, "src", "content", "blog");
  const files = (await readdir(contentDir)).filter((file) => file.endsWith(".md"));
  await mkdir(blogDir, { recursive: true });

  for (const [index, file] of files.entries()) {
    const source = await readFile(path.join(contentDir, file), "utf8");
    const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(source);
    if (!match) continue;
    const frontmatter = loadYaml(match[1]);
    const cover = frontmatter?.cover;
    const category = frontmatter?.category;
    if (typeof cover !== "string" || typeof category !== "string") continue;

    const order = typeof frontmatter?.order === "number" ? frontmatter.order : index + 1;
    const output = path.join(publicDir, cover.replace(/^\//, ""));
    await mkdir(path.dirname(output), { recursive: true });
    const svg = coverSvg({
      dark: order % 2 === 1,
      number: String(order).padStart(2, "0"),
      category,
      variant: order - 1,
    });
    await sharp(Buffer.from(svg))
      .jpeg({ quality: 86, progressive: true })
      .toFile(output);
  }
}

async function main() {
  await mkdir(imagesDir, { recursive: true });
  await mkdir(projectsDir, { recursive: true });

  await generatePortrait();
  await generateDefaultOg();
  await generateProjectAssets();
  await generateBlogCovers();

  // Keep a simple dev-oriented robots.txt; the build script writes the production version.
  await writeFile(
    path.join(publicDir, "robots.txt"),
    "User-agent: *\nAllow: /\n\nSitemap: https://shineakhanda.dev/sitemap.xml\n",
    "utf8",
  );

  console.log("Generated portrait, project, blog, and social assets.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
