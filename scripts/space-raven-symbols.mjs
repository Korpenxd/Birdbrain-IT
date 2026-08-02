import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const publicImages = join(process.cwd(), "public", "images");

const processGears = await readFile(join(publicImages, "process-gears-neon.png"));
const processGearsDataUri = `data:image/png;base64,${processGears.toString("base64")}`;
const processGearsIcon = `<image x="0" y="735" width="260" height="260" preserveAspectRatio="xMidYMid meet" href="${processGearsDataUri}"/>`;

const variants = {
  "raven-services-question.svg": {
    shape: '<rect x="130" y="50" width="190" height="218" rx="26"/><circle cx="214" cy="286" r="27"/>',
    transform: "translate(-60 -30)",
  },
  "raven-work-exclamation.svg": {
    shape: '<rect x="68" y="450" width="60" height="170" rx="22"/>',
    transform: "translate(-35 -25)",
  },
  "raven-about-heart.svg": {
    shape: '<rect x="530" y="90" width="175" height="165" rx="24"/>',
    transform: "translate(65 -35)",
  },
  "raven-process-progress.svg": {
    maskShape: '<path d="M150 932L232 843L286 840L345 760" fill="none" stroke="black" stroke-width="42" stroke-linecap="round" stroke-linejoin="round"/><circle cx="150" cy="932" r="29"/><circle cx="232" cy="843" r="29"/><circle cx="286" cy="840" r="27"/><path d="M304 742h70v70z"/>',
    transform: "translate(-5 0)",
    replacement: processGearsIcon,
  },
  "raven-insights-brain.svg": {
    shape: '<rect x="70" y="590" width="285" height="290" rx="70"/>',
    transform: "translate(-45 30)",
  },
  "raven-contact-message.svg": {
    shape: '<rect x="650" y="165" width="275" height="225" rx="44"/>',
    transform: "translate(55 -20)",
  },
};

for (const [file, config] of Object.entries(variants)) {
  const path = join(publicImages, file);
  const source = await readFile(path, "utf8");

  const openEnd = source.indexOf(">");
  const closeStart = source.lastIndexOf("</svg>");
  if (openEnd < 0 || closeStart < 0) throw new Error(`Invalid SVG: ${file}`);

  const rawOpen = source.slice(0, openEnd).replace(' data-spaced-symbol="true"', "");
  const open = rawOpen.replace("<svg", '<svg data-spaced-symbol="true"');
  const marker = '<g id="raven-source-art">';
  const existingArtworkStart = source.indexOf(marker);
  const existingArtworkEnd = source.indexOf("</g>\n  <", existingArtworkStart + marker.length);
  const artwork = existingArtworkStart >= 0 && existingArtworkEnd >= 0
    ? source.slice(existingArtworkStart + marker.length, existingArtworkEnd)
    : source.slice(openEnd + 1, closeStart);
  const maskShape = config.maskShape ?? config.shape;
  const clippedSymbol = config.replacement
    ? `<g transform="${config.transform}">${config.replacement}</g>`
    : `<g transform="${config.transform}"><use href="#raven-source-art" clip-path="url(#raven-symbol-clip)"/></g>`;
  const clipDefinition = config.replacement
    ? ""
    : `<clipPath id="raven-symbol-clip">${config.shape}</clipPath>`;
  const output = `${open}>
<defs>
  <g id="raven-source-art">${artwork}</g>
  <linearGradient id="raven-symbol-gradient" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#48e6ff"/><stop offset="0.48" stop-color="#4f72ff"/><stop offset="1" stop-color="#f054ef"/></linearGradient>
${clipDefinition}
  <mask id="raven-body-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="1254" height="1254">
    <rect width="1254" height="1254" fill="white"/>
    <g fill="black" stroke="black">${maskShape}</g>
  </mask>
</defs>
<use href="#raven-source-art" mask="url(#raven-body-mask)"/>
${clippedSymbol}
</svg>`;

  await writeFile(path, output);
}
