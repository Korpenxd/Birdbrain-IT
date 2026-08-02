/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";

import { Arrow, CtaStrip, Eyebrow, Raven, useLanguage } from "../components/site-shell";

const articles = [
  {
    category: { sv: "Webbutveckling", en: "Web development" },
    title: {
      sv: "5 saker jag tänker på innan jag börjar ett nytt projekt",
      en: "5 things I consider before starting a new project",
    },
    excerpt: {
      sv: "En checklista som hjälper mig att starta rätt från början.",
      en: "A practical checklist that helps every project start on solid ground.",
    },
    date: "12 maj 2026",
    image: "/images/pixelmani.webp",
  },
  {
    category: { sv: "Design", en: "Design" },
    title: {
      sv: "Därför är enkel design oftast den bästa",
      en: "Why simple design is usually the strongest",
    },
    excerpt: {
      sv: "Om värdet av fokus, hierarki och att ta bort istället för att lägga till.",
      en: "On focus, hierarchy and the value of removing instead of adding.",
    },
    date: "2 apr. 2026",
    image: "/images/pixelmagi.webp",
  },
  {
    category: { sv: "Entreprenörskap", en: "Entrepreneurship" },
    title: {
      sv: "Att driva eget som utvecklare",
      en: "Building a small business as a developer",
    },
    excerpt: {
      sv: "Mina tankar om frihet, ansvar och att bygga något eget.",
      en: "Thoughts on freedom, responsibility and building something of your own.",
    },
    date: "18 mars 2026",
    image: "/images/btc-backtest-hub.webp",
  },
];

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
        {articles.map((article) => (
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
            <time>{article.date}</time>
            <Link className="text-link" href="/kontakt">
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
