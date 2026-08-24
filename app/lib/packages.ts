export type WebsitePackageId = "webbpaket" | "webbpaket-plus";

type WebsitePackage = {
  id: WebsitePackageId;
  name: { sv: string; en: string };
  priceExVat: string;
  priceIncVat: string;
  contactHref: string;
};

export const WEBSITE_PACKAGES: readonly WebsitePackage[] = [
  {
    id: "webbpaket",
    name: { sv: "Webbpaket", en: "Website Package" },
    priceExVat: "16 900 kr",
    priceIncVat: "21 125 kr",
    contactHref: "/kontakt?paket=webbpaket",
  },
  {
    id: "webbpaket-plus",
    name: { sv: "Webbpaket Plus", en: "Website Package Plus" },
    priceExVat: "21 900 kr",
    priceIncVat: "27 375 kr",
    contactHref: "/kontakt?paket=webbpaket-plus",
  },
];

export function getWebsitePackage(value: unknown) {
  if (typeof value !== "string") return undefined;
  return WEBSITE_PACKAGES.find((item) => item.id === value);
}
