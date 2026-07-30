"use client";

import { CtaStrip, Eyebrow, Raven, useLanguage } from "../components/site-shell";

const steps = [
  {
    sv: ["Vi pratar", "Vi börjar med ett samtal där du berättar om dina idéer, mål och utmaningar."],
    en: ["We talk", "We start with a conversation about your ideas, goals and challenges."],
  },
  {
    sv: ["Plan & offert", "Jag analyserar behoven och tar fram en plan och offert som passar dig."],
    en: ["Plan & proposal", "I analyze the needs and create a clear plan and proposal that fits."],
  },
  {
    sv: ["Design & utveckling", "Jag designar, bygger och testar lösningen löpande med din feedback."],
    en: ["Design & development", "I design, build and test the solution with your feedback along the way."],
  },
  {
    sv: ["Leverans & uppföljning", "Vi lanserar, går igenom allt tillsammans och jag finns kvar om du behöver stöd."],
    en: ["Launch & follow-up", "We launch, review everything together and I remain available when you need support."],
  },
];

export default function ProcessPage() {
  const { lang } = useLanguage();
  const sv = lang === "sv";
  return (
    <main className="page-shell inner-page">
      <section className="inner-hero">
        <Eyebrow>{sv ? "Process" : "Process"}</Eyebrow>
        <h1>
          {sv ? "Så " : "How it "}
          <span>{sv ? "går det till" : "works"}</span>
        </h1>
        <p>
          {sv
            ? "En enkel och tydlig process från första samtal till färdig lösning."
            : "A simple, transparent process from the first conversation to the finished product."}
        </p>
      </section>

      <section className="process-layout">
        <ol className="process-list">
          {steps.map((step, index) => {
            const [title, description] = sv ? step.sv : step.en;
            return (
              <li key={title}>
                <span className="step-number">{index + 1}</span>
                <div>
                  <h2>
                    {index + 1}. {title}
                  </h2>
                  <p>{description}</p>
                </div>
              </li>
            );
          })}
        </ol>
        <Raven variant="process" />
      </section>
      <CtaStrip
        title={{ sv: "Vill du komma igång?", en: "Ready to get started?" }}
        text={{
          sv: "Boka ett kostnadsfritt samtal så ser vi om vi är en bra match.",
          en: "Book a free conversation and let’s see if we’re a good fit.",
        }}
      />
    </main>
  );
}
