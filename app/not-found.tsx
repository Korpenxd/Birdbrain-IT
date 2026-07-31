"use client";

import Link from "next/link";

import { Arrow, Raven, useLanguage } from "./components/site-shell";

export default function NotFound() {
  const { lang } = useLanguage();
  const sv = lang === "sv";
  return (
    <main className="page-shell not-found">
      <Raven compact variant="lost" />
      <p className="eyebrow">{sv ? "404 · Sidan finns inte" : "404 · Page not found"}</p>
      <h1>{sv ? "Korpen hittar inte hit." : "The raven can’t find this page."}</h1>
      <Link className="button button-primary" href="/">
        {sv ? "Till startsidan" : "Back home"} <Arrow />
      </Link>
    </main>
  );
}
