import type { Metadata } from "next";
import { createPageMetadata } from "../lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Webbutveckling, design & företagande – Insikter",
  description: "Tankar, praktiska råd och lärdomar om webbutveckling, design och att bygga digitala lösningar och företag.",
  path: "/insikter",
});

export default function InsightsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
