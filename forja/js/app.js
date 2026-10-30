import { applyLanguage, initialLanguage, saveLanguage } from "./i18n.js";
import { initHeader } from "./header.js";
import { initMotion } from "./motion.js";

const pages = {
  home: () => import("./pages/home.js"),
  catalog: () => import("./pages/catalog.js"),
  course: () => import("./pages/course.js"),
  contact: () => import("./pages/contact.js"),
};

const loader = pages[document.body.dataset.page];
const page = loader ? await loader() : null;

page?.init?.();
applyLanguage(initialLanguage());

for (const button of document.querySelectorAll("[data-lang]")) {
  button.addEventListener("click", () => {
    const lang = button.dataset.lang;
    saveLanguage(lang);
    applyLanguage(lang);
    const url = new URL(location.href);
    if (url.searchParams.has("lang")) {
      url.searchParams.delete("lang");
      history.replaceState(history.state, "", url);
    }
  });
}

initHeader();
initMotion();
