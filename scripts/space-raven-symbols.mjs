import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const publicImages = join(process.cwd(), "public", "images");

const processCycleIcon = '<g transform="translate(115 720) scale(.88)" fill="none" stroke="url(#raven-symbol-gradient)" stroke-linecap="round" stroke-linejoin="round"><path d="M130 36L224 130L130 224L36 130Z" stroke-width="5"/><path d="M130 57L203 130L130 203L57 130Z" stroke-width="2" opacity=".62"/><path d="M130 36L130 92M224 130H168M130 224V168M36 130H92" stroke-width="2.5"/><path d="M130 92L168 130L130 168L92 130Z" stroke-width="4"/><path d="M130 92L130 168M92 130H168M111 111L149 149M149 111L111 149" stroke-width="1.8" opacity=".78"/><path d="M174 73L190 79L184 95M187 174L181 190L165 184M86 187L70 181L76 165M73 86L79 70L95 76" stroke-width="5"/><polygon points="130,17 150,28 150,50 130,61 110,50 110,28" stroke-width="4"/><polygon points="221,106 242,118 242,142 221,154 200,142 200,118" stroke-width="4"/><polygon points="130,199 150,210 150,232 130,243 110,232 110,210" stroke-width="4"/><polygon points="39,106 60,118 60,142 39,154 18,142 18,118" stroke-width="4"/><g fill="#d9fbff" stroke="none"><circle cx="130" cy="39" r="5"/><circle cx="221" cy="130" r="5"/><circle cx="130" cy="221" r="5"/><circle cx="39" cy="130" r="5"/><circle cx="130" cy="130" r="5.5"/></g></g>';

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
    transform: "translate(-100 35)",
    replacement: processCycleIcon,
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
