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
  ["8%", "28%", "-0.2s", "2.8s"],
  ["17%", "62%", "-1.4s", "3.4s"],
  ["27%", "17%", "-2.1s", "3.1s"],
  ["36%", "72%", "-0.8s", "2.6s"],
  ["44%", "39%", "-1.9s", "3.6s"],
  ["54%", "12%", "-0.5s", "2.9s"],
  ["61%", "61%", "-2.5s", "3.3s"],
  ["69%", "29%", "-1.1s", "2.7s"],
  ["77%", "76%", "-0.4s", "3.8s"],
  ["84%", "46%", "-2.2s", "3s"],
  ["92%", "18%", "-1.6s", "3.5s"],
  ["96%", "67%", "-0.9s", "2.6s"],
];

export function WireframeField() {
  return (
    <div className="wireframe-field" aria-hidden="true">
      <span className="wireframe-grid" />
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

export function Raven({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "raven-art raven-art-compact" : "raven-art"}>
      <WireframeField />
      <span className="raven-draw-tracer" aria-hidden="true" />
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
