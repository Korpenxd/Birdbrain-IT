import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const publicImages = join(process.cwd(), "public", "images");

const processGearsSource = await readFile(
  join(process.cwd(), "scripts", "assets", "process-gears-source.svg"),
  "utf8",
);
const processGearsOpenEnd = processGearsSource.indexOf(">");
const processGearsCloseStart = processGearsSource.lastIndexOf("</svg>");
if (processGearsOpenEnd < 0 || processGearsCloseStart < 0) {
  throw new Error("Invalid process gears SVG");
}
const processGearsArtwork = processGearsSource.slice(processGearsOpenEnd + 1, processGearsCloseStart);

function rounded(value) {
  return Number(value.toFixed(2));
}

function polarPoint(cx, cy, radius, degrees) {
  const radians = (degrees * Math.PI) / 180;
  return [rounded(cx + Math.cos(radians) * radius), rounded(cy + Math.sin(radians) * radius)];
}

function processGear({ cx, cy, radius, teeth, phase, innerRadius, holeRadius, className }) {
  const pitch = 360 / teeth;
  const profile = [
    [-0.5, 0.8],
    [-0.34, 0.84],
    [-0.24, 1],
    [0.24, 1],
    [0.34, 0.84],
    [0.5, 0.8],
  ];
  const outline = [];
  const tips = [];
  const inner = [];

  for (let tooth = 0; tooth < teeth; tooth += 1) {
    const angle = phase + tooth * pitch;
    profile.forEach(([offset, scale]) => {
      outline.push(polarPoint(cx, cy, radius * scale, angle + offset * pitch));
    });
    tips.push(polarPoint(cx, cy, radius, angle));
    inner.push(polarPoint(cx, cy, innerRadius, angle + pitch * 0.5));
  }

  const outlinePoints = outline.map(([x, y]) => `${x},${y}`).join(" ");
  const mesh = tips.map(([tipX, tipY], index) => {
    const [innerX, innerY] = inner[index];
    const [nextInnerX, nextInnerY] = inner[(index + 1) % inner.length];
    return `M${tipX} ${tipY}L${innerX} ${innerY}L${nextInnerX} ${nextInnerY}Z`;
  }).join("");
  const spokes = inner.map(([innerX, innerY], index) => {
    const [tipX, tipY] = tips[index];
    return `M${innerX} ${innerY}L${tipX} ${tipY}`;
  }).join("");
  const nodes = [
    ...tips.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4.8"/>`),
    ...inner.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.1"/>`),
  ].join("");

  return `<g class="process-gear ${className}" fill="none" stroke="url(#process-gear-gradient)" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="${outlinePoints}" stroke-width="5"/>
    <circle cx="${cx}" cy="${cy}" r="${rounded(radius * 0.8)}" stroke-width="2.2" opacity=".62"/>
    <circle cx="${cx}" cy="${cy}" r="${innerRadius}" stroke-width="5"/>
    ${holeRadius ? `<circle cx="${cx}" cy="${cy}" r="${holeRadius}" stroke-width="4"/>` : ""}
    <path d="${mesh}" stroke-width="1.65" opacity=".68"/>
    <path d="${spokes}" stroke-width="2.2" opacity=".82"/>
    <g fill="#dffbff" stroke="none">${nodes}</g>
  </g>`;
}

const largeProcessGear = processGear({
  cx: 385,
  cy: 700,
  radius: 340,
  teeth: 16,
  phase: -52.79,
  innerRadius: 210,
  holeRadius: 0,
  className: "process-gear-large",
});
const mediumProcessGear = processGear({
  cx: 772,
  cy: 357,
  radius: 255,
  teeth: 12,
  phase: 138.46,
  innerRadius: 112,
  holeRadius: 86,
  className: "process-gear-medium",
});
const smallProcessGear = processGear({
  cx: 1030,
  cy: 643,
  radius: 170,
  teeth: 8,
  phase: 250.44,
  innerRadius: 76,
  holeRadius: 56,
  className: "process-gear-small",
});

const processGearsAnimated = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1254 1254" role="img" aria-labelledby="process-gears-title process-gears-description">
<title id="process-gears-title">Three interlocking neon wireframe gears</title>
<desc id="process-gears-description">A large gear containing a brain rotates with two smaller meshed gears.</desc>
<style>
  .process-gear { transform-box: view-box; will-change: transform; }
  .process-gear-large { transform-origin: 385px 700px; animation: process-gear-clockwise 32s linear infinite; }
  .process-gear-medium { transform-origin: 772px 357px; animation: process-gear-counter 24s linear infinite; }
  .process-gear-small { transform-origin: 1030px 643px; animation: process-gear-clockwise 16s linear infinite; }
  @keyframes process-gear-clockwise { to { transform: rotate(360deg); } }
  @keyframes process-gear-counter { to { transform: rotate(-360deg); } }
  @media (prefers-reduced-motion: reduce) { .process-gear { animation: none; } }
</style>
<defs>
  <g id="process-gears-source-art">${processGearsArtwork}</g>
  <linearGradient id="process-gear-gradient" x1="110" y1="240" x2="1080" y2="1000" gradientUnits="userSpaceOnUse"><stop stop-color="#38edff"/><stop offset=".5" stop-color="#5272ff"/><stop offset="1" stop-color="#f04ce9"/></linearGradient>
  <mask id="process-brain-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="1254" height="1254">
    <rect width="1254" height="1254" fill="black"/><ellipse cx="420" cy="650" rx="190" ry="212" fill="white"/>
  </mask>
</defs>
${largeProcessGear}
${mediumProcessGear}
${smallProcessGear}
<g transform="translate(-35 50)" mask="url(#process-brain-mask)"><use href="#process-gears-source-art"/></g>
</svg>`;

await writeFile(join(publicImages, "process-gears-animated.svg"), processGearsAnimated);

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
    transform: "translate(0 0)",
    replacement: "<g/>",
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
