/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  createContext,
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
  [148, 379], [225, 342], [245, 309], [298, 281], [364, 272],
  [468, 297], [264, 365], [309, 341], [395, 370], [307, 431],
  [307, 541], [361, 489], [486, 441], [531, 523], [636, 502],
  [678, 585], [769, 578], [838, 655], [1007, 770], [919, 763],
  [1122, 892], [1139, 951], [1012, 914], [911, 864], [692, 802],
  [623, 814], [557, 765], [487, 781], [376, 683], [438, 628],
  [553, 671], [636, 645], [736, 682], [812, 752], [836, 751],
  [996, 824], [769, 704], [918, 820], [557, 817], [519, 914],
  [489, 976], [431, 990], [360, 997], [392, 977], [486, 988],
  [604, 876], [577, 963], [617, 1000], [565, 1018], [480, 1033],
  [521, 1014], [677, 1009], [623, 1019], [299, 299], [360, 306],
  [452, 357], [263, 383], [365, 431], [430, 505], [488, 572],
  [438, 704], [558, 734], [640, 730], [705, 752],
] as const;

const ravenEdges = [
  [0, 1], [0, 6], [1, 2], [1, 6], [1, 7], [2, 3], [2, 7],
  [3, 4], [3, 53], [4, 5], [4, 53], [4, 54], [5, 12], [5, 54],
  [6, 7], [6, 9], [6, 56], [7, 8], [7, 53], [7, 56], [8, 12],
  [8, 54], [8, 55], [8, 57], [9, 10], [9, 11], [9, 56], [10, 11],
  [10, 28], [11, 27], [11, 28], [11, 29], [11, 57], [12, 13],
  [12, 14], [12, 55], [12, 57], [13, 14], [13, 29], [13, 30],
  [13, 58], [14, 15], [14, 31], [14, 58], [15, 16], [15, 30],
  [15, 31], [16, 17], [16, 31], [16, 32], [17, 18], [17, 19],
  [17, 32], [18, 20], [18, 35], [19, 23], [19, 34], [19, 35],
  [20, 21], [20, 22], [20, 35], [21, 22], [21, 23], [22, 23],
  [22, 35], [23, 24], [23, 33], [23, 34], [24, 25], [24, 32],
  [24, 33], [24, 62], [25, 26], [25, 38], [25, 45], [25, 61],
  [26, 27], [26, 29], [26, 30], [26, 38], [26, 60], [27, 28],
  [27, 29], [27, 60], [28, 29], [29, 30], [29, 57], [29, 58],
  [29, 59], [30, 31], [30, 58], [30, 59], [30, 61], [31, 32],
  [31, 36], [31, 58], [31, 61], [31, 62], [32, 33], [32, 36],
  [32, 37], [32, 62], [33, 34], [33, 36], [33, 37], [33, 63],
  [34, 35], [34, 37], [35, 37], [36, 37], [36, 62], [37, 63],
  [38, 39], [38, 45], [39, 40], [39, 45], [40, 41], [40, 43],
  [40, 44], [41, 42], [41, 43], [41, 44], [42, 43], [43, 44],
  [45, 46], [45, 49], [46, 47], [46, 48], [47, 48], [47, 50],
  [47, 51], [47, 52], [48, 50], [48, 52], [49, 50], [50, 51],
  [50, 52], [51, 52], [53, 54], [53, 7], [54, 8], [54, 55],
  [55, 12], [55, 57], [56, 57], [57, 58], [58, 59], [59, 60],
  [59, 61], [60, 61], [61, 62], [62, 63],
] as const;

function sequenceIndex(index: number, variant: RavenVariant, total: number) {
  if (variant === "services") return total - index - 1;
  if (variant === "process") return (index * 7) % total;
  if (variant === "lost") return (index * 17) % total;
  return index;
}

export function RavenNetwork({ variant = "home" }: { variant?: RavenVariant }) {
  const gradientId = `raven-network-gradient-${variant}`;

  return (
    <svg
      className="raven-network"
      viewBox="0 0 1204 1306"
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
              style={{ animationDelay: `${0.12 + order * 0.012}s` }}
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
            r={index === 7 ? 6 : 3.4}
            style={{ animationDelay: `${0.04 + sequenceIndex(index, variant, ravenPoints.length) * 0.022}s` }}
          />
        ))}
      </g>
    </svg>
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
      <span className="raven-forge-halo" aria-hidden="true" />
      <img
        className="raven-vector-art"
        src="/images/ruven.svg"
        alt=""
        width="1204"
        height="1306"
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        draggable={false}
      />
      <RavenNetwork variant={variant} />
      <span className="raven-forge-spark raven-forge-spark-one" aria-hidden="true" />
      <span className="raven-forge-spark raven-forge-spark-two" aria-hidden="true" />
      <span className="raven-forge-spark raven-forge-spark-three" aria-hidden="true" />
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
