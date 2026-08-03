"use client";

import { Arrow, Eyebrow, Raven, useLanguage } from "../components/site-shell";

function PlannerIllustration() {
  return (
    <svg
      className="tools-card-illustration planner-illustration"
      viewBox="0 0 360 240"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="planner-stroke" x1="36" y1="22" x2="327" y2="218" gradientUnits="userSpaceOnUse">
          <stop stopColor="#29dcff" />
          <stop offset="0.55" stopColor="#6e7aff" />
          <stop offset="1" stopColor="#f250df" />
        </linearGradient>
        <filter id="planner-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <g stroke="url(#planner-stroke)" strokeLinecap="round" strokeLinejoin="round">
        <path d="M50 24h168l28 27v169H50z" opacity=".72" />
        <path d="M218 24v29h28" opacity=".72" />
        <path d="M72 62h79M72 78h58M72 103h52M72 181h54" opacity=".52" />
        <rect x="151" y="73" width="42" height="42" rx="4" />
        <path d="m162 93 8 8 14-18" filter="url(#planner-glow)" />
        <rect x="151" y="126" width="42" height="42" rx="4" />
        <path d="m162 146 8 8 14-18" filter="url(#planner-glow)" />
        <rect x="151" y="179" width="42" height="42" rx="4" />
        <path d="m162 199 8 8 14-18" filter="url(#planner-glow)" />
        <path d="M193 94h54l19-25h22M193 147h70l17 22h19M193 200h51l22 17h31" strokeDasharray="3 5" opacity=".8" />
      </g>
      <g fill="#07101c" stroke="url(#planner-stroke)" filter="url(#planner-glow)">
        <circle cx="303" cy="69" r="14" />
        <circle cx="314" cy="169" r="14" />
        <circle cx="312" cy="217" r="14" />
      </g>
    </svg>
  );
}

function AuditIllustration() {
  return (
    <svg
      className="tools-card-illustration audit-illustration"
      viewBox="0 0 360 240"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="audit-stroke" x1="28" y1="40" x2="330" y2="225" gradientUnits="userSpaceOnUse">
          <stop stopColor="#28d9ff" />
          <stop offset="0.5" stopColor="#7671ff" />
          <stop offset="1" stopColor="#f153df" />
        </linearGradient>
        <filter id="audit-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <g stroke="url(#audit-stroke)" strokeLinecap="round" strokeLinejoin="round">
        <path d="M49 194a100 100 0 1 1 195 0" strokeWidth="2" filter="url(#audit-glow)" />
        <path d="M68 180a80 80 0 0 1 157 0" opacity=".4" />
        <path d="M54 194h187" opacity=".45" />
        <path d="m147 174 65-68-49 80" strokeWidth="2" filter="url(#audit-glow)" />
        <circle cx="147" cy="183" r="15" fill="#07101c" />
        <path d="M62 160l15 5M75 126l14 9M99 98l10 13M130 82l4 16M166 82l-4 16M198 96l-10 13M224 124l-14 9" opacity=".8" />
        <path d="M244 110h43l15-22h27M231 151h69l14 17h22M244 194h51l17 19h22" strokeDasharray="3 5" opacity=".72" />
      </g>
      <g fill="#07101c" stroke="url(#audit-stroke)" filter="url(#audit-glow)">
        <circle cx="334" cy="88" r="13" />
        <circle cx="339" cy="168" r="13" />
        <circle cx="338" cy="213" r="13" />
      </g>
    </svg>
  );
}

function TrustIcon({ type }: { type: "shield" | "bolt" | "raven" }) {
  if (type === "shield") {
    return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3 5 6v5c0 4.6 2.8 8 7 10 4.2-2 7-5.4 7-10V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></svg>;
  }
  if (type === "bolt") {
    return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m13.5 2-8 12h6l-1 8 8-12h-6z" /></svg>;
  }
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 19c3-1 4-3.2 4.2-6.5L6 9.5l3.7.3C10.8 6.2 14 4 18.5 4c-1 1-1.8 2.2-2.3 3.6L20 9l-4.2 1.5c-.1 4.8-2.2 7.7-6.3 8.5H4Z" /><circle cx="14.2" cy="7.3" r=".7" fill="currentColor" stroke="none" /></svg>;
}

export default function ToolsPage() {
  const { lang } = useLanguage();
  const sv = lang === "sv";

  return (
    <main className="page-shell inner-page tools-page">
      <section className="tools-hero">
        <div className="tools-hero-copy">
          <Eyebrow>{sv ? "Gratis verktyg" : "Free tools"}</Eyebrow>
          <h1>
            {sv ? "Smarta verktyg för" : "Smarter tools for"}{" "}<br />
            <span>{sv ? "bättre webbprojekt" : "better web projects"}</span>
          </h1>
          <p>
            {sv
              ? "Planera en ny webbplats eller analysera den du redan har — helt kostnadsfritt."
              : "Plan a new website or assess the one you already have — completely free."}
          </p>
        </div>
        <div className="tools-raven" aria-hidden="true">
          <Raven compact variant="home" priority />
        </div>
      </section>

      <section className="tools-grid" aria-label={sv ? "Kostnadsfria verktyg" : "Free tools"}>
        <article className="tools-card tools-card-planner">
          <div className="tools-card-copy">
            <p className="tools-card-kicker">{sv ? "Tillgänglig nu" : "Available now"}</p>
            <h2>{sv ? "Webbplatsplaneraren" : "Website planner"}</h2>
            <p>
              {sv
                ? "Få en tydlig projektbrief och en uppskattad prisbild på några minuter."
                : "Create a clear project brief and estimated budget range in just a few minutes."}
            </p>
            <a className="button button-outline tools-card-action" href="https://planner.birdbrain.it">
              {sv ? "Börja planera" : "Start planning"} <Arrow />
            </a>
          </div>
          <PlannerIllustration />
        </article>

        <article className="tools-card tools-card-audit">
          <div className="tools-card-copy">
            <p className="tools-card-kicker">{sv ? "Under utveckling" : "In development"}</p>
            <h2>{sv ? "Hastighetsanalys" : "Site audit"}</h2>
            <p>
              {sv
                ? "Se hur snabbt din webbplats laddar och vad som är värt att förbättra."
                : "See how quickly your website loads and what is worth improving."}
            </p>
            <span className="tools-card-status" aria-label={sv ? "Kommer snart" : "Coming soon"}>
              <span aria-hidden="true" />
              {sv ? "Kommer snart" : "Coming soon"}
            </span>
          </div>
          <AuditIllustration />
        </article>
      </section>

      <section className="tools-trust-strip" aria-label={sv ? "Om verktygen" : "About the tools"}>
        <div><TrustIcon type="shield" /><span>{sv ? "Ingen registrering krävs" : "No registration required"}</span></div>
        <div><TrustIcon type="bolt" /><span>{sv ? "Resultat direkt" : "Instant results"}</span></div>
        <div><TrustIcon type="raven" /><span>{sv ? "Byggt av Birdbrain IT" : "Built by Birdbrain IT"}</span></div>
      </section>
    </main>
  );
}
