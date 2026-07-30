/* eslint-disable @next/next/no-img-element */
"use client";

import { CtaStrip, Eyebrow, useLanguage } from "../components/site-shell";

const tools = ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Vercel", "Figma"];

export default function AboutPage() {
  const { lang } = useLanguage();
  const sv = lang === "sv";
  return (
    <main className="page-shell inner-page">
      <section className="about-hero">
        <div>
          <Eyebrow>{sv ? "Om mig" : "About me"}</Eyebrow>
          <h1>
            {sv ? "Hej, jag heter" : "Hi, I’m"} <br />
            <span>Adam Ström</span>
          </h1>
          <p>
            {sv
              ? "Jag driver Birdbrain IT från Alingsås och hjälper företag och entreprenörer att förverkliga idéer genom webben."
              : "I run Birdbrain IT from Alingsås, helping businesses and entrepreneurs bring ideas to life on the web."}
          </p>
          <ul className="about-facts">
            <li>⌖ Alingsås, Sverige</li>
            <li>▱ {sv ? "Tillgänglig för nya projekt" : "Available for new projects"}</li>
          </ul>
        </div>
        <figure className="portrait-frame">
          <img src="/images/adam-strom.webp" alt="Adam Ström" width="900" height="991" />
        </figure>
      </section>

      <section className="about-story">
        <p>
          {sv
            ? "Jag har alltid gillat att bygga saker och lösa problem. Idag gör jag det genom kod, design och teknik – och hjälper andra att få sina idéer att bli verklighet."
            : "I’ve always enjoyed building things and solving problems. Today I do that through code, design and technology — helping others turn their ideas into reality."}
        </p>
        <p>
          {sv
            ? "För mig handlar det inte bara om att skriva kod. Det handlar om att förstå dina mål, dina användare och skapa något som faktiskt gör skillnad."
            : "For me, it’s not just about writing code. It’s about understanding your goals and users, then creating something that genuinely makes a difference."}
        </p>
      </section>

      <section className="toolbox">
        <Eyebrow>{sv ? "Teknik jag jobbar med" : "Tools I work with"}</Eyebrow>
        <div className="tool-list">
          {tools.map((tool, index) => (
            <div key={tool}>
              <span aria-hidden="true">{["◉", "TS", "≋", "◆", "⌘", "▲", "●"][index]}</span>
              <p>{tool}</p>
            </div>
          ))}
        </div>
      </section>
      <CtaStrip
        title={{ sv: "Låter det intressant?", en: "Sound interesting?" }}
        text={{
          sv: "Berätta om ditt projekt så ser vi vad vi kan åstadkomma tillsammans.",
          en: "Tell me about your project and let’s see what we can achieve together.",
        }}
      />
    </main>
  );
}
