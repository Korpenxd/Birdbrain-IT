import type { Metadata } from "next";

export const SITE_NAME = "Birdbrain IT";
export const SITE_ORIGIN = "https://birdbrain.it";
export const DEFAULT_DESCRIPTION =
  "Personlig webbdesign och webbutveckling för företag som vill ha en tydlig, snabb och genomtänkt digital närvaro.";

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_ORIGIN).toString();
}

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  type?: "website" | "article";
  image?: string;
  publishedTime?: string;
};

export function createPageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  type = "website",
  image,
  publishedTime,
}: PageMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
  const images = image
    ? [{ url: absoluteUrl(image), width: 1500, height: 920 }]
    : undefined;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: "sv_SE",
      type,
      images,
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: image ? [absoluteUrl(image)] : undefined,
    },
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
