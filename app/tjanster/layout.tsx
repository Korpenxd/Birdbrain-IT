import type { Metadata } from "next";
import { createPageMetadata } from "../lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Webbdesign & webbutveckling i Alingsås",
  description: "Webbdesign, webbutveckling och skräddarsydda digitala lösningar för småföretag och idéer som behöver en tydlig väg framåt.",
  path: "/tjanster",
});

export default function ServicesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
