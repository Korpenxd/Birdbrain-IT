"use client";

import { CtaStrip, Eyebrow, ProjectCard, Raven, useLanguage } from "../components/site-shell";

export default function WorkPage() {
  const { lang } = useLanguage();
  const sv = lang === "sv";
  return (
    <main className="page-shell inner-page">
      <section className="inner-hero with-art raven-return-section mobile-raven-spacing">
        <div>
          <Eyebrow>{sv ? "Arbete" : "Work"}</Eyebrow>
          <h1>
            {sv ? "Projekt jag är " : "Projects I’m "}
            <span>{sv ? "stolt över" : "proud of"}</span>
          </h1>
          <p>
            {sv
              ? "Här är ett urval av webbplatser och digitala lösningar jag har byggt för kunder."
              : "A selection of websites and digital products I’ve built for clients."}
          </p>
          <div className="filter-pills" aria-label={sv ? "Projektkategorier" : "Project categories"}>
            <span>{sv ? "Alla" : "All"}</span>
            <span>{sv ? "Webbplatser" : "Websites"}</span>
            <span>{sv ? "Webbappar" : "Web apps"}</span>
            <span>{sv ? "E-handel" : "E-commerce"}</span>
          </div>
        </div>
        <Raven
          compact
          variant="work"
          asset="/images/raven-about-heart.svg"
          priority
          label={sv ? "Neonraven med ett hjärta" : "Neon raven with a heart"}
        />
      </section>

      <section className="work-list">
        <div id="btc">
          <ProjectCard
            wide
            accent="blue"
            href="#btc"
            image="/images/btc-backtest-hub.webp"
            type={sv ? "Webbapp" : "Web app"}
            title="BTC Backtest Hub"
            description={
              sv
                ? "En local-first analysmiljö där kryptohandlare kan dokumentera observationer, testa mönster och omvandla magkänsla till repeterbar evidens."
                : "A local-first analysis workspace where crypto traders can document observations, test patterns and turn intuition into repeatable evidence."
            }
          >
            <ul className="project-tags">
              <li>Next.js</li>
              <li>TypeScript</li>
              <li>Local-first</li>
            </ul>
          </ProjectCard>
        </div>
        <div id="pixelmani">
          <ProjectCard
            wide
            accent="purple"
            href="https://pixelmani-5sm4.vercel.app/"
            image="/images/pixelmani.webp"
            type={sv ? "Webbplats" : "Website"}
            title="Pixelmani"
            description={
              sv
                ? "Ett avskalat fotografiskt galleri där bilderna får ta plats. Adminflödet gör det enkelt att lägga till, kategorisera och hantera nya fotografier."
                : "A pared-back photography gallery where the images take center stage, with a simple admin flow for uploading and organizing new work."
            }
          >
            <ul className="project-tags">
              <li>Next.js</li>
              <li>Supabase</li>
              <li>Responsive</li>
            </ul>
          </ProjectCard>
        </div>
        <div id="pixelmagi">
          <ProjectCard
            wide
            accent="pink"
            href="https://pixelmagi-v2-fv56lsfwr-korpenxds-projects.vercel.app/"
            image="/images/pixelmagi.webp"
            type={sv ? "Webbplats" : "Website"}
            title="Pixelmagi"
            description={
              sv
                ? "En varm och editorial bröllopsportfolio som låter fotografens bildspråk och personlighet bära hela upplevelsen."
                : "A warm, editorial wedding portfolio that lets the photographer’s imagery and personality carry the experience."
            }
          >
            <ul className="project-tags">
              <li>Next.js</li>
              <li>Supabase</li>
              <li>Portfolio</li>
            </ul>
          </ProjectCard>
        </div>
      </section>
      <CtaStrip
        title={{ sv: "Vill du bli nästa projekt?", en: "Want to be the next project?" }}
        text={{
          sv: "Jag tar mig an nya uppdrag löpande.",
          en: "I take on new projects throughout the year.",
        }}
      />
    </main>
  );
}
