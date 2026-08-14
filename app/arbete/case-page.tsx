"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

import { CtaStrip, Eyebrow, useLanguage } from "../components/site-shell";

type LocalizedText = { sv: string; en: string };

type CaseStudy = {
  slug: string;
  accent: "blue" | "purple" | "pink";
  style: "product" | "editorial" | "romantic";
  title: string;
  type: LocalizedText;
  lead: LocalizedText;
  image: string;
  imageAlt: LocalizedText;
  caption: LocalizedText;
  externalUrl?: string;
  facts: Array<{ label: LocalizedText; value: LocalizedText }>;
  chapters: Array<{ title: LocalizedText; text: LocalizedText }>;
  statement: LocalizedText;
  next: { href: string; title: string };
};

const caseStudies = {
  btc: {
    slug: "btc-backtest-hub",
    accent: "blue",
    style: "product",
    title: "BTC Backtest Hub",
    type: { sv: "Webbapp · Produktdesign", en: "Web app · Product design" },
    lead: {
      sv: "En local-first analysplattform som gör det lättare för kryptohandlare att testa strategier, förstå risk och hitta en verklig edge i sin data.",
      en: "A local-first analytics platform that helps crypto traders test strategies, understand risk and find a genuine edge in their data.",
    },
    image: "/images/btc-backtest-hub.webp",
    imageAlt: { sv: "Gränssnittet för BTC Backtest Hub", en: "The BTC Backtest Hub interface" },
    caption: { sv: "Strategiöversikt och backtestresultat", en: "Strategy overview and backtest results" },
    facts: [
      { label: { sv: "Roll", en: "Role" }, value: { sv: "Design & utveckling", en: "Design & development" } },
      { label: { sv: "Fokus", en: "Focus" }, value: { sv: "Data, UX, prestanda", en: "Data, UX, performance" } },
      { label: { sv: "Teknik", en: "Stack" }, value: { sv: "Next.js · TypeScript", en: "Next.js · TypeScript" } },
      { label: { sv: "Arbetssätt", en: "Approach" }, value: { sv: "Local-first", en: "Local-first" } },
    ],
    chapters: [
      { title: { sv: "Utmaningen", en: "The challenge" }, text: { sv: "Komplex handelsdata behövde bli begriplig utan att förenkla bort det viktiga. Användaren skulle kunna gå från observation till testbar idé utan att tappa sammanhanget.", en: "Complex trading data needed to become understandable without losing what matters. The user had to move from observation to a testable idea without losing context." } },
      { title: { sv: "Lösningen", en: "The solution" }, text: { sv: "Ett snabbt, lokalt analysflöde med tydlig hierarki, repeterbara strategier och direkt visuell återkoppling på resultat och risk.", en: "A fast local workflow with clear hierarchy, repeatable strategies and immediate visual feedback on results and risk." } },
      { title: { sv: "Resultatet", en: "The result" }, text: { sv: "Strategier kan dokumenteras, jämföras och utvärderas på minuter i ett gränssnitt byggt för fokus och självständigt arbete.", en: "Strategies can be documented, compared and evaluated in minutes through an interface built for focus and independent work." } },
    ],
    statement: { sv: "Från magkänsla till repeterbar evidens.", en: "From intuition to repeatable evidence." },
    next: { href: "/arbete/pixelmani", title: "Pixelmani" },
  },
  pixelmani: {
    slug: "pixelmani",
    accent: "purple",
    style: "editorial",
    title: "Pixelmani",
    type: { sv: "Webbplats · Fotografi", en: "Website · Photography" },
    lead: {
      sv: "En stillsam fotografisk portfolio där bilderna får leda, med ett uttryck format av natur, ljus och visuell berättelse.",
      en: "A calm photography portfolio led by imagery, shaped by nature, light and visual storytelling.",
    },
    image: "/images/pixelmani.webp",
    imageAlt: { sv: "Pixelmanis fotografiska portfolio", en: "Pixelmani photography portfolio" },
    caption: { sv: "Bilddriven portfolio med redaktionell rytm", en: "Image-led portfolio with an editorial rhythm" },
    externalUrl: "https://pixelmani-5sm4.vercel.app/",
    facts: [
      { label: { sv: "Roll", en: "Role" }, value: { sv: "Design & utveckling", en: "Design & development" } },
      { label: { sv: "Fokus", en: "Focus" }, value: { sv: "Fotografi & innehåll", en: "Photography & content" } },
      { label: { sv: "Teknik", en: "Stack" }, value: { sv: "Next.js · Supabase", en: "Next.js · Supabase" } },
      { label: { sv: "Format", en: "Format" }, value: { sv: "Responsiv portfolio", en: "Responsive portfolio" } },
    ],
    chapters: [
      { title: { sv: "Utmaningen", en: "The challenge" }, text: { sv: "Portfolion behövde kännas personlig och genomarbetad utan att designen tog uppmärksamhet från fotografierna.", en: "The portfolio needed to feel personal and considered without the design competing with the photography." } },
      { title: { sv: "Lösningen", en: "The solution" }, text: { sv: "En avskalad redaktionell struktur med generösa marginaler, lugn typografi och ett enkelt adminflöde för nytt material.", en: "A pared-back editorial structure with generous spacing, calm typography and a simple admin flow for new work." } },
      { title: { sv: "Resultatet", en: "The result" }, text: { sv: "En snabb och responsiv bildvärld där varje serie får sin egen rytm och där nytt innehåll kan publiceras utan friktion.", en: "A fast, responsive visual world where every series has its own rhythm and new content can be published without friction." } },
    ],
    statement: { sv: "En digital plats med rum för bilder.", en: "A digital space with room for images." },
    next: { href: "/arbete/pixelmagi", title: "Pixelmagi" },
  },
  pixelmagi: {
    slug: "pixelmagi",
    accent: "pink",
    style: "romantic",
    title: "Pixelmagi",
    type: { sv: "Webbplats · Bröllopsfotografi", en: "Website · Wedding photography" },
    lead: {
      sv: "En varm och tidlös webbplats som låter varje berättelse börja med känslan—och låter fotografiet göra resten.",
      en: "A warm, timeless website that lets every story begin with feeling—and lets the photography do the rest.",
    },
    image: "/images/pixelmagi.webp",
    imageAlt: { sv: "Pixelmagis portfolio för bröllopsfotografi", en: "Pixelmagi wedding photography portfolio" },
    caption: { sv: "Bröllopsberättelser med varm, redaktionell form", en: "Wedding stories with a warm editorial treatment" },
    externalUrl: "https://pixelmagi-v2-fv56lsfwr-korpenxds-projects.vercel.app/",
    facts: [
      { label: { sv: "Plats", en: "Location" }, value: { sv: "Alingsås", en: "Alingsås" } },
      { label: { sv: "Leverans", en: "Delivery" }, value: { sv: "Design & webb", en: "Design & web" } },
      { label: { sv: "Teknik", en: "Stack" }, value: { sv: "Next.js · Supabase", en: "Next.js · Supabase" } },
      { label: { sv: "Fokus", en: "Focus" }, value: { sv: "Berättelse & förtroende", en: "Story & trust" } },
    ],
    chapters: [
      { title: { sv: "Utmaningen", en: "The challenge" }, text: { sv: "Webbplatsen behövde kännas exklusiv men personlig, samtidigt som vägen från första intryck till kontakt skulle vara självklar.", en: "The website needed to feel premium yet personal, while making the journey from first impression to contact effortless." } },
      { title: { sv: "Lösningen", en: "The solution" }, text: { sv: "En bilddriven struktur med mjuka övergångar, varm typografi och tydliga vägar mellan berättelser, portfolio och bokningsförfrågan.", en: "An image-led structure with gentle transitions, warm typography and clear paths between stories, portfolio and enquiry." } },
      { title: { sv: "Resultatet", en: "The result" }, text: { sv: "En upplevelse som bygger förtroende tidigt, lyfter fotografens personlighet och gör nästa steg enkelt på alla skärmar.", en: "An experience that builds trust early, highlights the photographer's personality and keeps the next step simple on every screen." } },
    ],
    statement: { sv: "Nära, personligt och byggt för minnen.", en: "Intimate, personal and made for memories." },
    next: { href: "/arbete/btc-backtest-hub", title: "BTC Backtest Hub" },
  },
} satisfies Record<string, CaseStudy>;

