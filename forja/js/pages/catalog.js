import { COURSES } from "../courses.js";
import { onLanguageChange } from "../i18n.js";
import { countLabel, courseCard } from "../render.js";

const FINSWEET_SRC = "https://cdn.jsdelivr.net/npm/@finsweet/attributes@2.7.1/attributes.js";

// Finsweet reads the cards once when it starts, so the script is only added
// after the first render, and restarted whenever the cards are rebuilt.
function loadFinsweet() {
  // Finsweet waits for the Webflow runtime to call Webflow.push callbacks; this
  // site has no Webflow runtime, so run them right away.
  window.Webflow ||= { push: (callback) => callback() };
  const script = document.createElement("script");
  script.type = "module";
  script.src = FINSWEET_SRC;
  script.setAttribute("fs-list", "");
  document.head.append(script);
}

export function init() {
  const grid = document.querySelector("[data-catalog]");
  const results = document.querySelector("[data-results]");
  const total = document.querySelector("[data-total]");
  let started = false;

  const showResults = (n) => {
    results.textContent = countLabel(n, "results");
  };

  const watch = () => {
    window.FinsweetAttributes ||= [];
    window.FinsweetAttributes.push([
      "list",
      (instances) => {
        const [list] = instances;
        showResults(list.items.value.filter((item) => item.element.isConnected).length);
        list.addHook("afterRender", (items) => {
          showResults(items.length);
          return items;
        });
      },
    ]);
  };

  // The search form must never reload the page, with or without Finsweet.
  document.querySelector(".toolbar").addEventListener("submit", (event) => event.preventDefault());

  total.textContent = COURSES.length;

  onLanguageChange(() => {
    grid.innerHTML = COURSES.map((course) => courseCard(course, { headingLevel: 2, listItem: true })).join("");
    showResults(COURSES.length);

    if (!started) {
      started = true;
      loadFinsweet();
      watch();
      return;
    }
    const list = window.FinsweetAttributes?.modules?.list;
    if (list?.restart) {
      list.restart();
      watch();
    }
  });
}
