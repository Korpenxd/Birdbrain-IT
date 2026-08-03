import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Gratis verktyg för webbprojekt",
  description:
    "Planera en ny webbplats eller analysera den du redan har med kostnadsfria verktyg från Birdbrain IT.",
};

export default function ToolsLayout({ children }: { children: ReactNode }) {
  return children;
}