export function CaseStudyPage({ projectKey }: { projectKey: keyof typeof caseStudies }) {
  const { lang } = useLanguage();
  const sv = lang === "sv";
  const project: CaseStudy = caseStudies[projectKey];
  const localize = (text: LocalizedText) => (sv ? text.sv : text.en);

  return (
    <main className={`case-study case-study-${project.style} case-accent-${project.accent}`}>
      <div className="page-shell case-study-shell">
        <Link className="case-back-link" href="/arbete">
          <ArrowLeft aria-hidden="true" /> {sv ? "Tillbaka till arbete" : "Back to work"}
        </Link>

        <section className="case-study-hero">
          <div className="case-study-copy">
            <Eyebrow>{localize(project.type)}</Eyebrow>
            <h1>{project.title}</h1>
            <p>{localize(project.lead)}</p>
            {project.externalUrl ? (
              <a className="button button-outline case-site-link" href={project.externalUrl} target="_blank" rel="noreferrer">
                {sv ? "Besök webbplatsen" : "Visit website"} <ExternalLink aria-hidden="true" />
              </a>
            ) : null}
          </div>

          <figure className="case-study-visual">
            <img src={project.image} alt={localize(project.imageAlt)} width="1500" height="920" />
            {project.style === "product" ? (
              <div className="case-product-metrics" aria-label={sv ? "Exempelresultat" : "Example results"}>
                <span><small>{sv ? "Avkastning" : "Return"}</small><strong>+184.6%</strong></span>
                <span><small>{sv ? "Träffsäkerhet" : "Win rate"}</small><strong>61.8%</strong></span>
                <span><small>{sv ? "Största nedgång" : "Max drawdown"}</small><strong>−12.4%</strong></span>
              </div>
            ) : null}
            <figcaption>{localize(project.caption)}</figcaption>
          </figure>
        </section>

        <dl className="case-facts">
          {project.facts.map((fact) => (
            <div key={fact.label.en}>
              <dt>{localize(fact.label)}</dt>
              <dd>{localize(fact.value)}</dd>
            </div>
          ))}
        </dl>

        <section className="case-statement">
          <p>{localize(project.statement)}</p>
        </section>

        <section className="case-chapters">
          {project.chapters.map((chapter, index) => (
            <article key={chapter.title.en}>
              <span>0{index + 1}</span>
              <h2>{localize(chapter.title)}</h2>
              <p>{localize(chapter.text)}</p>
            </article>
          ))}
        </section>

        <nav className="case-next" aria-label={sv ? "Nästa case" : "Next case"}>
          <span>{sv ? "Nästa case" : "Next case"}</span>
          <Link href={project.next.href}>{project.next.title} →</Link>
        </nav>

        <CtaStrip
          title={{ sv: "Vill du skapa något lika genomtänkt?", en: "Want to create something equally considered?" }}
          text={{ sv: "Berätta om din idé så tar vi nästa steg tillsammans.", en: "Tell me about your idea and let's take the next step together." }}
        />
      </div>
    </main>
  );
}
