/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  createContext,
  type CSSProperties,
  type FormEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type Language = "sv" | "en";
type LanguageContextValue = {
  lang: Language;
  setLang: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const navigation = [
  { href: "/", sv: "Hem", en: "Home" },
  { href: "/tjanster", sv: "Tjänster", en: "Services" },
  { href: "/arbete", sv: "Arbete", en: "Work" },
  { href: "/om-mig", sv: "Om mig", en: "About" },
  { href: "/process", sv: "Process", en: "Process" },
  { href: "/insikter", sv: "Insikter", en: "Insights" },
  { href: "/kontakt", sv: "Kontakt", en: "Contact" },
];

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) {
    throw new Error("useLanguage must be used inside SiteShell");
  }
  return value;
}

export function SiteShell({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("sv");

  useEffect(() => {
    const saved = window.localStorage.getItem("birdbrain-language");
    if (saved === "sv" || saved === "en") {
      queueMicrotask(() => setLang(saved));
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      setLang: (language: Language) => {
        setLang(language);
        window.localStorage.setItem("birdbrain-language", language);
        document.documentElement.lang = language;
      },
    }),
    [lang],
  );

  return (
    <LanguageContext.Provider value={value}>
      <div className="site-canvas">
        <RavenPageEnvironment variant="process" />
        <a className="skip-link" href="#main-content">
          {lang === "sv" ? "Hoppa till innehåll" : "Skip to content"}
        </a>
        <SiteHeader />
        <div className="site-main-content" id="main-content">{children}</div>
        <SiteFooter />
      </div>
    </LanguageContext.Provider>
  );
}

function SiteHeader() {
  const pathname = usePathname();
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner page-shell">
        <Link
          className="wordmark"
          href="/"
          aria-label="Birdbrain IT – hem"
          onClick={() => setOpen(false)}
        >
          Birdbrain IT
        </Link>
        <nav className={`main-nav ${open ? "is-open" : ""}`} aria-label="Huvudmeny">
          {navigation.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                className={active ? "active" : ""}
                href={item.href}
                key={item.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {lang === "sv" ? item.sv : item.en}
              </Link>
            );
          })}
          <div className="mobile-language">
            <LanguageToggle lang={lang} setLang={setLang} />
          </div>
        </nav>
        <div className="desktop-language">
          <LanguageToggle lang={lang} setLang={setLang} />
        </div>
        <button
          className={`menu-button ${open ? "is-open" : ""}`}
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-label={lang === "sv" ? "Öppna meny" : "Open menu"}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

function LanguageToggle({
  lang,
  setLang,
}: {
  lang: Language;
  setLang: (language: Language) => void;
}) {
  return (
    <div className="language-toggle" aria-label="Language">
      <button
        type="button"
        className={lang === "sv" ? "active" : ""}
        onClick={() => setLang("sv")}
        aria-pressed={lang === "sv"}
      >
        SV
      </button>
      <button
        type="button"
        className={lang === "en" ? "active" : ""}
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
    </div>
  );
}

function SiteFooter() {
  const { lang } = useLanguage();
  return (
    <footer className="site-footer page-shell">
      <Link className="wordmark" href="/">
        Birdbrain IT
      </Link>
      <p>
        © {new Date().getFullYear()} Birdbrain IT.{" "}
        {lang === "sv" ? "Byggt med omtanke i Alingsås." : "Thoughtfully built in Alingsås."}
      </p>
      <a href="mailto:Hello@birdbrain.it">Hello@birdbrain.it</a>
    </footer>
  );
}

export function Arrow() {
  return (
    <svg
      aria-hidden="true"
      className="arrow-icon"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M4 10h11M10.5 5.5 15 10l-4.5 4.5" />
    </svg>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="eyebrow">
      <span aria-hidden="true" />
      {children}
    </p>
  );
}

