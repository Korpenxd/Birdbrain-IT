import type { Metadata } from "next";
import { createPageMetadata } from "../lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Om Birdbrain IT | Webbutvecklare i Alingsås",
  description: "Lär känna Adam Ström, utvecklaren bakom Birdbrain IT, och arbetssättet bakom personliga, genomtänkta digitala lösningar från Alingsås.",
  path: "/om-mig",
  absoluteTitle: true,
});

export default function AboutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
