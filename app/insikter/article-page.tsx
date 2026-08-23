"use client";

import Link from "next/link";

import { Arrow, CtaStrip, useLanguage } from "../components/site-shell";
import { insightArticles, type InsightArticle } from "./articles";

export function InsightArticlePage({ article }: { article: InsightArticle }) {
  const { lang } = useLanguage();
  const sv = lang === "sv";
  const articleIndex = insightArticles.findIndex((item) => item.slug === article.slug);
  const previous = articleIndex > 0 ? insightArticles[articleIndex - 1] : null;
  const next = articleIndex < insightArticles.length - 1 ? insightArticles[articleIndex + 1] : null;

  return (
    <main className={`page-shell insight-article insight-article-${article.accent}`}>
      <Link className="insight-back-link" href="/insikter">
        <span aria-hidden="true">←</span> {sv ? "Till alla insikter" : "All insights"}
      </Link>

      <header className="insight-article-hero">
        <div className="insight-article-hero-copy">
          <p className="article-category">{sv ? article.category.sv : article.category.en}</p>
          <h1>{sv ? article.title.sv : article.title.en}</h1>
          <p className="insight-article-intro">{sv ? article.intro.sv : article.intro.en}</p>
          <div className="insight-article-meta">
            <time dateTime={article.publishedAt}>{sv ? article.date.sv : article.date.en}</time>
            <span aria-hidden="true" />
            <p>{sv ? article.readingTime.sv : article.readingTime.en}</p>
          </div>
        </div>

        <div className="insight-article-visual" aria-hidden="true">
          <span className="insight-visual-orbit insight-visual-orbit-one" />
          <span className="insight-visual-orbit insight-visual-orbit-two" />
          <span className="insight-visual-grid" />
          <strong>{article.number}</strong>
          <small>Birdbrain IT / Insights</small>
        </div>
      </header>

      <div className="insight-article-layout">
        <aside className="insight-article-toc" aria-label={sv ? "I den här artikeln" : "In this article"}>
          <p>{sv ? "I den här artikeln" : "In this article"}</p>
          <ol>
            {article.sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{sv ? section.title.sv : section.title.en}</a>
              </li>
            ))}
          </ol>
        </aside>

        <article className="insight-article-body">
          <blockquote>
            <span aria-hidden="true">“</span>
            {sv ? article.quote.sv : article.quote.en}
          </blockquote>

          {article.sections.map((section) => (
            <section id={section.id} key={section.id}>
              <h2>{sv ? section.title.sv : section.title.en}</h2>
              {section.paragraphs.map((paragraph, index) => (
                <p key={index}>{sv ? paragraph.sv : paragraph.en}</p>
              ))}
              {section.bullets ? (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet.sv}>{sv ? bullet.sv : bullet.en}</li>
                  ))}
                </ul>
              ) : null}
              {section.links ? (
                <nav className="insight-context-links" aria-label={sv ? "Relaterat på Birdbrain IT" : "Related on Birdbrain IT"}>
                  {section.links.map((link) => (
                    <Link className="text-link" href={link.href} key={link.href}>
                      {sv ? link.label.sv : link.label.en} <Arrow />
                    </Link>
                  ))}
                </nav>
              ) : null}
            </section>
          ))}

          <section className="insight-takeaway" aria-label={sv ? "Sammanfattning" : "Takeaway"}>
            <span aria-hidden="true">✦</span>
            <div>
              <h2>{sv ? article.takeawayTitle.sv : article.takeawayTitle.en}</h2>
              <p>{sv ? article.takeaway.sv : article.takeaway.en}</p>
            </div>
          </section>

          <footer className="insight-author">
            <span aria-hidden="true">AS</span>
            <div>
              <p>{sv ? "Skrivet av Adam Ström" : "Written by Adam Ström"}</p>
              <small>{sv ? "Utvecklare och grundare av Birdbrain IT." : "Developer and founder of Birdbrain IT."}</small>
            </div>
          </footer>
        </article>
      </div>

      <nav className="insight-article-pagination" aria-label={sv ? "Fler artiklar" : "More articles"}>
        {previous ? (
          <Link href={`/insikter/${previous.slug}`}>
            <span>← {sv ? "Föregående" : "Previous"}</span>
            <strong>{sv ? previous.title.sv : previous.title.en}</strong>
          </Link>
        ) : <span />}
        {next ? (
          <Link href={`/insikter/${next.slug}`}>
            <span>{sv ? "Nästa" : "Next"} →</span>
            <strong>{sv ? next.title.sv : next.title.en}</strong>
          </Link>
        ) : <span />}
      </nav>

      <CtaStrip
        title={{ sv: "Har du en idé att bolla?", en: "Have an idea to explore?" }}
        text={{
          sv: "Berätta vad du funderar på så tänker vi högt tillsammans.",
          en: "Tell me what you are considering and we can think it through together.",
        }}
      />
    </main>
  );
}