const sparkles = [
  ["3%", "48%", "-1.7s", "3.2s"],
  ["8%", "28%", "-0.2s", "2.8s"],
  ["17%", "62%", "-1.4s", "3.4s"],
  ["22%", "43%", "-0.7s", "2.5s"],
  ["27%", "17%", "-2.1s", "3.1s"],
  ["36%", "72%", "-0.8s", "2.6s"],
  ["39%", "5%", "-2.8s", "3.4s"],
  ["44%", "39%", "-1.9s", "3.6s"],
  ["54%", "12%", "-0.5s", "2.9s"],
  ["57%", "47%", "-2.4s", "3.7s"],
  ["61%", "61%", "-2.5s", "3.3s"],
  ["69%", "29%", "-1.1s", "2.7s"],
  ["73%", "7%", "-2.9s", "3.5s"],
  ["77%", "76%", "-0.4s", "3.8s"],
  ["81%", "59%", "-1.8s", "2.9s"],
  ["88%", "88%", "-0.3s", "3.4s"],
  ["92%", "18%", "-1.6s", "3.5s"],
  ["96%", "67%", "-0.9s", "2.6s"],
  ["12%", "84%", "-3.2s", "4.1s"],
  ["19%", "9%", "-1.1s", "3.9s"],
  ["31%", "91%", "-2.5s", "4.3s"],
  ["47%", "82%", "-0.6s", "3.2s"],
  ["64%", "88%", "-3.4s", "4.4s"],
  ["71%", "46%", "-1.9s", "3.1s"],
  ["84%", "34%", "-2.8s", "3.9s"],
  ["98%", "42%", "-0.4s", "4.2s"],
];

type RavenVariant = "home" | "services" | "process" | "lost";

export function WireframeField({ variant = "home" }: { variant?: RavenVariant }) {
  return (
    <div className={`wireframe-field field-variant-${variant}`} aria-hidden="true">
      <span className="wireframe-room">
        <i className="room-plane room-back" />
        <i className="room-plane room-left" />
        <i className="room-plane room-right" />
        <i className="room-plane room-ceiling" />
        <span className="chamber-vault">
          <i className="chamber-ring chamber-ring-outer" />
          <i className="chamber-ring chamber-ring-middle" />
          <i className="chamber-ring chamber-ring-inner" />
          <i className="chamber-core" />
        </span>
        <span className="room-depth room-depth-top-left" />
        <span className="room-depth room-depth-top-right" />
        <span className="room-depth room-depth-bottom-left" />
        <span className="room-depth room-depth-bottom-right" />
        <span className="room-column room-column-left" />
        <span className="room-column room-column-right" />
        <span className="room-beam room-beam-one" />
        <span className="room-beam room-beam-two" />
        <span className="room-beam room-beam-three" />
        <span className="room-scan" />
      </span>
      <span className="observatory-arc observatory-arc-one" />
      <span className="observatory-arc observatory-arc-two" />
      <span className="observatory-arc observatory-arc-three" />
      <span className="constellation-trace constellation-trace-one" />
      <span className="constellation-trace constellation-trace-two" />
      <span className="constellation-trace constellation-trace-three" />
      <span className="aurora-fog" />
      <span className="room-horizon" />
      <span className="wireframe-grid wireframe-floor" />
      <span className="data-stream data-stream-one" />
      <span className="data-stream data-stream-two" />
      <span className="data-stream data-stream-three" />
      {sparkles.map(([left, top, delay, duration], index) => (
        <span
          className="wireframe-spark"
          key={`${left}-${top}`}
          style={{ left, top, animationDelay: delay, animationDuration: duration }}
        >
          {index % 3 === 0 ? <i /> : null}
        </span>
      ))}
    </div>
  );
}

const ravenPoints = [
  [118, 125],
  [208, 80],
  [296, 43],
  [382, 58],
  [453, 169],
  [599, 260],
  [606, 329],
  [758, 385],
  [883, 482],
  [708, 438],
  [583, 381],
  [543, 382],
  [443, 524],
  [390, 527],
  [456, 401],
  [360, 315],
  [325, 346],
  [251, 242],
  [290, 212],
  [208, 119],
  [246, 99],
  [321, 118],
  [393, 175],
  [362, 315],
  [505, 301],
  [493, 398],
  [611, 375],
  [324, 509],
] as const;

const ravenEdges = [
  [0, 19],
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [6, 7],
  [7, 8],
  [8, 9],
  [9, 10],
  [10, 11],
  [11, 12],
  [12, 13],
  [11, 14],
  [14, 27],
  [14, 15],
  [15, 16],
  [16, 17],
  [17, 18],
  [18, 19],
  [19, 1],
  [19, 20],
  [20, 1],
  [20, 21],
  [21, 2],
  [21, 3],
  [21, 22],
  [22, 3],
  [22, 4],
  [18, 21],
  [18, 22],
  [17, 23],
  [23, 22],
  [23, 24],
  [24, 5],
  [24, 6],
  [23, 15],
  [15, 24],
  [24, 25],
  [25, 10],
  [25, 26],
  [26, 6],
  [26, 7],
  [26, 9],
  [10, 14],
  [15, 25],
  [16, 23],
  [4, 24],
  [5, 25],
] as const;

