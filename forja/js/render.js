import { AREAS, MODES } from "./courses.js";
import { getLanguage, pick, t } from "./i18n.js";

const area = (id) => AREAS.find((item) => item.id === id);
export const areaName = (id) => pick(area(id).name);
export const modeName = (id) => pick(MODES[id]);

export const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export function formatDate(iso, { long = false } = {}) {
  const date = new Date(`${iso}T12:00:00`);
  const sameYear = date.getFullYear() === new Date().getFullYear();
  const locale = getLanguage() === "es" ? "es-NI" : "en-US";
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: long ? "long" : "short",
    year: sameYear ? undefined : "numeric",
  })
    .format(date)
    .replace(".", "");
}

export const countLabel = (n, prefix) => t(`${prefix}.${n === 1 ? "one" : "many"}`, { n });

const stripAccents = (text) => text.normalize("NFD").replace(/\p{Diacritic}/gu, "");

// Hidden values Finsweet's list filter reads; keywords repeat the text without
// accents so "electronica" and "electrónica" both match.
function listFields(course) {
  const text = `${pick(course.title)} ${pick(course.summary)} ${areaName(course.area)}`;
  return `
      <span hidden fs-list-field="area">${course.area}</span>
      <span hidden fs-list-field="mode">${course.mode}</span>
      <span hidden fs-list-field="keywords">${escapeHtml(`${text} ${stripAccents(text)}`)}</span>`;
}

export function courseCard(course, { headingLevel = 3, listItem = false } = {}) {
  const h = `h${headingLevel}`;
  const title = escapeHtml(pick(course.title));
  return `
    <article class="course-card" data-slug="${course.slug}"${listItem ? ' fs-list-element="item"' : ""}>${listItem ? listFields(course) : ""}
      <div class="course-card__media">
        <img src="${course.image}" alt="" width="720" height="480" loading="lazy" />
        <span class="tag tag--${course.area}">${areaName(course.area)}</span>
      </div>
      <div class="course-card__body">
        <${h} class="course-card__title"><a href="curso.html?c=${course.slug}">${title}</a></${h}>
        <p class="course-card__summary">${escapeHtml(pick(course.summary))}</p>
        <ul class="course-card__meta">
          <li>${t("card.weeks", { n: course.weeks })}</li>
          <li>${modeName(course.mode)}</li>
          <li>${t("card.starts", { date: formatDate(course.start) })}</li>
        </ul>
        <div class="course-card__foot">
          <span class="price">US$${course.price}<small>${t("card.perMonth")}</small></span>
          <span class="course-card__cta" aria-hidden="true">${t("card.view")}
            <svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
          </span>
        </div>
      </div>
    </article>`;
}
