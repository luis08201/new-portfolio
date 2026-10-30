import { addEnglish, applyLanguage, getLanguage, initialLanguage, saveLanguage } from "./i18n.js";
import { initPills } from "./pills.js";
import { CASES_EN, CASES_META_EN } from "./cases-en.js";

addEnglish({ ...CASES_EN, ...CASES_META_EN[document.body.dataset.case] });
applyLanguage(initialLanguage());

for (const button of document.querySelectorAll("[data-lang]")) {
  button.addEventListener("click", () => {
    const lang = button.dataset.lang;
    if (lang === getLanguage()) return;
    applyLanguage(lang);
    saveLanguage(lang);
    const url = new URL(location.href);
    if (url.searchParams.has("lang")) {
      url.searchParams.delete("lang");
      history.replaceState(null, "", url);
    }
  });
}

const { gsap, ScrollTrigger } = window;
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

initPills();

if (gsap && ScrollTrigger && !reduced) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.fromTo(
    "[data-load]",
    { opacity: 0, y: 24 },
    { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.08 },
  );
  gsap.set("[data-reveal]", { opacity: 0, y: 32 });
  ScrollTrigger.batch("[data-reveal]", {
    start: "top 90%",
    once: true,
    onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.08 }),
  });
}
