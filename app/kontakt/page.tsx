"use client";

import { ContactForm, Eyebrow, useLanguage } from "../components/site-shell";

export default function ContactPage() {
  const { lang } = useLanguage();
  const sv = lang === "sv";
  return (
    <main className="page-shell inner-page">
      <section className="contact-layout">
        <div className="contact-copy">
          <Eyebrow>{sv ? "Kontakt" : "Contact"}</Eyebrow>
          <h1>
            {sv ? "Låt oss bygga något" : "Let’s build something"} <br />
            {sv ? "bra " : "good "}
            <span>{sv ? "tillsammans" : "together"}</span>
          </h1>
          <p>
            {sv
              ? "Berätta om ditt projekt eller en idé så hör jag av mig så snart jag kan."
              : "Tell me about your project or idea and I’ll get back to you as soon as I can."}
          </p>
          <dl className="contact-details">
            <div>
              <dt>{sv ? "E-post" : "Email"}</dt>
              <dd>
                <a href="mailto:adam@birdbrain.it">adam@birdbrain.it</a>
              </dd>
            </div>
            <div>
              <dt>{sv ? "Plats" : "Location"}</dt>
              <dd>Alingsås, Sverige</dd>
            </div>
            <div>
              <dt>{sv ? "Tillgänglig" : "Availability"}</dt>
              <dd>{sv ? "För nya projekt" : "Open for new projects"}</dd>
            </div>
          </dl>
        </div>
        <ContactForm />
      </section>
      <section className="reply-note">
        <span aria-hidden="true">✉</span>
        <div>
          <h2>{sv ? "Svarar vanligtvis inom 24 timmar" : "Usually replies within 24 hours"}</h2>
          <p>
            {sv
              ? "Jag läser alla meddelanden och återkommer så snart jag kan."
              : "I read every message and reply as soon as I can."}
          </p>
        </div>
      </section>
    </main>
  );
}
