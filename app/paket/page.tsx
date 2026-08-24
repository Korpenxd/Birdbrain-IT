"use client";

import Link from "next/link";

import { Arrow, Eyebrow, useLanguage } from "../components/site-shell";
import { WEBSITE_PACKAGES } from "../lib/packages";

const packageFeatures = [
  {
    sv: [
      "Upp till 5 sidor",
      "Unik design anpassad efter ditt företag",
      "Responsiv för mobil, surfplatta och dator",
      "Kontaktformulär",
      "Teknisk SEO, prestanda och tillgänglighet",
      "Smakfulla standardövergångar och mikrointeraktioner",
      "Grundläggande analys och konverteringsmätning där det passar",
      "Två revisionsrundor",
      "30 dagars garanti efter lansering",
      "Normal leveranstid 2–4 veckor",
      "Ett språk",
    ],
    en: [
      "Up to 5 pages",
      "Unique design tailored to your business",
      "Responsive on mobile, tablet and desktop",
      "Contact form",
      "Technical SEO, performance and accessibility",
      "Tasteful standard transitions and microinteractions",
      "Basic analytics and conversion tracking where appropriate",
      "Two revision rounds",
      "30-day post-launch guarantee",
      "Standard delivery in 2–4 weeks",
      "One language",
    ],
  },
  {
    sv: [
      "Upp till 10 sidor",
      "Allt som ingår i Webbpaket",
      "Redigering av utvalda delar av webbplatsen",
      "CMS-konfiguration och genomgång",
      "Två revisionsrundor",
      "30 dagars garanti efter lansering",
      "Normal leveranstid 2–4 veckor",
      "Ett språk",
    ],
    en: [
      "Up to 10 pages",
      "Everything included in Website Package",
      "Editing access for selected parts of the website",
      "CMS setup and handover",
      "Two revision rounds",
      "30-day post-launch guarantee",
      "Standard delivery in 2–4 weeks",
      "One language",
    ],
  },
];

const included = [
  ["Individuellt genomtänkt design", "Individually considered design"],
  ["Responsiv implementation", "Responsive implementation"],
  ["Teknisk SEO-grund", "Technical SEO foundation"],
  ["Prestanda och tillgänglighetsgrunder", "Performance and accessibility fundamentals"],
  ["Kontaktfunktion och två revisionsrundor", "Contact functionality and two revision rounds"],
  ["Publicering, överlämning och 30 dagars garanti", "Launch, handover and a 30-day guarantee"],
] as const;

const comparison = [
  ["Antal sidor", "Upp till 5", "Upp till 10", "Number of pages", "Up to 5", "Up to 10"],
  ["Unik design", "Ja", "Ja", "Unique design", "Yes", "Yes"],
  ["Responsiv design", "Ja", "Ja", "Responsive design", "Yes", "Yes"],
  ["Teknisk SEO", "Ja", "Ja", "Technical SEO", "Yes", "Yes"],
  ["Prestanda och tillgänglighet", "Ja", "Ja", "Performance and accessibility", "Yes", "Yes"],
  ["Kontaktformulär", "Ja", "Ja", "Contact form", "Yes", "Yes"],
  ["Redigerbart innehåll", "Nej", "Utvalda delar", "Editable content", "No", "Selected areas"],
  ["CMS-genomgång", "Nej", "Ja", "CMS handover", "No", "Yes"],
  ["Revisionsrundor", "2", "2", "Revision rounds", "2", "2"],
  ["30 dagars garanti", "Ja", "Ja", "30-day guarantee", "Yes", "Yes"],
] as const;

const exclusions = [
  ["Full textproduktion. Lätt hjälp med struktur och formulering ingår, men färdig copywriting prissätts separat.", "Full copywriting. Light help with structure and wording is included; finished copywriting is priced separately."],
  ["Större innehållsmigrering. Några bilder och textstycken går bra, men omfattande flytt från en gammal webbplats prissätts separat.", "Large content migrations. A few images and paragraphs are fine; substantial migration from an old website is priced separately."],
  ["Flera språk. Ett språk ingår och ytterligare språk hanteras som ett tillägg eller skräddarsytt projekt.", "Multiple languages. One language is included; additional languages are handled as an add-on or custom project."],
  ["Juridiska texter. Jag kan publicera material du lämnar, men ger inte juridisk rådgivning eller ansvarar för att formulera villkoren.", "Legal text. I can publish supplied material, but do not provide legal advice or take responsibility for drafting your terms."],
  ["Avancerad funktionalitet som bokning, e-handel, konton eller integrationer går via ett skräddarsytt projekt.", "Advanced functionality such as booking, e-commerce, accounts or integrations follows the custom-project path."],
  ["Löpande underhåll ingår inte obegränsat i webbplatspriset, men kan avtalas separat efter lansering.", "Ongoing maintenance is not included indefinitely in the website price, but can be arranged separately after launch."],
] as const;

