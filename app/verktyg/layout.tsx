import type { Metadata } from "next";
import { createPageMetadata } from "../lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Gratis verktyg för din webbplats",
  description: "Planera en ny webbplats eller analysera den du redan har med kostnadsfria verktyg från Birdbrain IT.",
  path: "/verktyg",
});

export default function ToolsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
