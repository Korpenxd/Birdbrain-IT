const MAX_REFERENCE_LENGTH = 8_192;
const MAX_FIELD_LENGTH = 180;

function safeDisplayValue(value: string | null): string | null {
  if (!value) return null;
  const normalized = value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim();
  return normalized && normalized.length <= MAX_FIELD_LENGTH ? normalized : null;
}

export function validatePlannerSummaryUrl(value: string | null): string | null {
  if (!value || value.length > MAX_REFERENCE_LENGTH) return null;
  try {
    const url = new URL(value);
    const allowedHost = url.hostname === "planner.birdbrain.it" || url.hostname === "localhost";
    const allowedProtocol = url.protocol === "https:" || (url.protocol === "http:" && url.hostname === "localhost");
    if (!allowedHost || !allowedProtocol || url.username || url.password) return null;
    if (url.searchParams.get("step") !== "summary" || !url.hash.startsWith("#plan=")) return null;
    return url.toString();
  } catch {
    return null;
  }
}

export function buildPlannerContactPrefill(search: string, currentValue = ""): string {
  if (currentValue.trim()) return currentValue;

  const params = new URLSearchParams(search);
  const plannerUrl = validatePlannerSummaryUrl(params.get("planner"));
  if (!plannerUrl) return currentValue;

  const locale = params.get("lang") === "en" ? "en" : "sv";
  const websiteType = safeDisplayValue(params.get("type"));
  const scope = safeDisplayValue(params.get("scope"));
  const direction = safeDisplayValue(params.get("direction"));
  const estimate = safeDisplayValue(params.get("estimate"));

  const lines = locale === "sv"
    ? ["Hej!", "", "Jag har fyllt i Webbplatsplaneraren och vill gärna diskutera det här projektet.", ""]
    : ["Hello!", "", "I completed the Website Planner and would like to discuss this project.", ""];

  if (websiteType) lines.push(`${locale === "sv" ? "Webbplatstyp" : "Website type"}: ${websiteType}`);
  if (scope) lines.push(`${locale === "sv" ? "Omfattning" : "Scope"}: ${scope}`);
  if (direction) lines.push(`${locale === "sv" ? "Visuell riktning" : "Design direction"}: ${direction}`);
  if (estimate) lines.push("", `${locale === "sv" ? "Uppskattad projektkostnad" : "Estimated project cost"}:`, estimate);
  lines.push(
    "",
    `${locale === "sv" ? "Delbar sammanfattning" : "Planner summary"}:`,
    plannerUrl,
    "",
    `${locale === "sv" ? "Övrig information" : "Additional information"}:`,
    "",
  );
  return lines.join("\n");
}