const processSteps = [
  ["Välj och berätta", "Välj paket och beskriv verksamheten, målet och det material som redan finns.", "Choose and tell me", "Choose a package and describe your business, goals and available material."],
  ["Bekräfta och starta", "Vi bekräftar omfattningen. När 50 % är betalt bokas projektet in.", "Confirm and start", "We confirm the scope. Your project is scheduled once the first 50% is paid."],
  ["Design och revision", "Jag tar fram webbplatsen och vi går igenom två samlade revisionsrundor.", "Design and revision", "I create the website and we work through two consolidated revision rounds."],
  ["Godkänn och lansera", "Efter godkännande betalas resterande 50 %. Därefter publiceras webbplatsen och lämnas över.", "Approve and launch", "After approval, the remaining 50% is paid. The website is then published and handed over."],
] as const;

const faqs = [
  ["Är webbplatsen byggd från en färdig mall?", "Nej. Det fasta priset sätter omfattningen, men designen tas fram för ditt företag, ditt innehåll och din målgrupp.", "Is the website built from a ready-made template?", "No. The fixed price defines the scope, but the design is created for your business, content and audience."],
  ["Vad händer om jag behöver fler funktioner?", "Då planerar vi ett skräddarsytt projekt. Webbplatsplaneraren hjälper dig att beskriva behovet och skapa en tydlig första brief.", "What if I need more functionality?", "We then plan a custom project. The Website Planner helps you describe your needs and create a clear initial brief."],
  ["Måste jag redan ha domän eller webbhotell?", "Nej. Jag hjälper dig att välja, sätta upp och koppla tjänsterna i konton som du själv äger. Kostnaden för tjänsterna betalas separat.", "Do I need a domain or hosting already?", "No. I help you choose, set up and connect the services in accounts you own. Service fees are paid separately."],
  ["Kan jag ändra webbplatsen själv?", "I Webbpaket Plus får du redigera utvalda delar via CMS. Webbpaket kan byggas ut med detta efter separat överenskommelse.", "Can I edit the website myself?", "Website Package Plus includes CMS access for selected areas. This can be added to Website Package by separate agreement."],
  ["Vad behöver jag skicka innan projektet börjar?", "Befintliga texter, bilder och eventuell grafisk profil hjälper. Du får rimlig vägledning kring struktur och vilket material som behövs.", "What do I need to send before the project starts?", "Existing text, images and visual identity material help. You receive reasonable guidance on structure and the material needed."],
  ["Vad innebär två revisionsrundor?", "Varje runda samlar din återkoppling i ett tydligt underlag. Det är två samlade genomgångar, inte två enskilda småändringar.", "What do two revision rounds mean?", "Each round groups your feedback into one clear set. They are two consolidated reviews, not two individual small edits."],
  ["Vad händer efter lanseringen?", "Du får överlämning och 30 dagars garanti. Fel rättas som garantiärenden och upp till 60 minuter ingår för mindre justeringar. Fortsatt arbete avtalas separat.", "What happens after launch?", "You receive a handover and 30-day guarantee. Defects are handled as guarantee matters, with up to 60 minutes for minor adjustments. Further work is agreed separately."],
] as const;

