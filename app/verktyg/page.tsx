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

function PlannerLayerGraphic() {
  const graphicRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const graphic = graphicRef.current;
    if (!graphic) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || typeof IntersectionObserver === "undefined") {
      const frameId = window.requestAnimationFrame(() => setIsActive(true));
      return () => window.cancelAnimationFrame(frameId);
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setIsActive(true);
      observer.disconnect();
    }, { threshold: 0.35 });

    observer.observe(graphic);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={graphicRef} className={`tool-directory-graphic tool-directory-plan-graphic planner-layers${isActive ? " is-active" : ""}`} aria-hidden="true">
      <svg className="planner-layers-svg" viewBox="0 0 360 300" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="planner-layer-cyan" x1="32" y1="24" x2="245" y2="270" gradientUnits="userSpaceOnUse"><stop stopColor="#28c7ff" /><stop offset="1" stopColor="#5a72ff" /></linearGradient>
          <linearGradient id="planner-layer-violet" x1="38" y1="104" x2="239" y2="169" gradientUnits="userSpaceOnUse"><stop stopColor="#7264ff" /><stop offset="1" stopColor="#d854e6" /></linearGradient>
          <linearGradient id="planner-layer-finish" x1="33" y1="185" x2="250" y2="270" gradientUnits="userSpaceOnUse"><stop stopColor="#25c2ff" /><stop offset="0.56" stopColor="#8069ff" /><stop offset="1" stopColor="#ec55d9" /></linearGradient>
          <linearGradient id="planner-layer-hero" x1="60" y1="202" x2="155" y2="234" gradientUnits="userSpaceOnUse"><stop stopColor="#257fe9" stopOpacity="0.55" /><stop offset="1" stopColor="#e44edb" stopOpacity="0.38" /></linearGradient>
          <filter id="planner-layer-glow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="2.5" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>

        <ellipse className="planner-layers-ambient" cx="152" cy="151" rx="135" ry="124" />
        <g className="planner-layer-motion planner-layer-top">
          <polygon className="planner-layer-surface planner-layer-top-surface" points="55,25 220,25 239,84 37,84" />
          <path className="planner-layer-header" d="M55 35 H223 M64 41 H81 M87 41 H103 M185 41 H215" />
          <path className="planner-layer-grid" d="M61 47 H224 M55 60 H229 M48 72 H234 M82 35 L72 84 M112 35 L106 84 M142 35 L140 84 M172 35 L174 84 M202 35 L208 84" />
          <rect className="planner-layer-wireframe-block" x="76" y="50" width="116" height="23" rx="3" />
          <path className="planner-layer-wireframe-lines" d="M85 57 H137 M85 63 H157 M85 69 H122" />
        </g>

        <g className="planner-layer-motion planner-layer-middle">
          <polygon className="planner-layer-surface planner-layer-middle-surface" points="54,105 221,105 239,166 37,166" />
          <path className="planner-layer-header" d="M54 116 H224 M63 111 H76 M81 111 H93" />
          <rect className="planner-layer-media" x="69" y="122" width="65" height="20" rx="3" />
          <path className="planner-layer-copy" d="M146 125 H201 M146 131 H208 M146 137 H183" />
          <g className="planner-layer-component-cards"><rect x="63" y="147" width="43" height="11" rx="2" /><rect x="114" y="147" width="43" height="11" rx="2" /><rect x="165" y="147" width="43" height="11" rx="2" /></g>
        </g>

        <g className="planner-progress-markers"><path d="M138 88 v9 M134 93 l4 4 4-4 M138 170 v9 M134 175 l4 4 4-4" /></g>

        <g className="planner-layer-motion planner-layer-finished">
          <polygon className="planner-layer-surface planner-layer-finished-surface" points="50,185 224,185 247,269 28,269" />
          <path className="planner-layer-finished-bar" d="M53 197 H230" />
          <circle cx="64" cy="191" r="2.2" /><circle cx="72" cy="191" r="2.2" /><circle cx="80" cy="191" r="2.2" />
          <rect className="planner-layer-finished-hero" x="56" y="203" width="88" height="30" rx="3" />
          <path className="planner-layer-hero-art" d="M62 228 C75 214 86 230 98 218 S119 226 137 210" />
          <path className="planner-layer-finished-copy" d="M157 207 H208 M157 214 H219 M157 221 H197" />
          <rect className="planner-layer-finished-cta" x="157" y="226" width="34" height="5" rx="2.5" />
          <g className="planner-layer-finished-cards"><rect x="56" y="241" width="48" height="13" rx="2" /><rect x="113" y="241" width="48" height="13" rx="2" /><rect x="170" y="241" width="48" height="13" rx="2" /></g>
          <path className="planner-layer-wave" d="M45 261 C75 249 95 271 122 258 S170 250 201 261 S224 263 235 257" />
        </g>

        <g className="planner-layer-connectors">
          <path className="planner-connector-layout" d="M239 61 H276" /><path className="planner-connector-components" d="M239 137 H276" /><path className="planner-connector-palette" d="M246 228 C262 228 264 237 276 237" />
          <circle cx="239" cy="61" r="3" /><circle cx="239" cy="137" r="3" /><circle cx="246" cy="228" r="3" />
        </g>

        <g className="planner-config-module planner-config-layout">
          <rect x="277" y="42" width="56" height="38" rx="8" /><path d="M289 52 H321 M289 61 H321 M289 70 H321 M299 48 V74 M310 48 V74" />
        </g>
        <g className="planner-config-module planner-config-components">
          <rect x="277" y="118" width="56" height="38" rx="8" /><rect x="288" y="128" width="14" height="14" rx="2" /><path d="M307 128 H323 M307 135 H323 M307 142 H317" />
        </g>
        <g className="planner-config-module planner-config-palette">
          <rect x="277" y="218" width="56" height="38" rx="8" /><circle cx="295" cy="237" r="10" /><circle cx="313" cy="237" r="4" /><circle cx="324" cy="237" r="4" />
        </g>
      </svg>
    </div>
  );
}

function ToolGraphic({ type, sv }: { type: Tool["id"]; sv: boolean }) {
  if (type === "planner") return <PlannerLayerGraphic />;

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
