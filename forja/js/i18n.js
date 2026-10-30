import { EN, MESSAGES, META } from "./strings.js";

// Shared with the portfolio, so a language picked there carries over here.
const STORAGE_KEY = "lang";
export const LANGS = ["es", "en"];

const page = document.body.dataset.page;
const description = document.querySelector('meta[name="description"]');

const ATTRIBUTES = [
  ["i18nAria", "aria-label"],
  ["i18nPlaceholder", "placeholder"],
  ["i18nAlt", "alt"],
];
const selector = (key) => `[data-${key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}]`;

// The markup is written in Spanish, so it is the Spanish dictionary.
const ES = {};
const pageMeta = { es: { title: document.title, description: description.content }, en: META[page] };
for (const el of document.querySelectorAll("[data-i18n]")) {
  ES[el.dataset.i18n] ??= el.innerHTML;
}
for (const [key, attribute] of ATTRIBUTES) {
  for (const el of document.querySelectorAll(selector(key))) {
    ES[el.dataset[key]] ??= el.getAttribute(attribute);
  }
}

const dictionaries = { es: ES, en: EN };
const listeners = new Set();
let current = "es";

const fill = (text, vars = {}) => text.replace(/\{(\w+)\}/g, (match, name) => vars[name] ?? match);

export function t(key, vars) {
  return fill(MESSAGES[current][key] ?? MESSAGES.es[key] ?? key, vars);
}

export const getLanguage = () => current;
export const pick = (value) => value[current] ?? value.es;
export const onLanguageChange = (fn) => listeners.add(fn);

export function setMeta(title, text) {
  document.title = title;
  if (text) description.content = text;
}

export function applyLanguage(lang) {
  current = LANGS.includes(lang) ? lang : "es";
  const dict = dictionaries[current];
  const text = (key) => dict[key] ?? ES[key];

  document.documentElement.lang = current;
  setMeta(pageMeta[current].title, pageMeta[current].description);

  for (const el of document.querySelectorAll("[data-i18n]")) {
    const html = text(el.dataset.i18n);
    if (html !== undefined && el.innerHTML !== html) el.innerHTML = html;
  }
  for (const [key, attribute] of ATTRIBUTES) {
    for (const el of document.querySelectorAll(selector(key))) {
      const value = text(el.dataset[key]);
      if (value !== undefined) el.setAttribute(attribute, value);
    }
  }
  for (const button of document.querySelectorAll("[data-lang]")) {
    button.setAttribute("aria-pressed", String(button.dataset.lang === current));
  }
  for (const fn of listeners) fn(current);
}

export function saveLanguage(lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // Not saving the choice is fine.
  }
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

// Detected from the time zone so the page never renders in one language and then flips.
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
  return (navigator.languages ?? [navigator.language]).some((tag) =>
    LATAM_REGIONS.has(tag.split("-")[1]?.toUpperCase()),
  );
}
