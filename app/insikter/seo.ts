import type { Metadata } from "next";

import { absoluteUrl, createPageMetadata, SITE_NAME, SITE_ORIGIN } from "../lib/seo";
import type { InsightArticle } from "./articles";

export function createInsightMetadata(article: InsightArticle): Metadata {
  return createPageMetadata({
    title: article.title.sv,
    description: article.excerpt.sv,
    path: `/insikter/${article.slug}`,
    type: "article",
    image: article.image,
    publishedTime: article.publishedAt,
  });
}

export function createInsightStructuredData(article: InsightArticle) {
  const path = `/insikter/${article.slug}`;
  const url = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: article.title.sv,
        description: article.excerpt.sv,
        datePublished: article.publishedAt,
        inLanguage: "sv-SE",
        image: absoluteUrl(article.image),
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        author: { "@type": "Person", name: "Adam Ström", url: absoluteUrl("/om-mig") },
        publisher: { "@id": `${SITE_ORIGIN}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE_ORIGIN },
          { "@type": "ListItem", position: 2, name: "Insikter", item: absoluteUrl("/insikter") },
          { "@type": "ListItem", position: 3, name: article.title.sv, item: url },
        ],
      },
    ],
  };
}
