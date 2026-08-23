import type { Metadata } from "next";

import { absoluteUrl, createPageMetadata, SITE_NAME, SITE_ORIGIN } from "../lib/seo";

type ProjectSeo = {
  slug: string;
  title: string;
  description: string;
  image: string;
};

const projects = {
  btc: {
    slug: "btc-backtest-hub",
    title: "BTC Backtest Hub – webbapp & produktdesign",
    description: "Ett case om en local-first analysplattform för att testa handelsstrategier, förstå risk och arbeta mer systematiskt med data.",
    image: "/images/btc-backtest-hub.webp",
  },
  pixelmani: {
    slug: "pixelmani",
    title: "Pixelmani – fotografisk webbportfolio",
    description: "Ett case om en snabb, avskalad och responsiv fotografisk portfolio där bilderna och den visuella berättelsen får ta plats.",
    image: "/images/pixelmani.webp",
  },
  pixelmagi: {
    slug: "pixelmagi",
    title: "Pixelmagi – webbplats för bröllopsfotografi",
    description: "Ett case om en varm, bilddriven webbplats för bröllopsfotografi med fokus på berättelse, förtroende och en enkel väg till kontakt.",
    image: "/images/pixelmagi.webp",
  },
} satisfies Record<string, ProjectSeo>;

export type ProjectSeoKey = keyof typeof projects;

export function createProjectMetadata(key: ProjectSeoKey): Metadata {
  const project = projects[key];
  return createPageMetadata({
    title: project.title,
    description: project.description,
    path: `/arbete/${project.slug}`,
    image: project.image,
  });
}

export function createProjectBreadcrumb(key: ProjectSeoKey) {
  const project = projects[key];
  const url = absoluteUrl(`/arbete/${project.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE_ORIGIN },
      { "@type": "ListItem", position: 2, name: "Arbete", item: absoluteUrl("/arbete") },
      { "@type": "ListItem", position: 3, name: project.title, item: url },
    ],
  };
}
