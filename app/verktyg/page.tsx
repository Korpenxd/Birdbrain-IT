"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { useLanguage } from "../components/site-shell";

type Tool = {
  id: "planner" | "audit";
  href: string;
  eyebrow: { sv: string; en: string };
  title: { sv: string; en: string };
  description: { sv: string; en: string };
  action: { sv: string; en: string };
};

const tools: Tool[] = [
  {
    id: "planner",
    href: "https://planner.birdbrain.it",
    eyebrow: { sv: "Planera smart", en: "Plan smarter" },
    title: { sv: "Webbplatsplaneraren", en: "Website planner" },
    description: {
      sv: "Forma idén, välj omfattning och få en tydlig projektbrief med en realistisk prisbild.",
      en: "Shape the idea, choose the scope and get a clear project brief with a realistic price range.",
    },
    action: { sv: "Öppna planeraren", en: "Open the planner" },
  },
  {
    id: "audit",
    href: "https://audit.birdbrain.it",
    eyebrow: { sv: "Analysera & förbättra", en: "Analyse & improve" },
    title: { sv: "Webbplatsanalysen", en: "Website audit" },
    description: {
      sv: "Analysera din nuvarande webbplats och se vad som bromsar den, vad som fungerar och vad du bör förbättra först.",
      en: "Analyse your current website and see what slows it down, what works and what to improve first.",
    },
    action: { sv: "Starta analysen", en: "Start the audit" },
  },
];

const auditTicks = Array.from({ length: 19 }, (_, index) => index);

function AuditSpeedometer({ sv }: { sv: boolean }) {
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    const makeScore = () => Math.floor(Math.random() * 100) + 1;
    let nextScore = makeScore();

    try {
      const previousScore = Number.parseInt(
        window.sessionStorage.getItem("birdbrain-audit-demo-score") ?? "",
        10,
      );

      while (nextScore === previousScore) {
        nextScore = makeScore();
      }

      window.sessionStorage.setItem("birdbrain-audit-demo-score", String(nextScore));
    } catch {
      // The random score still works when browser storage is unavailable.
    }

    setScore(nextScore);
  }, []);

  const meterStyle = { "--audit-score": score ?? 50 } as CSSProperties;

  return (
    <div
      className="audit-meter"
      style={meterStyle}
      role="img"
      aria-label={
        score === null
          ? sv ? "Exempelresultat laddas" : "Loading example score"
          : sv ? `Exempelresultat ${score} av 100` : `Example score ${score} out of 100`
      }
    >
      <div className="audit-meter-dial" aria-hidden="true">
        <span className="audit-meter-arc" />
        <span className="audit-meter-ticks">
          {auditTicks.map((tick) => (
            <i
              className={tick % 3 === 0 ? "audit-meter-tick is-major" : "audit-meter-tick"}
              key={tick}
              style={{ "--audit-tick": tick } as CSSProperties}
            />
          ))}
        </span>
        <span className="audit-meter-needle" />
        <span className="audit-meter-hub" />
      </div>
      <div className="audit-meter-reading" aria-live="polite">
        <strong>{score ?? "–"}</strong>
        <span>{sv ? "AV 100" : "OF 100"}</span>
      </div>
    </div>
  );
}

function ToolGraphic({ type, sv }: { type: Tool["id"]; sv: boolean }) {
  if (type === "planner") {
    return (
      <div className="tool-directory-graphic tool-directory-plan-graphic" aria-hidden="true">
        <span className="tool-directory-document">
          <i />
          <i />
          <i />
        </span>
        <span className="tool-directory-node tool-directory-node-a" />
        <span className="tool-directory-node tool-directory-node-b" />
        <span className="tool-directory-node tool-directory-node-c" />
      </div>
    );
  }

  return (
    <div className="tool-directory-graphic tool-directory-audit-graphic">
      <AuditSpeedometer sv={sv} />
    </div>
  );
}

export default function ToolsPage() {
  const { lang } = useLanguage();
  const sv = lang === "sv";

  return (
    <main className="tool-directory-page">
      <section className="tool-directory-hero page-shell" aria-labelledby="tools-title">
        <div className="tool-directory-intro">
          <p className="tool-directory-kicker"><span />{sv ? "Kostnadsfria webbverktyg" : "Free website tools"}</p>
          <h1 id="tools-title">
            {sv ? "Från första idé till " : "From first idea to "}
            <span>{sv ? "en bättre webbplats." : "a better website."}</span>
          </h1>
          <p className="tool-directory-lead">
            {sv
              ? "Två enkla verktyg för att planera nästa steg — oavsett om du börjar från noll eller vill förbättra något som redan finns."
              : "Two simple tools for planning the next step — whether you are starting from zero or improving something that already exists."}
          </p>
        </div>

      </section>

      <section className="tool-directory-grid page-shell" aria-label={sv ? "Tillgängliga verktyg" : "Available tools"}>
        {tools.map((tool) => (
          <article
            className={`tool-directory-card tool-directory-card-${tool.id}`}
            key={tool.id}
          >
            <div className="tool-directory-card-copy">
              <p className="tool-directory-card-kicker"><span />{sv ? tool.eyebrow.sv : tool.eyebrow.en}</p>
              <h2>{sv ? tool.title.sv : tool.title.en}</h2>
              <p>{sv ? tool.description.sv : tool.description.en}</p>
              <a
                className="tool-directory-action"
                href={tool.href}
                aria-label={`${sv ? tool.action.sv : tool.action.en}: ${sv ? tool.title.sv : tool.title.en}`}
              >
                {sv ? tool.action.sv : tool.action.en}
                <i aria-hidden="true">→</i>
              </a>
            </div>
            <ToolGraphic type={tool.id} sv={sv} />
          </article>
        ))}
      </section>

      <section className="tool-directory-note page-shell" aria-label={sv ? "Om verktygen" : "About the tools"}>
        <span><i className="tool-directory-shield" aria-hidden="true" />{sv ? "Ingen registrering" : "No registration"}</span>
        <span><i className="tool-directory-bolt" aria-hidden="true" />{sv ? "Resultat direkt" : "Instant results"}</span>
        <span><i aria-hidden="true">✦</i>{sv ? "Byggt av Birdbrain IT" : "Built by Birdbrain IT"}</span>
      </section>
    </main>
  );
}
