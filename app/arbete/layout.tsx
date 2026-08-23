import type { Metadata } from "next";
import { createPageMetadata } from "../lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Webbprojekt & tidigare arbete",
  description: "Se utvalda webbplatser och digitala produkter som Birdbrain IT har designat och utvecklat med fokus på tydlighet, användbarhet och resultat.",
  path: "/arbete",
});

export default function WorkLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
