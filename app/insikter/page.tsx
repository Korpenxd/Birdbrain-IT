/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";

import { Arrow, CtaStrip, Eyebrow, Raven, useLanguage } from "../components/site-shell";
import { insightArticles } from "./articles";

export default function InsightsPage() {
  const { lang } = useLanguage();
  const sv = lang === "sv";
  return (
    <main className="page-shell inner-page">
      <section className="inner-hero with-art raven-return-section">
        <div>
          <Eyebrow>{sv ? "Insikter" : "Insights"}</Eyebrow>
          <h1>
            {sv ? "Tankar, tips och " : "Thoughts, tips and "}
            <span>{sv ? "lärdomar" : "lessons"}</span>
          </h1>
          <p>
            {sv
              ? "Jag delar med mig av insikter om utveckling, design och entreprenörskap."
              : "Notes and lessons from my work in development, design and entrepreneurship."}
          </p>
        </div>
        <Raven
          compact
          variant="insights"
          asset="/images/raven-insights-brain.svg"
          priority
        />
      </section>

      <section className="article-list">
        {insightArticles.map((article) => (
          <article key={article.title.sv}>
            <img
              src={article.image}
              alt=""
              width="1500"
              height="920"
              loading="lazy"
              decoding="async"
              fetchPriority="low"
            />
            <div>
              <p className="article-category">{sv ? article.category.sv : article.category.en}</p>
              <h2>{sv ? article.title.sv : article.title.en}</h2>
              <p>{sv ? article.excerpt.sv : article.excerpt.en}</p>
            </div>
            <time dateTime={article.publishedAt}>{sv ? article.date.sv : article.date.en}</time>
            <Link className="text-link" href={`/insikter/${article.slug}`}>
              {sv ? "Läs artikel" : "Read article"} <Arrow />
            </Link>
          </article>
        ))}
      </section>
      <CtaStrip
        title={{ sv: "Har du en fråga eller idé?", en: "Have a question or idea?" }}
        text={{
          sv: "Jag tänker gärna högt tillsammans med dig.",
          en: "I’m always happy to think it through with you.",
        }}
      />
    </main>
  );
}
