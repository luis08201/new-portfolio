const STORAGE_KEY = "lang";
export const LANGS = ["es", "en"];

const en = {
  "meta.title": "Luis Selva · Webflow Developer & Frontend Specialist",
  "meta.description":
    "Luis Selva, Webflow and frontend developer. Responsive websites with CMS, integrations, GSAP animations and QA, for selected part-time, asynchronous projects.",
  skip: "Skip to content",
  "nav.label": "Main",
  "nav.work": "Work",
  "nav.services": "Services",
  "nav.practice": "Practice",
  "nav.about": "About",
  "nav.cta": "Let's work together",
  "hero.eyebrow": "Webflow Developer · Frontend Specialist",
  "hero.script": "Hi, I'm Luis,",
  "hero.title": "Webflow <em>developer</em>",
  "hero.small":
    "I build responsive, scalable Webflow websites for growing teams: CMS, integrations, animations and QA.",
  "hero.cta": "Let's work together",
  "hero.cta2": "View selected work",
  "badge.label": "Available for part-time, asynchronous projects. Get in touch",
  "badge.ring": "Part-time · Remote · Async ·",
  "hero.quote": "Available for selected part-time and asynchronous projects.",
  "hero.fact1": "Years of experience",
  "hero.fact2": "Published challenges",
  "trust.label": "Tools and platforms",
  "trust.text": "I build in Webflow and Framer, and practice with real-world challenges",
  "work.script": "Selected work",
  "work.title": "Webflow, CMS and interactions, <em>done right</em>",
  "work.lead":
    "Personal projects where I handled both design and development: CMS structure, components, animations and responsive QA.",
  "work.cta": "Let's build something together",
  "works.label": "Projects, scroll horizontally",
  "work.tagsLabel": "Technologies",
  "work.forja.tag": "Case study · ISIC redesign",
  "work.forja.text":
    "I redesigned my 2021 ISIC project as a fictional technical institute: a catalog filtered with Finsweet Attributes, course pages and an enrollment form, in Spanish and English.",
  "work.burger.tag": "Webflow template · 2026",
  "work.burger.text":
    "I designed and built a Webflow template for burger restaurants: CMS collections for the menu and blog, reusable components, GSAP interactions and QA across every breakpoint.",
  "work.burgerFramer.tag": "Framer version · 2026",
  "work.burgerFramer.text":
    "The same template rebuilt in Framer: a menu catalog with an “Order now” button, a blog powered by Framer CMS and the burger that comes apart as you scroll.",
  "link.browser": "Preview in browser",
  "link.webflow": "Preview in Webflow",
  "link.framer": "Preview in Framer",
  "services.script": "Services",
  "services.title": "Focused help for <em>Webflow projects</em>",
  "services.note": "Open to selected part-time projects with flexible, asynchronous collaboration.",
  "services.s1.title": "Webflow development and CMS implementation",
  "services.s1.text":
    "I bring designs into Webflow with tidy classes, reusable components and CMS collections that are easy to edit.",
  "services.s2.title": "Responsive fixes and website QA",
  "services.s2.text":
    "I check every breakpoint, link, form and accessibility detail, and fix what breaks before launch.",
  "services.s3.title": "JavaScript, GSAP and frontend enhancements",
  "services.s3.text":
    "Scroll animations, filters, sliders and interaction details that Webflow doesn't handle on its own.",
  "services.s4.title": "Form, CMS and third-party integrations",
  "services.s4.text":
    "Connected forms, Finsweet Attributes, analytics scripts and external tools, properly integrated.",
  "process.title": "How I work: written and asynchronous",
  "process.s1": "Written brief",
  "process.s2": "Estimate",
  "process.s3": "Implementation",
  "process.s4": "QA",
  "process.s5": "Documented handoff",
  "practice.script": "Coding practice",
  "practice.title": "Frontend experiments",
  "practice.text":
    "{total} Frontend Mentor challenges published between 2021 and 2024, devChallenges challenges and course projects, plus the Burgerlicious template in Webflow and Framer. They're exercises to sharpen my layout skills, not client projects.",
  "filters.label": "Filter challenges by level or platform",
  "lvl.todos": "All",
  "lvl.premium": "Premium",
  "lvl.avanzado": "Advanced",
  "lvl.multi": "Advanced · multi-page",
  "lvl.intermedio": "Intermediate",
  "lvl.junior": "Junior",
  "lvl.newbie": "Newbie",
  "lvl.otros": "Other",
  "lvl.devchallenges": "devChallenges",
  "lvl.curso": "Course project",
  "title.calc": "Calculator",
  "title.fylo": "Fylo (dark theme)",
  "title.dropdown": "Dropdown Navigation",
  "title.signup": "Sign-up Form",
  "title.chat": "Chat App (CSS illustration)",
  "about.script": "About me",
  "about.statement":
    "I turn detailed designs and technical requirements into <em>maintainable, well-documented websites.</em>",
  "about.body":
    "I'm a Webflow and frontend developer with over four years of experience contributing to agency website projects. I work on responsive implementations, CMS structures, JavaScript enhancements, integrations and quality assurance, with clear documentation and reliable asynchronous communication.",
  "about.fact1": "Years on web projects",
  "about.fact2": "Frontend Mentor challenges",
  "about.fact3": "First web design course",
  "contact.script": "Let's talk,",
  "contact.title": "Need help with a <em>Webflow project?</em>",
  "contact.text":
    "Send me the details and I'll get back to you by email with next steps. I work in writing and asynchronously, so the clearer the scope, timeline and budget, the better.",
  "contact.note": "Open to selected part-time projects with flexible, asynchronous collaboration.",
  "form.name": "Name",
  "form.email": "Email",
  "form.timeline": "Timeline <span class=\"field__optional\">(optional)</span>",
  "form.budget": "Budget <span class=\"field__optional\">(optional)</span>",
  "form.choose": "Choose an option",
  "form.timeline.1": "1–2 weeks",
  "form.timeline.2": "2–4 weeks",
  "form.timeline.3": "1–2 months",
  "form.timeline.4": "Flexible",
  "form.budget.1": "Under $500",
  "form.budget.tbd": "To be defined",
  "form.message": "Message",
  "form.name.placeholder": "Your name",
  "form.email.placeholder": "you@email.com",
  "form.message.placeholder": "Scope, number of pages, link to the design or site…",
  "form.send": "Send",
  "footer.credit": "Designed and coded by Luis Selva",
  "footer.cta": "Webflow project? Get in touch →",
  "footer.top": "Back to top ↑",
  "lang.label": "Language",
};

