"use client";

import { CtaStrip, Eyebrow, Raven, useLanguage } from "../components/site-shell";
import { Braces, LayoutTemplate, MessagesSquare, ShoppingCart, WandSparkles, Waypoints } from "lucide-react";

const services = [
  {
    icon: LayoutTemplate,
    iconTone: "blue",
    sv: ["Webbplatser", "Snygga, snabba och responsiva webbplatser som är enkla att uppdatera och anpassade för dina behov."],
    en: ["Websites", "Polished, fast and responsive websites that are easy to update and tailored to your needs."],
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
          <h1>
            {sv ? "Det jag " : "How I can "}
            <span>{sv ? "hjälper dig" : "help you"}</span>
            {sv ? " med" : ""}
          </h1>
          <p>
            {sv
              ? "Skräddarsydda lösningar som löser problem på riktigt och skapar värde för dig och dina användare."
              : "Tailored solutions that solve real problems and create value for you and your users."}
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
      <CtaStrip />
    </main>
  );
}
