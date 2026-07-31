"use client";

import type { ReactNode } from "react";

import { ContactForm, Eyebrow, useLanguage } from "../components/site-shell";

type ContactIconType = "mail" | "location" | "availability" | "reply";

function ContactIcon({ type }: { type: ContactIconType }) {
  const paths: Record<ContactIconType, ReactNode> = {
    mail: (
      <>
        <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
        <path d="m5 7 7 5.5L19 7" />
      </>
    ),
    location: (
      <>
        <path d="M12 21s7-5.9 7-12a7 7 0 1 0-14 0c0 6.1 7 12 7 12Z" />
        <circle cx="12" cy="9" r="2.3" />
      </>
    ),
    availability: (
      <>
        <rect x="3.5" y="5.5" width="17" height="15" rx="2.5" />
        <path d="M8 3.5v4M16 3.5v4M3.5 10h17m-12 4.5 2.2 2.2 4.8-5" />
      </>
    ),
    reply: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5V12l3.2 2M4.5 4.5 3 8l3.6-.5" />
      </>
    ),
  };

  return (
    <span className={`contact-icon contact-icon-${type}`} aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.55">
        {paths[type]}
      </svg>
    </span>
  );
}

export default function ContactPage() {
  const { lang } = useLanguage();
  const sv = lang === "sv";
  return (
    <main className="page-shell inner-page contact-page">
      <section className="contact-hero">
        <Eyebrow>{sv ? "Kontakt" : "Contact"}</Eyebrow>
        <div className="contact-hero-grid">
          <h1>{sv ? "Låt oss bygga något bra " : "Let’s build something good "}<span>{sv ? "tillsammans" : "together"}</span></h1>
          <p>{sv ? "Berätta om ditt projekt eller en idé så hör jag av mig så snart jag kan." : "Tell me about your project or idea and I’ll get back to you as soon as I can."}</p>
        </div>
      </section>
      <section className="contact-layout">
        <aside className="contact-panel">
          <dl className="contact-details">
            <div>
              <ContactIcon type="mail" />
              <span>
                <dt>{sv ? "E-post" : "Email"}</dt>
                <dd>
                  <a href="mailto:Hello@birdbrain.it">Hello@birdbrain.it</a>
                </dd>
              </span>
            </div>
            <div>
              <ContactIcon type="location" />
              <span>
                <dt>{sv ? "Plats" : "Location"}</dt>
                <dd>Alingsås, Sverige</dd>
              </span>
            </div>
            <div>
              <ContactIcon type="availability" />
              <span>
                <dt>{sv ? "Tillgänglig" : "Availability"}</dt>
                <dd>{sv ? "För nya projekt" : "Open for new projects"}</dd>
              </span>
            </div>
          </dl>
          <section className="reply-note">
            <ContactIcon type="reply" />
            <div><h2>{sv ? "Svarar vanligtvis inom 24 timmar" : "Usually replies within 24 hours"}</h2><p>{sv ? "Jag läser alla meddelanden och återkommer så snart jag kan." : "I read every message and reply as soon as I can."}</p></div>
          </section>
        </aside>
        <ContactForm />
      </section>
    </main>
  );
}