// Strings that only exist in JavaScript, so there is no markup to read the Spanish from.
const messages = {
  es: {
    "error.name": "Escribe tu nombre.",
    "error.email": "Escribe un correo válido.",
    "error.message": "Escribe un mensaje.",
    "form.send": "Enviar",
    "form.sending": "Enviando…",
    "form.ok": "Mensaje enviado. Te responderé a ese correo.",
    "form.fail": "No se pudo enviar. Puedes escribirme por GitHub o por Twitter.",
    "more.all": "Ver los {total} retos",
    "more.less": "Ver menos retos",
  },
  en: {
    "error.name": "Please enter your name.",
    "error.email": "Please enter a valid email.",
    "error.message": "Please write a message.",
    "form.send": "Send",
    "form.sending": "Sending…",
    "form.ok": "Message sent. I'll reply to that email.",
    "form.fail": "It couldn't be sent. You can reach me on GitHub or Twitter.",
    "more.all": "See all {total} challenges",
    "more.less": "Show fewer challenges",
  },
};

const description = document.querySelector('meta[name="description"]');
const total = document.querySelector("[data-count]")?.dataset.count ?? "";

// The markup is written in Spanish, so it is the Spanish dictionary.
const es = {
  "meta.title": document.title,
  "meta.description": description.content,
};
for (const el of document.querySelectorAll("[data-i18n]")) {
  es[el.dataset.i18n] ??= el.innerHTML;
}
for (const el of document.querySelectorAll("[data-i18n-aria]")) {
  es[el.dataset.i18nAria] ??= el.getAttribute("aria-label");
}
for (const el of document.querySelectorAll("[data-i18n-placeholder]")) {
  es[el.dataset.i18nPlaceholder] ??= el.getAttribute("placeholder");
}

