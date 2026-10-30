const STORAGE_KEY = "lang";
export const LANGS = ["es", "en"];

const en = {
  "meta.title": "Luis Selva · Web developer",
  "meta.description":
    "Luis Selva, web developer in Nicaragua. Layouts and interfaces that make sense at first glance.",
  skip: "Skip to content",
  "nav.label": "Main",
  "nav.work": "Work",
  "nav.practice": "Practice",
  "nav.about": "About",
  "nav.cta": "Get in touch",
  "hero.script": "Hi, I'm Luis,",
  "hero.title": "Web <em>developer</em>",
  "hero.small":
    "I build pages in HTML, CSS and JavaScript that load fast and read well on any screen.",
  "badge.label": "Available for new projects. Get in touch",
  "badge.ring": "Available · Frontend · Nicaragua ·",
  "hero.quote": "A good interface makes sense at first glance.",
  "hero.fact1": "Published challenges",
  "hero.fact2": "First course",
  "trust.label": "Where I've practiced",
  "trust.text": "Platforms where I practice with real-world challenges",
  "work.script": "Behind the code",
  "work.title": "Clear pages that make every visit <em>simpler</em>",
  "work.lead": "I focus on clean, intuitive interfaces, built with care from the very first line of HTML.",
  "work.cta": "Let's build something together",
  "works.label": "Projects, scroll horizontally",
  "work.sfs.tag": "devChallenges challenge · 2025",
  "work.sfs.text":
    "A feature section with three cards on a dark background. Layout practice, not client work.",
  "work.isic.tag": "Course project · ISIC",
  "work.isic.text":
    "Final project of the web design course I took in 2014, rebuilt in 2021 with everything I'd learned since.",
  "work.sydicom.tag": "Course project · Unitec",
  "work.sydicom.text": "Final project of Unitec's web design course, rebuilt in 2021.",
  "link.live": "Live site",
  "practice.script": "Practice",
  "practice.title": "Frontend Mentor challenges",
  "practice.text":
    "{total} challenges published between 2021 and 2024, from simple cards to multi-page sites. They sharpen my layout skills; they aren't client projects.",
  "filters.label": "Filter challenges by level",
  "lvl.todos": "All",
  "lvl.premium": "Premium",
  "lvl.avanzado": "Advanced",
  "lvl.multi": "Advanced · multi-page",
  "lvl.intermedio": "Intermediate",
  "lvl.junior": "Junior",
  "lvl.newbie": "Newbie",
  "title.calc": "Calculator",
  "title.fylo": "Fylo (dark theme)",
  "title.dropdown": "Dropdown Navigation",
  "title.signup": "Sign-up Form",
  "title.chat": "Chat App (CSS illustration)",
  "about.script": "About me",
  "about.statement":
    "Ever since university I've loved building programs with <em>eye-catching, friendly</em> interactivity for people.",
  "about.body":
    "Persistence, perseverance, discipline and a hunger to learn have helped me understand web development a little better. I keep learning to grow as a person and as a professional.",
  "about.fact1": "First web design course",
  "about.fact2": "Frontend Mentor challenges",
  "about.fact3": "Latest published challenge",
  "contact.script": "Let's talk,",
  "contact.title": "Have a page <em>in mind?</em>",
  "contact.text":
    "Tell me what you need and I'll reply to the email you leave. You can also find me on GitHub and Twitter.",
  "form.name": "Name",
  "form.email": "Email",
  "form.message": "Message",
  "form.name.placeholder": "Your name",
  "form.email.placeholder": "you@email.com",
  "form.message.placeholder": "Tell me about your project…",
  "form.send": "Send",
  "footer.credit": "Designed and coded by Luis Selva",
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
