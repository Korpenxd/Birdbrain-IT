import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteShell } from "./components/site-shell";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://birdbrain.it"),
  title: {
    default: "Birdbrain IT — Webbutveckling i Alingsås",
    template: "%s — Birdbrain IT",
  },
  description:
    "Webbplatser, webbappar och skräddarsydda digitala lösningar för individer och småföretag.",
  openGraph: {
    title: "Birdbrain IT",
    description:
      "Digitala lösningar som gör idéer verkliga. Personlig webbutveckling från Alingsås.",
    type: "website",
    locale: "sv_SE",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sv">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
