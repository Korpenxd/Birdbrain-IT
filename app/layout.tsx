import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteShell } from "./components/site-shell";
import { absoluteUrl, DEFAULT_DESCRIPTION, JsonLd, SITE_NAME, SITE_ORIGIN } from "./lib/seo";
import "./globals.css";

const themeBootstrap = `
  (() => {
    try {
      const saved = localStorage.getItem("birdbrain-theme");
      const preferred = matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
      document.documentElement.dataset.theme = saved === "light" || saved === "dark" ? saved : preferred;
    } catch {
      document.documentElement.dataset.theme = "dark";
    }
  })();
`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: "Webbutveckling i Alingsås | Birdbrain IT",
    template: "%s | Birdbrain IT",
  },
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: SITE_ORIGIN },
  openGraph: {
    title: "Webbutveckling i Alingsås | Birdbrain IT",
    description: DEFAULT_DESCRIPTION,
    url: SITE_ORIGIN,
    siteName: SITE_NAME,
    type: "website",
    locale: "sv_SE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Webbutveckling i Alingsås | Birdbrain IT",
    description: DEFAULT_DESCRIPTION,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sv" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": `${SITE_ORIGIN}/#website`,
                name: SITE_NAME,
                url: SITE_ORIGIN,
                inLanguage: "sv-SE",
                publisher: { "@id": `${SITE_ORIGIN}/#organization` },
              },
              {
                "@type": "Organization",
                "@id": `${SITE_ORIGIN}/#organization`,
                name: SITE_NAME,
                url: SITE_ORIGIN,
                logo: absoluteUrl("/favicon.svg"),
                email: "Hello@birdbrain.it",
                founder: {
                  "@type": "Person",
                  name: "Adam Ström",
                  url: absoluteUrl("/om-mig"),
                },
              },
            ],
          }}
        />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
