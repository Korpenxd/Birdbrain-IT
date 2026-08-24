import assert from "node:assert/strict";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

async function fetchPath(pathname) {
  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

async function render(pathname) {
  const response = await fetchPath(pathname);

  assert.equal(response.status, 200, pathname);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  return response.text();
}

test("all public routes render successfully", async () => {
  const publicRoutes = [
    "/", "/tjanster", "/paket", "/arbete", "/arbete/btc-backtest-hub",
    "/arbete/pixelmagi", "/arbete/pixelmani", "/om-mig", "/process",
    "/insikter", "/insikter/5-saker-innan-ett-nytt-projekt",
    "/insikter/darfor-enkel-design-ar-bast", "/insikter/driva-eget-som-utvecklare",
    "/verktyg", "/kontakt", "/kontakt?paket=webbpaket",
    "/kontakt?paket=webbpaket-plus", "/kontakt?paket=unknown",
  ];

  for (const pathname of publicRoutes) await render(pathname);
});

function titleFrom(html) {
  return html.match(/<title>(.*?)<\/title>/s)?.[1].replaceAll("&amp;", "&") ?? "";
}

function jsonLdFrom(html) {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(
    ([, json]) => JSON.parse(json),
  );
}

test("renders route-specific SEO metadata and valid structured data", async () => {
  const routes = [
    ["/", "Webbutveckling i Alingsås | Birdbrain IT"],
    ["/tjanster", "Webbdesign & webbutveckling i Alingsås | Birdbrain IT"],
    ["/paket", "Webbpaket med fast pris | Birdbrain IT"],
    ["/arbete", "Webbprojekt & tidigare arbete | Birdbrain IT"],
    ["/arbete/btc-backtest-hub", "BTC Backtest Hub – webbapp & produktdesign | Birdbrain IT"],
    ["/insikter", "Webbutveckling, design & företagande – Insikter | Birdbrain IT"],
    ["/insikter/5-saker-innan-ett-nytt-projekt", "5 saker jag tänker på innan jag börjar ett nytt projekt | Birdbrain IT"],
    ["/kontakt", "Kontakta Birdbrain IT | Webbutvecklare i Alingsås"],
  ];

  for (const [pathname, expectedTitle] of routes) {
    const html = await render(pathname);
    const canonical = pathname === "/" ? "https://birdbrain.it" : `https://birdbrain.it${pathname}`;
    const title = titleFrom(html);

    assert.equal(title, expectedTitle, pathname);
    assert.equal((title.match(/Birdbrain IT/g) ?? []).length, 1, pathname);
    assert.match(html, new RegExp(`<link rel="canonical" href="${canonical}"`));
    assert.doesNotMatch(html, /https:\/\/www\.birdbrain\.it/i);
    assert.match(html, /<meta property="og:site_name" content="Birdbrain IT"\/>/);
    assert.match(html, /<meta name="twitter:card" content="summary_large_image"\/>/);

    for (const structuredData of jsonLdFrom(html)) {
      assert.equal(structuredData["@context"], "https://schema.org");
    }
  }

  const homeSchema = jsonLdFrom(await render("/")).flatMap((data) => data["@graph"] ?? [data]);
  assert.ok(homeSchema.some((item) => item["@type"] === "WebSite"));
  assert.ok(homeSchema.some((item) => item["@type"] === "Organization"));

  const projectSchema = jsonLdFrom(await render("/arbete/btc-backtest-hub")).flatMap(
    (data) => data["@graph"] ?? [data],
  );
  assert.ok(projectSchema.some((item) => item["@type"] === "BreadcrumbList"));

  const articleHtml = await render("/insikter/5-saker-innan-ett-nytt-projekt");
  const articleSchema = jsonLdFrom(articleHtml).flatMap((data) => data["@graph"] ?? [data]);
  assert.ok(articleSchema.some((item) => item["@type"] === "BlogPosting"));
  assert.ok(articleSchema.some((item) => item["@type"] === "BreadcrumbList"));
  assert.match(articleHtml, /<time dateTime="2026-05-12">/);
});

test("package route exposes its offer, links and SEO metadata", async () => {
  const html = await render("/paket");
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.match(html, /<link rel="canonical" href="https:\/\/birdbrain\.it\/paket"/);
  assert.match(html, /<meta property="og:image" content="https:\/\/birdbrain\.it\/images\/birdbrain-og\.png"/);
  assert.match(html, /16 900 kr/);
  assert.match(html, /21 900 kr/);
  assert.match(html, /href="\/kontakt\?paket=webbpaket"/);
  assert.match(html, /href="\/kontakt\?paket=webbpaket-plus"/);
  assert.match(html, /href="\/verktyg"/);

  const sitemapResponse = await fetchPath("/sitemap.xml");
  assert.equal(sitemapResponse.status, 200);
  assert.match(await sitemapResponse.text(), /https:\/\/birdbrain\.it\/paket/);
});
