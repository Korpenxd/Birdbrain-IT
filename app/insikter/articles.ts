export type LocalizedText = {
  sv: string;
  en: string;
};

export type InsightSection = {
  id: string;
  title: LocalizedText;
  paragraphs: LocalizedText[];
  bullets?: LocalizedText[];
};

export type InsightArticle = {
  slug: string;
  number: string;
  accent: "blue" | "purple" | "pink";
  category: LocalizedText;
  title: LocalizedText;
  excerpt: LocalizedText;
  date: LocalizedText;
  readingTime: LocalizedText;
  image: string;
  intro: LocalizedText;
  quote: LocalizedText;
  takeawayTitle: LocalizedText;
  takeaway: LocalizedText;
  sections: InsightSection[];
};

export const insightArticles: InsightArticle[] = [
  {
    slug: "5-saker-innan-ett-nytt-projekt",
    number: "01",
    accent: "blue",
    category: { sv: "Webbutveckling", en: "Web development" },
    title: {
      sv: "5 saker jag tänker på innan jag börjar ett nytt projekt",
      en: "5 things I consider before starting a new project",
    },
    excerpt: {
      sv: "En checklista som hjälper mig att starta rätt från början.",
      en: "A practical checklist that helps every project start on solid ground.",
    },
    date: { sv: "12 maj 2026", en: "May 12, 2026" },
    readingTime: { sv: "6 min läsning", en: "6 min read" },
    image: "/images/pixelmani.webp",
    intro: {
      sv: "De bästa projekten börjar sällan med kod. De börjar med att rätt frågor får ta plats innan lösningen bestäms.",
      en: "The strongest projects rarely begin with code. They begin by making room for the right questions before deciding on a solution.",
    },
    quote: {
      sv: "Tydlighet i början sparar nästan alltid mer tid än hastighet i slutet.",
      en: "Clarity at the beginning almost always saves more time than speed at the end.",
    },
    takeawayTitle: { sv: "Min enkla tumregel", en: "My simple rule" },
    takeaway: {
      sv: "Om jag inte kan beskriva problemet, användaren och det viktigaste resultatet på tre korta rader är projektet inte redo att byggas ännu.",
      en: "If I cannot describe the problem, the user and the most important outcome in three short lines, the project is not ready to build yet.",
    },
    sections: [
      {
        id: "problemet",
        title: { sv: "1. Vilket problem löser vi?", en: "1. What problem are we solving?" },
        paragraphs: [
          {
            sv: "En idé kan låta tydlig och ändå gömma flera olika problem. Jag försöker formulera problemet utan att nämna den tänkta lösningen. Då blir det lättare att se om en webbplats, en app eller något mycket enklare faktiskt är rätt väg.",
            en: "An idea can sound clear while hiding several different problems. I try to describe the problem without mentioning the intended solution. That makes it easier to see whether a website, an app or something much simpler is actually the right path.",
          },
        ],
      },
      {
        id: "anvandaren",
        title: { sv: "2. Vem ska använda det?", en: "2. Who will use it?" },
        paragraphs: [
          {
            sv: "“Alla” är sällan ett användbart svar. Jag vill förstå vem som kommer först, vad personen redan vet och i vilket läge lösningen används. Det påverkar både språk, struktur och vilka funktioner som behöver prioriteras.",
            en: "“Everyone” is rarely a useful answer. I want to understand who comes first, what that person already knows and the situation in which the solution is used. That shapes the language, structure and which features deserve priority.",
          },
        ],
      },
      {
        id: "omfattningen",
        title: { sv: "3. Vad är minsta värdefulla version?", en: "3. What is the smallest valuable version?" },
        paragraphs: [
          {
            sv: "Jag letar efter den minsta version som kan skapa ett riktigt resultat. Inte en halvfärdig produkt, utan en fokuserad första version som går att använda, mäta och lära sig av.",
            en: "I look for the smallest version capable of creating a real outcome. Not a half-finished product, but a focused first version that can be used, measured and learned from.",
          },
        ],
        bullets: [
          { sv: "En tydlig huvuduppgift", en: "One clear primary task" },
          { sv: "Så få beroenden som möjligt", en: "As few dependencies as possible" },
          { sv: "En naturlig väg att bygga vidare", en: "A natural path for future growth" },
        ],
      },
      {
        id: "resultatet",
        title: { sv: "4. Hur ser ett bra resultat ut?", en: "4. What does a good result look like?" },
        paragraphs: [
          {
            sv: "Innan arbetet börjar behöver vi veta vad som ska bli bättre. Det kan vara fler relevanta förfrågningar, mindre manuellt arbete eller att en besökare snabbare förstår erbjudandet. Ett konkret mål hjälper alla beslut längs vägen.",
            en: "Before work begins, we need to know what should improve. It might be more relevant enquiries, less manual work or helping visitors understand the offer faster. A concrete goal guides every decision along the way.",
          },
        ],
      },
      {
        id: "ramarna",
        title: { sv: "5. Vilka ramar måste vi respektera?", en: "5. Which constraints must we respect?" },
        paragraphs: [
          {
            sv: "Tid, budget, befintliga system, innehåll och interna arbetssätt är inte tråkiga detaljer. De är en del av designmaterialet. När ramarna är synliga från början går det att göra smartare prioriteringar utan sena överraskningar.",
            en: "Time, budget, existing systems, content and internal workflows are not boring details. They are part of the design material. When constraints are visible from the start, better priorities can be made without late surprises.",
          },
        ],
      },
    ],
  },
  {
    slug: "darfor-enkel-design-ar-bast",
    number: "02",
    accent: "purple",
    category: { sv: "Design", en: "Design" },
    title: {
      sv: "Därför är enkel design oftast den bästa",
      en: "Why simple design is usually the strongest",
    },
    excerpt: {
      sv: "Om värdet av fokus, hierarki och att ta bort istället för att lägga till.",
      en: "On focus, hierarchy and the value of removing instead of adding.",
    },
    date: { sv: "2 apr. 2026", en: "April 2, 2026" },
    readingTime: { sv: "5 min läsning", en: "5 min read" },
    image: "/images/pixelmagi.webp",
    intro: {
      sv: "Enkel design handlar inte om att göra mindre för sakens skull. Den handlar om att ge det viktiga mer utrymme och göra nästa steg självklart.",
      en: "Simple design is not about doing less for its own sake. It is about giving important things more room and making the next step obvious.",
    },
    quote: {
      sv: "När allt försöker få uppmärksamhet blir ingenting särskilt viktigt.",
      en: "When everything asks for attention, nothing feels particularly important.",
    },
    takeawayTitle: { sv: "Ett snabbt designtest", en: "A quick design test" },
    takeaway: {
      sv: "Titta på sidan i fem sekunder och vänd sedan bort blicken. Kan du fortfarande säga vad sidan handlar om och vad du förväntades göra? Då fungerar hierarkin.",
      en: "Look at the page for five seconds, then look away. Can you still say what it was about and what you were expected to do? Then the hierarchy works.",
    },
    sections: [
      {
        id: "fokus",
        title: { sv: "Fokus före dekoration", en: "Focus before decoration" },
        paragraphs: [
          {
            sv: "Visuella effekter kan skapa personlighet, men de behöver stödja innehållet. Jag börjar därför med frågan: vad ska besökaren förstå först? När svaret är tydligt kan färg, rörelse och form hjälpa till att förstärka det.",
            en: "Visual effects can create personality, but they need to support the content. I start with one question: what should the visitor understand first? Once the answer is clear, colour, motion and form can reinforce it.",
          },
        ],
      },
      {
        id: "hierarki",
        title: { sv: "Hierarki skapar lugn", en: "Hierarchy creates calm" },
        paragraphs: [
          {
            sv: "Bra hierarki gör att ögat slipper förhandla med varje element. Rubrik, stödtext och handling ska ha olika tyngd. Skillnaden behöver vara tillräckligt tydlig för att fungera även när någon skummar sidan snabbt.",
            en: "Good hierarchy means the eye does not have to negotiate with every element. Heading, supporting copy and action should carry different weight. The difference must remain clear even when someone scans quickly.",
          },
        ],
        bullets: [
          { sv: "En primär handling per vy", en: "One primary action per view" },
          { sv: "Konsekventa textnivåer", en: "Consistent text levels" },
          { sv: "Luft som skiljer innehåll åt", en: "Space that separates content" },
        ],
      },
      {
        id: "ta-bort",
        title: { sv: "Att ta bort är också design", en: "Removing is also design" },
        paragraphs: [
          {
            sv: "Varje extra val har ett pris. Om ett element inte hjälper förståelsen, förtroendet eller nästa steg behöver det motivera sin plats. Ofta blir designen tydligare när två halvbra idéer ersätts av en stark.",
            en: "Every extra choice has a cost. If an element does not help understanding, trust or the next step, it needs to justify its place. Design often becomes clearer when two half-good ideas are replaced by one strong one.",
          },
        ],
      },
      {
        id: "personlighet",
        title: { sv: "Enkelt behöver inte vara opersonligt", en: "Simple does not mean impersonal" },
        paragraphs: [
          {
            sv: "Personlighet kan leva i typografi, rytm, ton och några väl valda detaljer. När grunden är tydlig får de detaljerna större effekt. Enkelheten blir scenen, inte slutmålet.",
            en: "Personality can live in typography, rhythm, tone and a few deliberate details. When the foundation is clear, those details have more impact. Simplicity becomes the stage, not the end goal.",
          },
        ],
      },
    ],
  },
  {
    slug: "driva-eget-som-utvecklare",
    number: "03",
    accent: "pink",
    category: { sv: "Entreprenörskap", en: "Entrepreneurship" },
    title: {
      sv: "Att driva eget som utvecklare",
      en: "Building a small business as a developer",
    },
    excerpt: {
      sv: "Mina tankar om frihet, ansvar och att bygga något eget.",
      en: "Thoughts on freedom, responsibility and building something of your own.",
    },
    date: { sv: "18 mars 2026", en: "March 18, 2026" },
    readingTime: { sv: "7 min läsning", en: "7 min read" },
    image: "/images/btc-backtest-hub.webp",
    intro: {
      sv: "Att driva eget gav mig friheten att välja vad jag bygger. Det gav mig också ansvaret för allt runt omkring själva byggandet.",
      en: "Running my own business gave me the freedom to choose what I build. It also gave me responsibility for everything surrounding the building itself.",
    },
    quote: {
      sv: "Det viktigaste jag bygger är inte bara produkten, utan förtroendet runt den.",
      en: "The most important thing I build is not only the product, but the trust surrounding it.",
    },
    takeawayTitle: { sv: "Det jag önskar att jag visste", en: "What I wish I knew" },
    takeaway: {
      sv: "Teknisk skicklighet öppnar dörren. Tydlig kommunikation, rimliga förväntningar och ett lugnt arbetssätt är det som gör att människor vill fortsätta samarbeta.",
      en: "Technical skill opens the door. Clear communication, realistic expectations and a calm way of working are what make people want to continue collaborating.",
    },
    sections: [
      {
        id: "frihet",
        title: { sv: "Frihet behöver struktur", en: "Freedom needs structure" },
        paragraphs: [
          {
            sv: "Friheten att styra sin tid fungerar bäst när det finns tydliga ramar. Jag planerar veckan runt fokuserat arbete, kunddialog och administration. Annars äter de små uppgifterna snabbt upp tiden för det som faktiskt skapar värde.",
            en: "The freedom to manage your own time works best with clear boundaries. I plan the week around focused work, client conversations and administration. Otherwise, small tasks quickly consume the time meant for valuable work.",
          },
        ],
      },
      {
        id: "kommunikation",
        title: { sv: "Kommunikation är en del av leveransen", en: "Communication is part of the delivery" },
        paragraphs: [
          {
            sv: "En kund ska inte behöva tolka tystnad. Korta, tydliga uppdateringar gör arbetet tryggare och ger bättre feedback. Det minskar också risken att två personer bär på olika bilder av samma projekt.",
            en: "A client should never have to interpret silence. Short, clear updates make the work feel safer and produce better feedback. They also reduce the risk of two people carrying different pictures of the same project.",
          },
        ],
      },
      {
        id: "vardet",
        title: { sv: "Sälj värdet, inte tekniken", en: "Sell the value, not the technology" },
        paragraphs: [
          {
            sv: "Tekniska val är viktiga, men kunden köper sällan ett ramverk eller en databas. Kunden köper mindre friktion, fler möjligheter eller ett problem som försvinner. När samtalet börjar där blir både omfattning och prioriteringar tydligare.",
            en: "Technical choices matter, but a client rarely buys a framework or database. They buy less friction, more opportunity or a problem that disappears. Starting the conversation there makes scope and priorities clearer.",
          },
        ],
        bullets: [
          { sv: "Beskriv resultatet med vanligt språk", en: "Describe the result in plain language" },
          { sv: "Var tydlig med vad som inte ingår", en: "Be clear about what is not included" },
          { sv: "Knyt beslut till kundens mål", en: "Connect decisions to the client’s goals" },
        ],
      },
      {
        id: "langsiktigt",
        title: { sv: "Bygg för relationen efter leverans", en: "Build for the relationship after launch" },
        paragraphs: [
          {
            sv: "En lyckad lansering är början på användningen, inte slutet på projektets värde. Dokumentation, rimlig överlämning och en tydlig väg till framtida stöd gör lösningen lättare att äga och samarbetet lättare att återvända till.",
            en: "A successful launch is the beginning of use, not the end of a project’s value. Documentation, a thoughtful handover and a clear path to future support make the solution easier to own and the relationship easier to return to.",
          },
        ],
      },
    ],
  },
];

export function getInsightArticle(slug: string) {
  const article = insightArticles.find((item) => item.slug === slug);

  if (!article) {
    throw new Error(`Unknown insight article: ${slug}`);
  }

  return article;
}