const dictionaries = { es, en };
let current = "es";

const fill = (text) => text.replaceAll("{total}", total);

export function t(key) {
  return fill(messages[current][key] ?? messages.es[key] ?? key);
}

export function getLanguage() {
  return current;
}

export function initialLanguage() {
  const fromUrl = new URLSearchParams(location.search).get("lang");
  if (LANGS.includes(fromUrl)) return fromUrl;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (LANGS.includes(saved)) return saved;
  } catch {
    // Storage can be blocked; fall back to the visitor's region.
  }
  return isLatinAmerica() ? "es" : "en";
}

// Latin America is detected from the browser's time zone: it needs no network
// request, so the page never shows one language and then flips to the other.
const LATAM_ZONES = new Set(
  [
    "Mexico_City", "Cancun", "Merida", "Monterrey", "Matamoros", "Chihuahua", "Ciudad_Juarez",
    "Ojinaga", "Mazatlan", "Bahia_Banderas", "Hermosillo", "Tijuana", "Ensenada", "Santa_Isabel",
    "Guatemala", "Belize", "El_Salvador", "Tegucigalpa", "Managua", "Costa_Rica", "Panama",
    "Havana", "Santo_Domingo", "Puerto_Rico",
    "Bogota", "Caracas", "Guayaquil", "Lima", "La_Paz", "Santiago", "Punta_Arenas", "Asuncion",
    "Montevideo", "Buenos_Aires", "Cordoba", "Catamarca", "Jujuy", "Mendoza", "Rosario",
    "Sao_Paulo", "Bahia", "Fortaleza", "Recife", "Maceio", "Belem", "Manaus", "Cuiaba",
    "Campo_Grande", "Porto_Velho", "Boa_Vista", "Rio_Branco", "Eirunepe", "Araguaina",
    "Santarem", "Noronha",
  ].map((city) => `America/${city}`),
);
const LATAM_LEGACY = ["Mexico/", "Chile/", "Brazil/", "Pacific/Easter", "Pacific/Galapagos", "Cuba"];
const LATAM_REGIONS = new Set(
  "MX GT BZ SV HN NI CR PA CU DO PR CO VE EC PE BO CL PY UY AR BR 419".split(" "),
);

function isLatinAmerica() {
  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
  if (zone && zone !== "UTC" && zone !== "Etc/UTC") {
    return (
      LATAM_ZONES.has(zone) ||
      zone.startsWith("America/Argentina/") ||
      LATAM_LEGACY.some((prefix) => zone.startsWith(prefix))
    );
  }
  // Without a usable time zone, the region in the browser language (es-NI, pt-BR…) decides.
  return (navigator.languages ?? [navigator.language]).some((tag) =>
    LATAM_REGIONS.has(tag.split("-")[1]?.toUpperCase()),
  );
}

export function applyLanguage(lang) {
  current = LANGS.includes(lang) ? lang : "es";
  const dict = dictionaries[current];
  const text = (key) => fill(dict[key] ?? es[key]);

  document.documentElement.lang = current;
  document.title = text("meta.title");
  description.content = text("meta.description");

  for (const el of document.querySelectorAll("[data-i18n]")) {
    const html = text(el.dataset.i18n);
    if (el.innerHTML !== html) el.innerHTML = html;
  }
  for (const el of document.querySelectorAll("[data-i18n-aria]")) {
    el.setAttribute("aria-label", text(el.dataset.i18nAria));
  }
  for (const el of document.querySelectorAll("[data-i18n-placeholder]")) {
    el.setAttribute("placeholder", text(el.dataset.i18nPlaceholder));
  }
  for (const button of document.querySelectorAll("[data-lang]")) {
    button.setAttribute("aria-pressed", String(button.dataset.lang === current));
  }
}

export function saveLanguage(lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // Not saving the choice is fine.
  }
}
