"use client";

import Link from "next/link";

import { Arrow, CtaStrip, Eyebrow, Raven, useLanguage } from "../components/site-shell";
import { Braces, LayoutTemplate, MessagesSquare, ShoppingCart, WandSparkles, Waypoints } from "lucide-react";

const services = [
  {
    icon: LayoutTemplate,
    iconTone: "blue",
    sv: ["Webbplatser", "Nya företagswebbplatser och genomtänkta förbättringar av det som redan finns – snabba, responsiva och enkla att uppdatera."],
    en: ["Websites", "New business websites and thoughtful improvements to existing sites — fast, responsive and easy to update."],
  },
  {
    icon: Braces,
    iconTone: "purple",
    sv: ["Webbappar", "Interaktiva applikationer för webben som effektiviserar processer och skapar bättre användarupplevelser."],
    en: ["Web apps", "Interactive web applications that streamline processes and create better user experiences."],
  },
  {
    icon: ShoppingCart,
    iconTone: "purple",
    sv: ["E-handel", "Butiker online som är enkla att hantera och optimerade för en säker och smidig köpresa."],
    en: ["E-commerce", "Online stores that are simple to manage and optimized for a safe, smooth buying journey."],
  },
  {
    icon: WandSparkles,
    iconTone: "pink",
    sv: ["Design & UX", "Tydlig och genomtänkt design med fokus på användarvänlighet och en stark visuell identitet."],
    en: ["Design & UX", "Clear, thoughtful design focused on usability and a strong visual identity."],
  },
  {
    icon: Waypoints,
    iconTone: "blue",
    sv: ["Integrationer", "Kopplingar mellan system och tjänster som sparar tid och minskar manuellt arbete."],
    en: ["Integrations", "Connections between systems and services that save time and reduce manual work."],
  },
  {
    icon: MessagesSquare,
    iconTone: "purple",
    sv: ["Rådgivning", "Teknisk rådgivning och bollplank för att hitta rätt lösning och väg framåt."],
    en: ["Consulting", "Technical guidance and a practical sounding board for finding the right way forward."],
  },
];

export default function ServicesPage() {
  const { lang } = useLanguage();
  const sv = lang === "sv";
  return (
    <main className="page-shell inner-page">
      <section className="inner-hero with-art raven-return-section mobile-raven-spacing emote-raven-spacing">
        <div>
          <Eyebrow>{sv ? "Tjänster" : "Services"}</Eyebrow>
          <h1>{sv ? "Webbutveckling och webbdesign som hjälper dig framåt" : "Web development and design that move you forward"}</h1>
          <p>
            {sv
              ? "Jag hjälper småföretag i Alingsås med omnejd att bygga nya företagswebbplatser, förbättra befintliga webbplatser och ta fram skräddarsydda webblösningar. Teknisk SEO, prestanda och tillgänglighet finns med från början."
              : "I help small businesses in and around Alingsås build new business websites, improve existing sites and create tailored web solutions. Technical SEO, performance and accessibility are considered from the start."}
          </p>
        </div>
        <Raven
          compact
          variant="services"
          asset="/images/raven-services-question.svg"
          priority
        />
      </section>

      <section className="service-grid" aria-label={sv ? "Tjänster" : "Services"}>
        {services.map((service) => {
          const [title, description] = sv ? service.sv : service.en;
          const ServiceIcon = service.icon;
          return (
            <article className="service-card" key={title}>
              <span className={`service-card-icon service-card-icon-${service.iconTone}`} aria-hidden="true">
                <ServiceIcon />
              </span>
              <h2>{title}</h2>
              <p>{description}</p>
            </article>
          );
        })}
      </section>
      <section className="cta-strip service-proof" aria-labelledby="service-proof-title">
        <div>
          <h2 id="service-proof-title">{sv ? "Se hur lösningarna tar form" : "See how the solutions take shape"}</h2>
          <p>{sv ? "Från analysverktyg till bilddrivna webbplatser – här är två olika typer av uppdrag." : "From analytics tools to image-led websites — here are two different kinds of projects."}</p>
        </div>
        <nav className="service-proof-links" aria-label={sv ? "Relevanta projekt" : "Relevant projects"}>
          <Link className="text-link" href="/arbete/btc-backtest-hub">
            {sv ? "Se webbappen BTC Backtest Hub" : "See the BTC Backtest Hub web app"} <Arrow />
          </Link>
          <Link className="text-link" href="/arbete/pixelmagi">
            {sv ? "Se webbdesignen bakom Pixelmagi" : "See the web design behind Pixelmagi"} <Arrow />
          </Link>
        </nav>
      </section>
      <CtaStrip />
    </main>
  );
}