function sequenceIndex(index: number, variant: RavenVariant, total: number) {
  if (variant === "services") return total - index - 1;
  if (variant === "process") {
    const [from, to] = ravenEdges[index];
    return Math.min(Math.abs(from - 20), Math.abs(to - 20));
  }
  if (variant === "lost") return (index * 17) % total;
  return index;
}

function nodeOrigin(index: number, variant: RavenVariant) {
  if (variant === "services") {
    return {
      x: index % 2 === 0 ? -420 - (index % 5) * 20 : 420 + (index % 4) * 24,
      y: ((index * 53) % 220) - 110,
    };
  }
  if (variant === "process") {
    const angle = (index / ravenPoints.length) * Math.PI * 2;
    return {
      x: Math.cos(angle) * (250 + (index % 4) * 30),
      y: Math.sin(angle) * (150 + (index % 3) * 24),
    };
  }
  if (variant === "lost") {
    return {
      x: ((index * 137) % 680) - 340,
      y: ((index * 83) % 420) - 210,
    };
  }
  return {
    x: index % 4 < 2 ? -360 - (index % 5) * 38 : 360 + (index % 6) * 34,
    y: ((index * 97) % 560) - 280,
  };
}

export function RavenNetwork({ variant = "home" }: { variant?: RavenVariant }) {
  const gradientId = `raven-network-gradient-${variant}`;

  return (
    <svg
      className="raven-network"
      viewBox="0 0 1245 548"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="8%" y1="10%" x2="78%" y2="88%">
          <stop offset="0%" stopColor="#62c6ff" />
          <stop offset="48%" stopColor="#536cff" />
          <stop offset="100%" stopColor="#ef55f5" />
        </linearGradient>
      </defs>
      <g className="raven-convergence-routes" stroke={`url(#${gradientId})`}>
        {ravenPoints.map(([x2, y2], index) => {
          const origin = nodeOrigin(index, variant);
          const order = sequenceIndex(index, variant, ravenPoints.length);
          return (
            <line
              className="raven-convergence-route"
              key={`route-${x2}-${y2}`}
              x1={x2 + origin.x}
              y1={y2 + origin.y}
              x2={x2}
              y2={y2}
              pathLength="1"
              style={{ animationDelay: `${0.02 + order * 0.034}s` }}
            />
          );
        })}
      </g>
      <g className="raven-network-edges" stroke={`url(#${gradientId})`}>
        {ravenEdges.map(([from, to], index) => {
          const [x1, y1] = ravenPoints[from];
          const [x2, y2] = ravenPoints[to];
          const order = sequenceIndex(index, variant, ravenEdges.length);
          return (
            <line
              className="raven-network-edge"
              key={`${from}-${to}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              pathLength="1"
              style={{ animationDelay: `${0.72 + order * 0.029}s` }}
            />
          );
        })}
      </g>
      <g className="raven-network-nodes" fill={`url(#${gradientId})`}>
        {ravenPoints.map(([cx, cy], index) => (
          (() => {
            const origin = nodeOrigin(index, variant);
            return (
              <circle
                className="raven-network-node"
                key={`${cx}-${cy}`}
                cx={cx}
                cy={cy}
                r={index === 20 ? 5.5 : 3.5}
                style={
                  {
                    "--node-x": `${origin.x}px`,
                    "--node-y": `${origin.y}px`,
                    animationDelay: `${0.08 + sequenceIndex(index, variant, ravenPoints.length) * 0.034}s`,
                  } as CSSProperties
                }
              />
            );
          })()
        ))}
      </g>
    </svg>
  );
}

export function RavenImage({ priority = false }: { priority?: boolean }) {
  return (
    <picture className="raven-picture">
      <source media="(max-width: 760px)" srcSet="/images/wireframe-raven-720.webp" />
      <img
        className="raven-draw-image"
        src="/images/wireframe-raven.webp"
        alt=""
        width="1245"
        height="548"
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
      />
    </picture>
  );
}

export function RavenPageEnvironment({ variant }: { variant: RavenVariant }) {
  return (
    <div className={`raven-page-environment raven-page-environment-${variant}`} aria-hidden="true">
      <span className="raven-page-stars" />
      <span className="raven-page-architecture" />
      <span className="raven-page-floor" />
      <span className="raven-page-signal raven-page-signal-one" />
      <span className="raven-page-signal raven-page-signal-two" />
    </div>
  );
}

export function Raven({
  compact = false,
  variant = "home",
  hero = false,
  priority = false,
  label,
}: {
  compact?: boolean;
  variant?: RavenVariant;
  hero?: boolean;
  priority?: boolean;
  label?: string;
}) {
  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
    const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;

    event.currentTarget.style.setProperty("--scene-x", `${horizontal * 10}px`);
    event.currentTarget.style.setProperty("--scene-y", `${vertical * 8}px`);
    event.currentTarget.style.setProperty("--scene-rx", `${vertical * -2.2}deg`);
    event.currentTarget.style.setProperty("--scene-ry", `${horizontal * 3.2}deg`);
  }

  function resetPointer(event: ReactPointerEvent<HTMLDivElement>) {
    event.currentTarget.style.setProperty("--scene-x", "0px");
    event.currentTarget.style.setProperty("--scene-y", "0px");
    event.currentTarget.style.setProperty("--scene-rx", "0deg");
    event.currentTarget.style.setProperty("--scene-ry", "0deg");
  }

  const sceneClass = hero ? "hero-raven" : compact ? "raven-art raven-art-compact" : "raven-art";

  return (
    <div
      className={`${sceneClass} raven-scene raven-variant-${variant}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <WireframeField variant={variant} />
      <RavenNetwork variant={variant} />
      <RavenImage priority={priority} />
    </div>
  );
}

export function CtaStrip({
  title,
  text,
}: {
  title?: { sv: string; en: string };
  text?: { sv: string; en: string };
}) {
  const { lang } = useLanguage();
  const sv = lang === "sv";
  return (
    <section className="cta-strip">
      <div>
        <h2>
          {title
            ? sv
              ? title.sv
              : title.en
            : sv
              ? "Har du ett projekt på gång?"
              : "Have a project in mind?"}
        </h2>
        <p>
          {text
            ? sv
              ? text.sv
              : text.en
            : sv
              ? "Berätta om dina idéer så ser vi hur jag kan hjälpa dig."
              : "Tell me about your ideas and let’s see how I can help."}
        </p>
      </div>
      <Link className="button button-outline" href="/kontakt">
        {sv ? "Kontakta mig" : "Contact me"} <Arrow />
      </Link>
    </section>
  );
}

export function ProjectCard({
  accent,
  href,
  image,
  type,
  title,
  description,
  wide = false,
  children,
}: {
  accent: "blue" | "purple" | "pink";
  href: string;
  image: string;
  type: string;
  title: string;
  description: string;
  wide?: boolean;
  children?: ReactNode;
}) {
  const { lang } = useLanguage();
  const projectLink = (
    <>
      {lang === "sv" ? "Visa case" : "View case"} <Arrow />
    </>
  );
  return (
    <article className={`project-card accent-${accent} ${wide ? "project-card-wide" : ""}`}>
      <div className="project-copy">
        <p className="project-type">{type}</p>
        <h3>{title}</h3>
        <p>{description}</p>
        {children}
        {href.startsWith("/") ? (
          <Link className="text-link" href={href}>
            {projectLink}
          </Link>
        ) : (
          <a className="text-link" href={href}>
            {projectLink}
          </a>
        )}
      </div>
      <div className="project-image">
        <img
          src={image}
          alt=""
          width="1500"
          height="920"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
        />
      </div>
    </article>
  );
}

export function ContactForm() {
  const { lang } = useLanguage();
  const sv = lang === "sv";
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = encodeURIComponent(`Projektförfrågan från ${name}`);
    const body = encodeURIComponent(`${message}\n\nNamn: ${name}\nE-post: ${email}`);
    setSent(true);
    window.location.href = `mailto:Hello@birdbrain.it?subject=${subject}&body=${body}`;
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>
        {sv ? "Namn" : "Name"}
        <input name="name" type="text" placeholder={sv ? "Ditt namn" : "Your name"} required />
      </label>
      <label>
        {sv ? "E-post" : "Email"}
        <input name="email" type="email" placeholder="du@exempel.se" required />
      </label>
      <label>
        {sv ? "Berätta om ditt projekt" : "Tell me about your project"}
        <textarea
          name="message"
          rows={5}
          placeholder={sv ? "Vad vill du bygga?" : "What would you like to build?"}
          required
        />
      </label>
      <button className="button button-primary button-full" type="submit">
        {sv ? "Skicka meddelande" : "Send message"} <Arrow />
      </button>
      {sent && (
        <p className="form-note" role="status">
          {sv
            ? "Ditt e-postprogram öppnas med meddelandet ifyllt."
            : "Your email app is opening with the message filled in."}
        </p>
      )}
    </form>
  );
}
