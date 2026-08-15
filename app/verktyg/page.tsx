"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Accessibility, Feather, Gauge, Search, ShieldCheck, Zap } from "lucide-react";
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

const auditCategories = [
  { id: "performance", icon: Gauge, delta: 6, sv: "Prestanda", en: "Performance" },
  { id: "security", icon: ShieldCheck, delta: -2, sv: "Säkerhet", en: "Security" },
  { id: "seo", icon: Search, delta: -7, sv: "SEO", en: "SEO" },
  { id: "accessibility", icon: Accessibility, delta: -4, sv: "Tillgänglighet", en: "Accessibility" },
] as const;

function AuditSpeedometer({ sv }: { sv: boolean }) {
  const [score, setScore] = useState<number | null>(null);
  const [displayedScore, setDisplayedScore] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const meterRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const meter = meterRef.current;
    if (!meter) return;

    if (!("IntersectionObserver" in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsInView(true);
        observer.disconnect();
      },
      { threshold: 0.4 },
    );

    observer.observe(meter);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView || score === null) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayedScore(score);
      return;
    }

    let frameId = 0;
    const delayId = window.setTimeout(() => {
      const startedAt = window.performance.now();
      const duration = 1200;

      const countUp = (timestamp: number) => {
        const progress = Math.min((timestamp - startedAt) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        setDisplayedScore(Math.round(score * easedProgress));

        if (progress < 1) {
          frameId = window.requestAnimationFrame(countUp);
        }
      };

      frameId = window.requestAnimationFrame(countUp);
    }, 500);

    return () => {
      window.clearTimeout(delayId);
      window.cancelAnimationFrame(frameId);
    };
  }, [isInView, score]);

  const meterStyle = { "--audit-score": isInView ? score ?? 0 : 0 } as CSSProperties;
  const categoryResults = auditCategories.map((category) => {
    const value = score === null ? 0 : Math.min(100, Math.max(1, score + category.delta));
    const displayedValue = score === null || score === 0
      ? 0
      : Math.round(value * (displayedScore / score));

    return { ...category, value, displayedValue };
  });

  return (
    <div
      className={`audit-meter${isInView ? " is-visible" : ""}`}
      ref={meterRef}
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
        <span className="audit-meter-reading">
          <strong>{score === null ? "–" : displayedScore}</strong>
          <span>/100</span>
        </span>
      </div>
      <div className="audit-categories" aria-hidden="true">
        {categoryResults.map((category) => {
          const CategoryIcon = category.icon;

          return (
            <span className="audit-category" key={category.id}>
              <CategoryIcon />
              <span>{sv ? category.sv : category.en}</span>
              <i className="audit-category-track">
                <i
                  className="audit-category-fill"
                  style={{ "--audit-category-score": category.value } as CSSProperties}
                />
              </i>
              <strong>{category.displayedValue}</strong>
            </span>
          );
        })}
      </div>
    </div>
  );
}

function ToolGraphic({ type, sv }: { type: Tool["id"]; sv: boolean }) {
  if (type === "planner") {
    return (
      <div className="tool-directory-graphic tool-directory-plan-graphic" aria-hidden="true">
        <span className="planner-analytics-grid" />
        <span className="planner-axis planner-axis-x" />
        <span className="planner-axis planner-axis-y" />
        <span className="planner-path planner-path-a" />
        <span className="planner-path planner-path-b" />
        <span className="planner-path planner-path-c" />
        <span className="planner-analysis-module planner-analysis-module-a">
          <i className="planner-line-chart"><i /><i /><i /><i /></i>
          <i className="planner-data-dots" />
        </span>
        <span className="planner-analysis-module planner-analysis-module-b">
          <i className="planner-ring-chart" />
          <i className="planner-data-dots" />
        </span>
        <span className="planner-analysis-module planner-analysis-module-c">
          <i className="planner-bar-chart"><i /><i /><i /><i /></i>
          <i className="planner-target" />
        </span>
        <span className="planner-brief-document">
          <i className="planner-brief-avatar" />
          <i className="planner-brief-lines" />
          <i className="planner-brief-mini-chart" />
        </span>
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
                target="_blank"
                rel="noopener noreferrer"
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
        <span><ShieldCheck className="tool-directory-feature-icon tool-directory-feature-shield" aria-hidden="true" />{sv ? "Ingen registrering krävs" : "No registration required"}</span>
        <span><Zap className="tool-directory-feature-icon tool-directory-feature-bolt" aria-hidden="true" />{sv ? "Resultat direkt" : "Instant results"}</span>
        <span><Feather className="tool-directory-feature-icon tool-directory-feature-feather" aria-hidden="true" />{sv ? "Byggt av Birdbrain IT" : "Built by Birdbrain IT"}</span>
      </section>
    </main>
  );
}
