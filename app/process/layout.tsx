import type { Metadata } from "next";
import { createPageMetadata } from "../lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Så går ett webbprojekt till",
  description: "Från första samtal och tydlig plan till design, utveckling, lansering och uppföljning – så arbetar Birdbrain IT med webbprojekt.",
  path: "/process",
});

export default function ProcessLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