export default function PackagePage() {
  const { lang } = useLanguage();
  const sv = lang === "sv";

  return (
    <main className="page-shell inner-page package-page">
      <section className="package-hero">
        <Eyebrow>{sv ? "Webbpaket med fast pris" : "Fixed-price website packages"}</Eyebrow>
        <h1>{sv ? "En bra webbplats ska inte vara svår att köpa" : "A good website should not be difficult to buy"}</h1>
        <p>
          {sv
            ? "Två tydliga paket för småföretag som vill komma igång med en professionell webbplats utan otydliga offerter. Du vet vad som ingår, vad det kostar och hur projektet går till."
            : "Two clear packages for small businesses that want a professional website without an unclear quotation process. You know what is included, what it costs and how the project works."}
        </p>
      </section>

      <section className="package-grid" aria-label={sv ? "Webbpaket" : "Website packages"}>
        {WEBSITE_PACKAGES.map((item, index) => (
          <article className={`package-card${index === 1 ? " package-card-plus" : ""}`} key={item.id}>
            <div className="package-card-heading">
              <p className="package-card-kicker">{index === 0 ? (sv ? "För en tydlig företagswebbplats" : "For a clear business website") : (sv ? "För mer innehåll och egen redigering" : "For more content and editing access")}</p>
              <h2>{sv ? item.name.sv : item.name.en}</h2>
              <p className="package-card-description">{index === 0 ? (sv ? "För mindre företag som vill ha en komplett, professionell webbplats utan onödig komplexitet." : "For small businesses that want a complete, professional website without unnecessary complexity.") : (sv ? "För större webbplatser eller verksamheter som vill kunna uppdatera utvalt innehåll själva." : "For larger websites or businesses that want to update selected content themselves.")}</p>
              <p className="package-price"><strong>{item.priceExVat}</strong> <span>{sv ? "exkl. moms" : "excl. VAT"}</span></p>
              <p className="package-vat-price">{item.priceIncVat} {sv ? "inkl. moms" : "incl. VAT"}</p>
            </div>
            <ul className="package-feature-list">
              {(sv ? packageFeatures[index].sv : packageFeatures[index].en).map((feature) => <li key={feature}>{feature}</li>)}
            </ul>
            <Link className="button button-primary" href={item.contactHref}>
              {sv ? `Välj ${item.name.sv}` : `Choose ${item.name.en}`} <Arrow />
            </Link>
          </article>
        ))}
      </section>

      <section className="package-principle package-section">
        <Eyebrow>{sv ? "Tydlig omfattning" : "A clearly defined scope"}</Eyebrow>
        <h2>{sv ? "Fast pris. Inte en färdig mall." : "Fixed price. Not a ready-made template."}</h2>
        <p>{sv ? "Det fasta priset definierar omfattning, funktioner och en förutsägbar kostnad. Det betyder inte återanvänd visuell design eller samma layout för varje kund. Varje webbplats formas kring företaget, innehållet, målgruppen och målen. Samma fasta pris. Inte samma webbplats." : "The fixed price defines the scope, functionality and a predictable cost. It does not mean recycled visual design or the same layout for every client. Every website is shaped around the business, its content, audience and goals. The same fixed price. Not the same website."}</p>
      </section>

      <section className="package-section" aria-labelledby="included-title">
        <div className="package-section-heading">
          <Eyebrow>{sv ? "Alltid med" : "Always included"}</Eyebrow>
          <h2 id="included-title">{sv ? "Det här ingår i båda paketen" : "Included in both packages"}</h2>
        </div>
        <ul className="package-included-grid">
          {included.map(([swedish, english]) => <li key={swedish}>{sv ? swedish : english}</li>)}
        </ul>
      </section>

      <section className="package-section" aria-labelledby="comparison-title">
        <div className="package-section-heading">
          <Eyebrow>{sv ? "Jämför" : "Compare"}</Eyebrow>
          <h2 id="comparison-title">{sv ? "Vilket paket passar?" : "Which package is right for you?"}</h2>
        </div>
        <div className="package-table-wrap">
          <table className="package-table">
            <thead><tr><th scope="col">{sv ? "Omfattning" : "Scope"}</th><th scope="col">{sv ? "Webbpaket" : "Website Package"}</th><th scope="col">{sv ? "Webbpaket Plus" : "Website Package Plus"}</th></tr></thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row[0]}>
                  <th scope="row">{sv ? row[0] : row[3]}</th>
                  <td data-package={sv ? "Webbpaket" : "Website Package"}>{sv ? row[1] : row[4]}</td>
                  <td data-package={sv ? "Webbpaket Plus" : "Website Package Plus"}>{sv ? row[2] : row[5]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="package-section" aria-labelledby="outside-title">
        <div className="package-section-heading">
          <Eyebrow>{sv ? "Utanför paketen" : "Outside the packages"}</Eyebrow>
          <h2 id="outside-title">{sv ? "Bra att känna till" : "Good to know"}</h2>
          <p>{sv ? "Följande kräver en separat bedömning och offert." : "The following require a separate assessment and quotation."}</p>
        </div>
        <ul className="package-exclusion-grid">
          {exclusions.map(([swedish, english]) => <li key={swedish}>{sv ? swedish : english}</li>)}
        </ul>
      </section>

      <section className="package-commercial-grid package-section" aria-label={sv ? "Villkor" : "Terms"}>
        <article><span>2–4</span><h2>{sv ? "Veckors normal leveranstid" : "Weeks standard delivery"}</h2><p>{sv ? "Tiden räknas från projektstart och förutsätter att material och återkoppling lämnas enligt plan." : "Timing starts at project kickoff and assumes materials and feedback are provided as agreed."}</p></article>
        <article><span>50/50</span><h2>{sv ? "Enkel betalningsplan" : "Simple payment plan"}</h2><p>{sv ? "50 % betalas via faktura vid projektstart och resterande 50 % när webbplatsen är färdig och godkänd för lansering." : "50% is invoiced at project start and the remaining 50% when the website is finished and approved for launch."}</p></article>
        <article><span>1–2</span><h2>{sv ? "Veckor med Express" : "Weeks with Express"}</h2><p>{sv ? "Express kan erbjudas mot +25 %, i mån av tillgänglighet och att allt material finns klart." : "Express may be available for +25%, subject to availability and all materials being ready."}</p></article>
      </section>

      <section className="package-guarantee package-section" aria-labelledby="guarantee-title">
        <div className="package-section-heading"><Eyebrow>{sv ? "Efter lansering" : "After launch"}</Eyebrow><h2 id="guarantee-title">{sv ? "30 dagars lanseringsgaranti" : "30-day launch guarantee"}</h2></div>
        <div className="package-guarantee-grid">
          <article><h3>{sv ? "Om något inte fungerar" : "If something does not work"}</h3><p>{sv ? "Om något jag har byggt inte fungerar enligt den bekräftade leveransen rättar jag det. Det räknas som ett garantiärende och förbrukar inte tiden för mindre justeringar." : "If something I built does not work according to the confirmed delivery, I correct it. This is treated as a guarantee matter and does not use the minor-adjustment allowance."}</p></article>
          <article><h3>{sv ? "Mindre justeringar" : "Minor adjustments"}</h3><p>{sv ? "Under de första 30 dagarna ingår upp till 60 minuter totalt för exempelvis en mindre textändring, bildbyte, avståndsjustering eller visuell detalj. Nya sidor, funktioner, omdesign, större innehållsarbete och integrationer ingår inte." : "During the first 30 days, up to 60 minutes total is included for a small wording change, image replacement, spacing tweak or visual detail. New pages, functionality, redesigns, major content work and integrations are not included."}</p></article>
        </div>
      </section>

      <section className="package-section" aria-labelledby="process-title">
        <div className="package-section-heading">
          <Eyebrow>{sv ? "Så går det till" : "How it works"}</Eyebrow>
          <h2 id="process-title">{sv ? "Från val till lansering" : "From choice to launch"}</h2>
        </div>
        <ol className="package-process-list">
          {processSteps.map(([svTitle, svCopy, enTitle, enCopy], index) => <li key={svTitle}><span>0{index + 1}</span><h3>{sv ? svTitle : enTitle}</h3><p>{sv ? svCopy : enCopy}</p></li>)}
        </ol>
      </section>

      <section className="package-custom-cta">
        <div>
          <Eyebrow>{sv ? "Behöver du något utöver paketen?" : "Need something beyond the packages?"}</Eyebrow>
          <h2>{sv ? "Planera ett skräddarsytt projekt" : "Plan a custom project"}</h2>
          <p>{sv ? "Om de fasta paketen inte passar kan du planera ett skräddarsytt projekt för exempelvis e-handel, bokning, konton, integrationer, avancerade animationer, flera språk, större webbplatser eller webbappar." : "If the fixed packages do not fit, you can plan a custom project for e-commerce, booking, accounts, integrations, advanced animation, multiple languages, larger websites or web apps."}</p>
        </div>
        <Link className="button button-outline" href="/verktyg">{sv ? "Planera ett skräddarsytt projekt" : "Plan a custom project"} <Arrow /></Link>
      </section>

      <section className="package-section package-faq" aria-labelledby="faq-title">
        <div className="package-section-heading"><Eyebrow>FAQ</Eyebrow><h2 id="faq-title">{sv ? "Vanliga frågor" : "Frequently asked questions"}</h2></div>
        <div className="package-faq-list">
          {faqs.map(([svQuestion, svAnswer, enQuestion, enAnswer]) => <details key={svQuestion}><summary>{sv ? svQuestion : enQuestion}</summary><p>{sv ? svAnswer : enAnswer}</p></details>)}
        </div>
      </section>
    </main>
  );
}
