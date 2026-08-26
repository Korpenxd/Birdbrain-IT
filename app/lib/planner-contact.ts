const MAX_REFERENCE_LENGTH = 8_192;
const MAX_FIELD_LENGTH = 180;

const ALLOWED_WEBSITE_TYPES = new Set([
  "Portfolio", "Företagswebbplats", "Business website", "Restaurang eller café", "Restaurant or café",
  "Bokningsbaserad verksamhet", "Booking-oriented website", "Webbutik", "Ecommerce",
  "Medlems- eller kundportal", "Membership or accounts",
]);
const ALLOWED_SCOPES = new Set([
  "En sida", "One page", "Upp till 5 sidor", "Up to 5 pages", "6–10 sidor", "6–10 pages",
  "11–20 sidor", "11–20 pages", "20+ sidor", "20+ pages",
]);
const ALLOWED_DIRECTIONS = new Set([
  "Rent & minimalistiskt", "Clean & minimal", "Modigt & modernt", "Bold & modern",
  "Varmt & redaktionellt", "Warm & editorial",
]);
const ALLOWED_PACKAGES = {
  webbpaket: { sv: "Webbpaket", en: "Website Package" },
  "webbpaket-plus": { sv: "Webbpaket Plus", en: "Website Package Plus" },
} as const;

function safeDisplayValue(value: string | null): string | null {
  if (!value) return null;
  const normalized = value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim();
  return normalized && normalized.length <= MAX_FIELD_LENGTH ? normalized : null;
}

function allowedDisplayValue(value: string | null, allowed: ReadonlySet<string>): string | null {
  const safe = safeDisplayValue(value);
  return safe && allowed.has(safe) ? safe : null;
}

export function validatePlannerSummaryUrl(value: string | null): string | null {
  if (!value || value.length > MAX_REFERENCE_LENGTH) return null;
  try {
    const url = new URL(value);
    if (url.origin !== "https://planner.birdbrain.it" || url.username || url.password) return null;
    const isCanonicalSummary = url.pathname === "/"
      && url.searchParams.get("step") === "summary"
      && url.hash.startsWith("#plan=");
    const isShortSummary = /^\/s\/[A-Za-z0-9_-]{6,10}$/.test(url.pathname)
      && !url.search
      && !url.hash;
    if (!isCanonicalSummary && !isShortSummary) return null;
    return url.toString();
  } catch {
    return null;
  }
}

export function buildPlannerContactPrefill(search: string, currentValue = ""): string {
  if (currentValue.trim()) return currentValue;

  const params = new URLSearchParams(search);
  const plannerUrl = validatePlannerSummaryUrl(params.get("planner"));

  const locale = params.get("lang") === "en" ? "en" : "sv";
  const websiteType = allowedDisplayValue(params.get("type"), ALLOWED_WEBSITE_TYPES);
  const scope = allowedDisplayValue(params.get("scope"), ALLOWED_SCOPES);
  const direction = allowedDisplayValue(params.get("direction"), ALLOWED_DIRECTIONS);
  const estimate = safeDisplayValue(params.get("estimate"));
  const packageId = params.get("paket");
  const selectedPackage = packageId && Object.hasOwn(ALLOWED_PACKAGES, packageId)
    ? ALLOWED_PACKAGES[packageId as keyof typeof ALLOWED_PACKAGES]
    : null;
  const hasPlannerContext = params.has("planner") || ["type", "scope", "direction", "estimate", "lang"].some((name) => params.has(name));
  if (!hasPlannerContext || (!plannerUrl && !websiteType && !scope && !direction && !estimate && !selectedPackage)) return currentValue;

  const lines = locale === "sv"
    ? ["Hej!", "", "Jag har fyllt i Webbplatsplaneraren och vill gärna diskutera det här projektet.", ""]
    : ["Hello!", "", "I completed the Website Planner and would like to discuss this project.", ""];

  if (websiteType) lines.push(`${locale === "sv" ? "Webbplatstyp" : "Website type"}: ${websiteType}`);
  if (scope) lines.push(`${locale === "sv" ? "Omfattning" : "Scope"}: ${scope}`);
  if (direction) lines.push(`${locale === "sv" ? "Visuell riktning" : "Design direction"}: ${direction}`);
  if (selectedPackage) lines.push(`${locale === "sv" ? "Valt paket" : "Selected package"}: ${selectedPackage[locale]}`);
  if (estimate) lines.push("", `${locale === "sv" ? "Uppskattad projektkostnad" : "Estimated project cost"}:`, estimate);
  if (plannerUrl) lines.push("", `${locale === "sv" ? "Delbar sammanfattning" : "Planner summary"}:`, plannerUrl);
  lines.push("", `${locale === "sv" ? "Övrig information" : "Additional information"}:`, "");
  return lines.join("\n");
}
