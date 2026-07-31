/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element */
"use client";

import { usePathname } from "next/navigation";
import {
  createContext,
  type FormEvent,
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
      <a className="skip-link" href="#main-content">
        {lang === "sv" ? "Hoppa till innehåll" : "Skip to content"}
      </a>
      <SiteHeader />
      <div id="main-content">{children}</div>
      <SiteFooter />
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
        <a className="wordmark" href="/" aria-label="Birdbrain IT – hem" onClick={() => setOpen(false)}>
          Birdbrain IT
        </a>
        <nav className={`main-nav ${open ? "is-open" : ""}`} aria-label="Huvudmeny">
          {navigation.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <a
                className={active ? "active" : ""}
                href={item.href}
                key={item.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {lang === "sv" ? item.sv : item.en}
              </a>
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
      <a className="wordmark" href="/">
        Birdbrain IT
      </a>
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
  ["11%", "81%", "-2.6s", "3.7s"],
  ["17%", "62%", "-1.4s", "3.4s"],
  ["22%", "43%", "-0.7s", "2.5s"],
  ["27%", "17%", "-2.1s", "3.1s"],
  ["31%", "89%", "-1.2s", "3.9s"],
  ["36%", "72%", "-0.8s", "2.6s"],
  ["39%", "5%", "-2.8s", "3.4s"],
  ["44%", "39%", "-1.9s", "3.6s"],
  ["49%", "84%", "-1.3s", "2.8s"],
  ["54%", "12%", "-0.5s", "2.9s"],
  ["57%", "47%", "-2.4s", "3.7s"],
  ["61%", "61%", "-2.5s", "3.3s"],
  ["65%", "91%", "-0.6s", "2.6s"],
  ["69%", "29%", "-1.1s", "2.7s"],
  ["73%", "7%", "-2.9s", "3.5s"],
  ["77%", "76%", "-0.4s", "3.8s"],
  ["81%", "59%", "-1.8s", "2.9s"],
  ["84%", "46%", "-2.2s", "3s"],
  ["88%", "88%", "-0.3s", "3.4s"],
  ["92%", "18%", "-1.6s", "3.5s"],
  ["96%", "67%", "-0.9s", "2.6s"],
  ["99%", "35%", "-2.7s", "3.8s"],
];

export function WireframeField() {
  return (
    <div className="wireframe-field" aria-hidden="true">
      <span className="wireframe-room">
        <i className="room-plane room-back" />
        <i className="room-plane room-left" />
        <i className="room-plane room-right" />
        <i className="room-plane room-ceiling" />
      </span>
      <span className="wireframe-grid wireframe-floor" />
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

type RavenVariant = "home" | "services" | "process" | "lost";

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
              style={{ animationDelay: `${0.16 + order * 0.035}s` }}
            />
          );
        })}
      </g>
      <g className="raven-network-nodes" fill={`url(#${gradientId})`}>
        {ravenPoints.map(([cx, cy], index) => (
          <circle
            className="raven-network-node"
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r={index === 20 ? 5.5 : 3.5}
            style={{
              animationDelay: `${0.08 + sequenceIndex(index, variant, ravenPoints.length) * 0.045}s`,
            }}
          />
        ))}
      </g>
    </svg>
  );
}

export function Raven({
  compact = false,
  variant = "home",
}: {
  compact?: boolean;
  variant?: RavenVariant;
}) {
  return (
    <div
      className={`${compact ? "raven-art raven-art-compact" : "raven-art"} raven-variant-${variant}`}
    >
      <WireframeField />
      <RavenNetwork variant={variant} />
      <img
        className="raven-draw-image"
        src="/images/wireframe-raven.webp"
        alt=""
        width="1245"
        height="548"
        loading="lazy"
      />
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
      <a className="button button-outline" href="/kontakt">
        {sv ? "Kontakta mig" : "Contact me"} <Arrow />
      </a>
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
  return (
    <article className={`project-card accent-${accent} ${wide ? "project-card-wide" : ""}`}>
      <div className="project-copy">
        <p className="project-type">{type}</p>
        <h3>{title}</h3>
        <p>{description}</p>
        {children}
        <a className="text-link" href={href}>
          {lang === "sv" ? "Visa case" : "View case"} <Arrow />
        </a>
      </div>
      <div className="project-image">
        <img src={image} alt="" width="1500" height="920" loading="lazy" />
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
