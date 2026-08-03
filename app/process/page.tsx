"use client";

import type { ReactNode } from "react";
import { CtaStrip, Eyebrow, Raven, useLanguage } from "../components/site-shell";

type ProcessIconType = "conversation" | "proposal" | "build" | "launch";

function ProcessIcon({ type }: { type: ProcessIconType }) {
  const paths: Record<ProcessIconType, ReactNode> = {
    conversation: <><path d="M5.5 5.5h13A2.5 2.5 0 0 1 21 8v7a2.5 2.5 0 0 1-2.5 2.5H11l-5.5 3v-3A2.5 2.5 0 0 1 3 15V8a2.5 2.5 0 0 1 2.5-2.5Z" /><path d="M7.5 10h9M7.5 13.5h5.5" /></>,
    proposal: <><path d="M7 3.5h8l4 4v13H7z" /><path d="M15 3.5v4h4M10 12h6M10 15.5h4" /></>,
    build: <path d="m9 7-5 5 5 5M15 7l5 5-5 5M13.5 4l-3 16" />,
    launch: <><path d="M14 4c3.7-.6 6 .2 6 .2s.8 2.3.2 6l-5.7 5.7-6.4-6.4z" /><path d="m8.5 14.5-3.7.7-1.3 4.3 4.3-1.3.7-3.7M14 9.5h.01" /></>,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.55">{paths[type]}</svg>;
}

const steps: Array<{ icon: ProcessIconType; sv: [string, string]; en: [string, string] }> = [
  { icon: "conversation", sv: ["Vi pratar", "Vi börjar med ett samtal där du berättar om dina idéer, mål och utmaningar."], en: ["We talk", "We start with a conversation about your ideas, goals and challenges."] },
  { icon: "proposal", sv: ["Plan & offert", "Jag analyserar behoven och tar fram en plan och offert som passar dig."], en: ["Plan & proposal", "I analyze the needs and create a clear plan and proposal that fits."] },
  { icon: "build", sv: ["Design & utveckling", "Jag designar, bygger och testar lösningen löpande med din feedback."], en: ["Design & development", "I design, build and test the solution with your feedback along the way."] },
  { icon: "launch", sv: ["Leverans & uppföljning", "Vi lanserar, går igenom allt tillsammans och jag finns kvar om du behöver stöd."], en: ["Launch & follow-up", "We launch, review everything together and I remain available when you need support."] },
];

export default function ProcessPage() {
  const { lang } = useLanguage();
  const sv = lang === "sv";
  return (
    <main className="page-shell inner-page process-page">
      <section className="inner-hero with-art raven-return-section">
        <div>
          <Eyebrow>Process</Eyebrow>
          <h1>{sv ? "Så " : "How it "}<span>{sv ? "går det till" : "works"}</span></h1>
          <p>{sv ? "En enkel och tydlig process från första samtal till färdig lösning." : "A simple, transparent process from the first conversation to the finished product."}</p>
        </div>
        <Raven
          compact
          variant="process"
          asset="/images/raven-process-progress.svg"
          processGears
          priority
        />
      </section>
      <section className="process-layout">
        <ol className="process-list">
          {steps.map((step, index) => {
            const [title, description] = sv ? step.sv : step.en;
            return <li key={title}>
              <span className="step-index">{String(index + 1).padStart(2, "0")}</span>
              <div className="process-step-heading"><span className="step-icon" aria-hidden="true"><ProcessIcon type={step.icon} /></span></div>
              <div><h2>{title}</h2><p>{description}</p></div>
            </li>;
          })}
        </ol>
      </section>
      <CtaStrip title={{ sv: "Vill du komma igång?", en: "Ready to get started?" }} text={{ sv: "Boka ett kostnadsfritt samtal så ser vi om vi är en bra match.", en: "Book a free conversation and let’s see if we’re a good fit." }} />
    </main>
  );
}
