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

const auditCategories = [
  { id: "performance", icon: Gauge, delta: 6, sv: "Prestanda", en: "Performance" },
  { id: "security", icon: ShieldCheck, delta: -2, sv: "Säkerhet", en: "Security" },
  { id: "seo", icon: Search, delta: -7, sv: "SEO", en: "SEO" },
  { id: "accessibility", icon: Accessibility, delta: -4, sv: "Tillgänglighet", en: "Accessibility" },
] as const;

const GAUGE_CENTER = { x: 140, y: 126 };
const GAUGE_RADIUS = 89;
// SVG coordinates increase downward, so 180° → 360° renders the top semicircle.
// This maps the visible gauge range from 0° at the left endpoint to 180° at the right.
const GAUGE_START_ANGLE = 180;
const GAUGE_SWEEP_ANGLE = 180;
const gaugeSegments = Array.from({ length: 13 }, (_, index) => index);

function pointOnGauge(angle: number, radius = GAUGE_RADIUS) {
  const radians = (angle * Math.PI) / 180;

  return {
    x: Number((GAUGE_CENTER.x + radius * Math.cos(radians)).toFixed(3)),
    y: Number((GAUGE_CENTER.y + radius * Math.sin(radians)).toFixed(3)),
  };
}

function gaugeArcPath(radius: number, startAngle = GAUGE_START_ANGLE, sweepAngle = GAUGE_SWEEP_ANGLE) {
  const start = pointOnGauge(startAngle, radius);
  const end = pointOnGauge(startAngle + sweepAngle, radius);
  const largeArc = sweepAngle > 180 ? 1 : 0;

  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

function AuditSpeedometer({ sv }: { sv: boolean }) {
  const [score, setScore] = useState<number | null>(null);
  const [displayedScore, setDisplayedScore] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const meterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
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
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    const meter = meterRef.current;
    if (!meter) return;

    if (typeof IntersectionObserver === "undefined") {
      const timeoutId = window.setTimeout(() => setIsInView(true), 0);
      return () => window.clearTimeout(timeoutId);
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
      const frameId = window.requestAnimationFrame(() => setDisplayedScore(score));
      return () => window.cancelAnimationFrame(frameId);
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
  const visibleScore = isInView ? score ?? 0 : 0;
  const needleAngle = GAUGE_START_ANGLE + (visibleScore / 100) * GAUGE_SWEEP_ANGLE;
  const needleRotation = needleAngle - 270;
  const activeArcStyle = {
    "--audit-arc-offset": 100 - visibleScore,
  } as CSSProperties;
  const needleStyle = {
    "--audit-needle-rotation": `${needleRotation}deg`,
  } as CSSProperties;

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
        <svg className="audit-gauge" viewBox="0 0 280 178" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="audit-gauge-gradient" x1="52" y1="125" x2="226" y2="72" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#269eff" />
              <stop offset="48%" stopColor="#8065ff" />
              <stop offset="100%" stopColor="#f651d5" />
            </linearGradient>
            <filter id="audit-gauge-glow" x="-25%" y="-35%" width="150%" height="160%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="audit-needle-glow" x="-80%" y="-70%" width="260%" height="240%">
              <feGaussianBlur stdDeviation="2.5" result="needleBlur" />
              <feMerge>
                <feMergeNode in="needleBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path className="audit-gauge-track" d={gaugeArcPath(GAUGE_RADIUS)} />
          <path className="audit-gauge-inner-track" d={gaugeArcPath(72)} />
          <path className="audit-gauge-active-glow" d={gaugeArcPath(GAUGE_RADIUS)} pathLength="100" style={activeArcStyle} />
          <path className="audit-gauge-active" d={gaugeArcPath(GAUGE_RADIUS)} pathLength="100" style={activeArcStyle} />
          <g className="audit-gauge-segments">
            {gaugeSegments.map((segment) => {
              const angle = GAUGE_START_ANGLE + (segment / (gaugeSegments.length - 1)) * GAUGE_SWEEP_ANGLE;
              const outerPoint = pointOnGauge(angle, 86);
              const innerPoint = pointOnGauge(angle, segment % 3 === 0 ? 67 : 73);

              return (
                <line
                  key={segment}
                  x1={outerPoint.x}
                  y1={outerPoint.y}
                  x2={innerPoint.x}
                  y2={innerPoint.y}
                />
              );
            })}
          </g>
          <circle className="audit-gauge-construction-ring" cx={GAUGE_CENTER.x} cy={GAUGE_CENTER.y} r="58" />
          <g className="audit-gauge-needle" style={needleStyle}>
            <path d="M 140 112 L 144 58 L 140 42 L 136 58 Z" filter="url(#audit-needle-glow)" />
          </g>
          <circle className="audit-gauge-score-ring" cx={GAUGE_CENTER.x} cy={GAUGE_CENTER.y} r="35" />
          <g className="audit-gauge-score">
            <text x={GAUGE_CENTER.x} y="122">{score === null ? "–" : displayedScore}</text>
            <text x={GAUGE_CENTER.x} y="139">/100</text>
          </g>
        </svg>
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
        <svg className="planner-builder-svg" viewBox="0 0 360 300" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="planner-builder-frame" x1="92" y1="54" x2="274" y2="248" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2fbfff" />
              <stop offset="0.52" stopColor="#7470ff" />
              <stop offset="1" stopColor="#e651da" />
            </linearGradient>
            <linearGradient id="planner-builder-panel" x1="110" y1="56" x2="254" y2="242" gradientUnits="userSpaceOnUse">
              <stop stopColor="rgba(31, 76, 151, 0.94)" />
              <stop offset="1" stopColor="rgba(9, 14, 36, 0.96)" />
            </linearGradient>
            <linearGradient id="planner-builder-hero" x1="122" y1="95" x2="244" y2="143" gradientUnits="userSpaceOnUse">
              <stop stopColor="#249fff" stopOpacity="0.34" />
              <stop offset="1" stopColor="#c750e3" stopOpacity="0.16" />
            </linearGradient>
            <filter id="planner-builder-glow" x="-35%" y="-35%" width="170%" height="170%">
              <feGaussianBlur stdDeviation="3.2" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          <ellipse className="planner-builder-ambient" cx="180" cy="157" rx="137" ry="120" />
          <g className="planner-builder-connections">
            <path d="M 91 101 C 104 101, 105 101, 112 101" />
            <path d="M 104 224 C 112 218, 112 210, 120 205" />
            <path d="M 258 158 C 270 158, 274 158, 282 158" />
          </g>
          <g className="planner-builder-nodes">
            <circle cx="92" cy="101" r="3.5" /><circle cx="111" cy="101" r="3.5" />
            <circle cx="104" cy="224" r="3.5" /><circle cx="120" cy="205" r="3.5" />
            <circle cx="258" cy="158" r="3.5" /><circle cx="282" cy="158" r="3.5" />
          </g>

          <g className="planner-builder-module planner-builder-palette">
            <rect x="25" y="70" width="67" height="62" rx="11" />
            <path d="M 42 87 h32 M 42 95 h21" />
            <circle cx="44" cy="112" r="6" /><circle cx="59" cy="112" r="6" /><circle cx="74" cy="112" r="6" />
          </g>

          <g className="planner-builder-window">
            <rect className="planner-builder-window-glow" x="102" y="39" width="156" height="216" rx="15" />
            <rect className="planner-builder-window-frame" x="102" y="39" width="156" height="216" rx="15" />
            <rect className="planner-builder-window-surface" x="109" y="47" width="142" height="200" rx="10" />
            <path className="planner-builder-window-bar" d="M 110 71 H 250" />
            <circle cx="122" cy="59" r="2.7" /><circle cx="132" cy="59" r="2.7" /><circle cx="142" cy="59" r="2.7" />
            <path className="planner-builder-nav" d="M 181 59 H 202 M 210 59 H 224 M 232 59 H 242" />
            <rect className="planner-builder-hero-block" x="121" y="87" width="118" height="54" rx="7" />
            <path className="planner-builder-copy-lines" d="M 133 102 H 177 M 133 112 H 195 M 133 122 H 166" />
            <rect className="planner-builder-hero-chip" x="133" y="128" width="31" height="5" rx="2.5" />
            <g className="planner-builder-layout">
              <rect x="121" y="153" width="52" height="74" rx="5" />
              <rect x="181" y="153" width="58" height="33" rx="5" />
              <rect x="181" y="194" width="58" height="33" rx="5" />
              <path d="M 130 170 H 163 M 130 178 H 156 M 191 164 H 228 M 191 205 H 219" />
              <path className="planner-builder-layout-chart" d="M 130 211 L 140 202 L 149 208 L 162 191" />
            </g>
          </g>

          <g className="planner-builder-module planner-builder-layout-module">
            <rect x="38" y="193" width="67" height="62" rx="11" />
            <path d="M 52 208 H 91 M 52 219 H 69 M 75 219 H 91 M 52 230 H 63 M 69 230 H 91" />
            <path className="planner-builder-layout-accent" d="M 52 241 H 83" />
          </g>

          <g className="planner-builder-module planner-builder-components">
            <rect x="282" y="127" width="53" height="62" rx="11" />
            <rect x="296" y="141" width="11" height="11" rx="2" />
            <rect x="312" y="141" width="11" height="11" rx="2" />
            <rect x="296" y="158" width="27" height="5" rx="2.5" />
            <rect x="296" y="170" width="19" height="5" rx="2.5" />
          </g>
          <circle className="planner-builder-signal" cx="335" cy="108" r="4" />
        </svg>
      </div>
    );
  }

  return (
    <div className="tool-directory-graphic tool-directory-audit-graphic">
      <AuditSpeedometer sv={sv} />
    </div>
  );
}

function ToolAction({ tool, sv }: { tool: Tool; sv: boolean }) {
  return (
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
            </div>
            <div className="tool-directory-visual">
              <ToolGraphic type={tool.id} sv={sv} />
            </div>
            <div className="tool-directory-cta">
              <ToolAction tool={tool} sv={sv} />
            </div>
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
