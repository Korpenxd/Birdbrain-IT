/* eslint-disable @next/next/no-img-element */
"use client";

import { CtaStrip, Eyebrow, Raven, useLanguage } from "../components/site-shell";
import { brandIcons } from "../components/brand-icons";

const tools = [
  { name: "Next.js", icon: brandIcons.nextjs, color: "#f5f7fb" },
  { name: "TypeScript", icon: brandIcons.typescript, color: `#${brandIcons.typescript.hex}` },
  { name: "Tailwind CSS", icon: brandIcons.tailwindcss, color: `#${brandIcons.tailwindcss.hex}` },
  { name: "Supabase", icon: brandIcons.supabase, color: `#${brandIcons.supabase.hex}` },
  { name: "PostgreSQL", icon: brandIcons.postgresql, color: `#${brandIcons.postgresql.hex}` },
  { name: "Vercel", icon: brandIcons.vercel, color: "#f5f7fb" },
  { name: "Figma", icon: brandIcons.figma, color: `#${brandIcons.figma.hex}` },
];

export default function AboutPage() {
  const { lang } = useLanguage();
  const sv = lang === "sv";
  return (
    <main className="page-shell inner-page">
      <section className="about-hero about-raven-hero">
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
        <div className="about-visuals">
          <Raven
            compact
            variant="about"
            asset="/images/raven-work-exclamation.svg"
            priority
            label={sv ? "Neonraven med ett utropstecken" : "Neon raven with an exclamation mark"}
          />
          <figure className="portrait-frame">
            <img src="/images/adam-strom.webp" alt="Adam Ström" width="338" height="554" />
          </figure>
        </div>
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
          {tools.map((tool) => (
            <div key={tool.name}>
              <span className="tool-logo" style={{ color: tool.color }} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor" focusable="false">
                  <path d={tool.icon.path} />
                </svg>
              </span>
              <p>{tool.name}</p>
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
