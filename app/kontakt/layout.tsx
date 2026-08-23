import type { Metadata } from "next";
import { createPageMetadata } from "../lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Kontakta Birdbrain IT | Webbutvecklare i Alingsås",
  description: "Har du en webbplats, webbapp eller digital idé i åtanke? Kontakta Birdbrain IT i Alingsås och berätta vad du vill skapa.",
  path: "/kontakt",
  absoluteTitle: true,
});

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
