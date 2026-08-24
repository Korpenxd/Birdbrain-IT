import type { Metadata } from "next";

import { createPageMetadata } from "../lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Webbpaket med fast pris",
  description:
    "Tydliga webbpaket med fast pris från Birdbrain IT i Alingsås för småföretag som vill ha en professionell och individuellt designad webbplats.",
  path: "/paket",
});

export default function PackageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
