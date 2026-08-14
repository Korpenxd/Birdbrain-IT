import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/tjanster",
    "/arbete",
    "/arbete/btc-backtest-hub",
    "/arbete/pixelmani",
    "/arbete/pixelmagi",
    "/om-mig",
    "/process",
    "/insikter",
    "/insikter/5-saker-innan-ett-nytt-projekt",
    "/insikter/darfor-enkel-design-ar-bast",
    "/insikter/driva-eget-som-utvecklare",
    "/verktyg",
    "/kontakt",
  ];
  return routes.map((route) => ({
    url: `https://birdbrain.it${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
