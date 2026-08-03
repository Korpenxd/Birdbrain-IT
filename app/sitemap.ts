import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/tjanster", "/arbete", "/om-mig", "/process", "/insikter", "/verktyg", "/kontakt"];
  return routes.map((route) => ({
    url: `https://birdbrain.it${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
