/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";

import {
  Arrow,
  CtaStrip,
  Eyebrow,
  ProjectCard,
  Raven,
  useLanguage,
} from "./components/site-shell";

const services = [
  {
    icon: "◎",
    sv: ["Webbplatser", "Snygga, snabba och anpassade för dig."],
    en: ["Websites", "Polished, fast and tailored to you."],
  },
  {
    icon: "◇",
    sv: ["Webbappar", "Skräddarsydda lösningar som förenklar arbetet."],
    en: ["Web apps", "Tailored solutions that simplify your work."],
  },
  {
    icon: "⌁",
    sv: ["E-handel", "Butiker som är enkla att driva och växer med dig."],
    en: ["E-commerce", "Stores that are easy to run and grow with you."],
  },
  {
    icon: "◌",
    sv: ["Design & UX", "Tydlig design som känns rätt och används lätt."],
    en: ["Design & UX", "Clear design that feels right and works naturally."],
  },
];

export default function Home() {
  const { lang } = useLanguage();
  const sv = lang === "sv";

  return (
    <main>
      <section className="hero hero-raven-return page-shell">
        <div className="hero-copy">
          <Eyebrow>
            {sv
              ? "Webbplatser. Webbappar. Digitala lösningar."
              : "Websites. Web apps. Digital solutions."}
          </Eyebrow>
          <h1>
            {sv ? "Jag bygger digitala" : "I build digital"} <br />
            {sv ? "lösningar som gör" : "solutions that turn"} <br />
            <span>{sv ? "idéer verkliga." : "ideas into reality."}</span>
          </h1>
          <p className="hero-lead">
            {sv
              ? "Webbplatser, webbappar och skräddarsydda lösningar för dig som vill ha något som bara fungerar – på riktigt."
              : "Websites, web apps and tailored digital solutions for people who want something that simply works — properly."}
          </p>
          <div className="button-row">
            <Link className="button button-primary" href="/arbete">
              {sv ? "Se mina projekt" : "View my work"} <Arrow />
            </Link>
            <Link className="text-link" href="/process">
              {sv ? "Hur jag jobbar" : "How I work"} <Arrow />
            </Link>
          </div>
        </div>
        <Raven hero priority />
      </section>

      <section className="page-shell section-block projects-section">
        <div className="section-heading-row">
          <div>
            <Eyebrow>{sv ? "Utvalda projekt" : "Selected work"}</Eyebrow>
            <h2>{sv ? "Några saker jag har byggt" : "A few things I’ve built"}</h2>
          </div>
          <Link className="text-link section-link" href="/arbete">
            {sv ? "Se alla projekt" : "View all projects"} <Arrow />
          </Link>
        </div>

        <div className="project-grid">
          <ProjectCard
            accent="blue"
            href="/arbete#btc"
            image="/images/btc-backtest-hub.webp"
            type={sv ? "Webbapp" : "Web app"}
            title="BTC Backtest Hub"
            description={
              sv
                ? "En lokal plattform för kryptohandlare som vill backtesta strategier och hitta edge med data."
                : "A local-first platform for crypto traders who want to backtest strategies and find an edge in their data."
            }
          />
          <ProjectCard
            accent="purple"
            href="/arbete#pixelmani"
            image="/images/pixelmani.webp"
            type={sv ? "Webbplats" : "Website"}
            title="Pixelmani"
            description={
              sv
                ? "Fotografisk portfolio med fokus på natur, lugn och visuell berättelse."
                : "A photography portfolio focused on nature, calm and visual storytelling."
            }
          />
          <ProjectCard
            accent="pink"
            href="/arbete#pixelmagi"
            image="/images/pixelmagi.webp"
            type={sv ? "Webbplats" : "Website"}
            title="Pixelmagi"
            description={
              sv
                ? "Bröllopsfotografi i Alingsås som berättar historier genom tidlösa bilder."
                : "Wedding photography in Alingsås, telling stories through timeless images."
            }
          />
        </div>
      </section>

      <section className="page-shell home-summary">
        <div className="summary-column services-summary">
          <Eyebrow>{sv ? "Det jag gör" : "What I do"}</Eyebrow>
          <div className="mini-service-grid">
            {services.map((service) => {
              const [title, description] = sv ? service.sv : service.en;
              return (
                <div className="mini-service" key={title}>
                  <span className="mini-service-icon" aria-hidden="true">
                    {service.icon}
                  </span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="summary-column about-summary">
          <Eyebrow>{sv ? "Om Birdbrain IT" : "About Birdbrain IT"}</Eyebrow>
          <div className="about-summary-content">
            <img
              src="/images/adam-strom.webp"
              alt="Adam Ström"
              width="338"
              height="554"
              loading="lazy"
              decoding="async"
              fetchPriority="low"
            />
            <div>
              <h3>
                {sv
                  ? "Jag heter Adam Ström och driver Birdbrain IT från Alingsås."
                  : "I’m Adam Ström, running Birdbrain IT from Alingsås."}
              </h3>
              <p>
                {sv
                  ? "Jag hjälper individer och småföretag att förverkliga idéer med digitala lösningar som är enkla, genomtänkta och byggda för att göra skillnad."
                  : "I help individuals and small businesses bring ideas to life with simple, thoughtful digital solutions built to make a difference."}
              </p>
              <span className="location-line">⌖ Alingsås, Sverige</span>
            </div>
          </div>
        </div>

        <div className="summary-column idea-summary">
          <Eyebrow>{sv ? "Har du en idé?" : "Have an idea?"}</Eyebrow>
          <h3>{sv ? "Låt oss bygga något bra tillsammans." : "Let’s build something good together."}</h3>
          <p>
            {sv
              ? "Oavsett om du har en tydlig plan eller bara en känsla – hör av dig så pratar vi."
              : "Whether you have a clear plan or just a feeling — get in touch and we’ll talk it through."}
          </p>
          <Link className="text-link" href="/kontakt">
            {sv ? "Kontakta mig" : "Contact me"} <Arrow />
          </Link>
        </div>
      </section>

      <div className="page-shell mobile-home-cta">
        <CtaStrip />
      </div>
    </main>
  );
}
