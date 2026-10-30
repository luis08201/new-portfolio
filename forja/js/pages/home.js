import { AREAS, COURSES } from "../courses.js";
import { onLanguageChange, pick } from "../i18n.js";
import { countLabel, courseCard, formatDate } from "../render.js";

const byStart = (a, b) => a.start.localeCompare(b.start);

export function init() {
  const featured = document.querySelector("[data-featured]");
  const upcoming = COURSES.filter((course) => course.featured).sort(byStart);
  const next = [...COURSES].sort(byStart)[0];

  document.querySelector("[data-count-courses]").textContent = COURSES.length;

  onLanguageChange(() => {
    featured.innerHTML = upcoming.map((course) => courseCard(course)).join("");
    for (const card of featured.children) card.dataset.reveal = "";

    for (const area of AREAS) {
      const n = COURSES.filter((course) => course.area === area.id).length;
      document.querySelector(`[data-area-count="${area.id}"]`).textContent = countLabel(n, "area.count");
    }

    document.querySelector("[data-next-start-title]").textContent = pick(next.title);
    document.querySelector("[data-next-start-date]").textContent = formatDate(next.start, { long: true });
  });
}
