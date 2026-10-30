import { COURSES, INSTRUCTORS, LEVELS, findCourse } from "../courses.js";
import { onLanguageChange, pick, setMeta, t } from "../i18n.js";
import { areaName, courseCard, escapeHtml, formatDate, modeName } from "../render.js";

const check =
  '<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="9" /><path d="m6 10.2 2.7 2.7L14.2 7.4" /></svg>';

function notFound() {
  return `
    <section class="page-head page-head--center">
      <div class="container">
        <h1 class="page-head__title">${t("course.notFoundTitle")}</h1>
        <p class="page-head__lead">${t("course.notFoundText")}</p>
        <a class="btn btn--ember btn--lg" href="cursos.html">${t("course.notFoundCta")}</a>
      </div>
    </section>`;
}

function detail(course) {
  const title = escapeHtml(pick(course.title));
  const instructor = INSTRUCTORS[course.instructor];
  const related = COURSES.filter((c) => c.area === course.area && c.slug !== course.slug).slice(0, 3);
  const facts = [
    [t("course.length"), t("course.lengthValue", { weeks: course.weeks, hours: course.hours })],
    [t("course.schedule"), pick(course.schedule)],
    [t("course.mode"), modeName(course.mode)],
    [t("course.start"), formatDate(course.start, { long: true })],
    [t("course.level"), pick(LEVELS[course.level])],
    [t("course.price"), t("course.priceValue", { price: course.price })],
  ];

  return `
    <section class="course-hero">
      <div class="container">
        <nav class="breadcrumb" aria-label="${t("crumb.label")}">
          <ol>
            <li><a href="./">${t("crumb.home")}</a></li>
            <li><a href="cursos.html?area_equal=${course.area}">${areaName(course.area)}</a></li>
            <li aria-current="page">${title}</li>
          </ol>
        </nav>
        <div class="course-hero__grid">
          <div class="course-hero__copy">
            <span class="tag tag--${course.area}" data-load>${areaName(course.area)}</span>
            <h1 class="course-hero__title" data-load>${title}</h1>
            <p class="course-hero__lead" data-load>${escapeHtml(pick(course.summary))}</p>
            <div class="hero__actions" data-load>
              <a class="btn btn--ember btn--lg" href="contacto.html?curso=${course.slug}">${t("course.enroll")}</a>
              <a class="btn btn--ghost btn--lg" href="#temario">${t("course.syllabusLink")}</a>
            </div>
          </div>
          <figure class="course-hero__photo" data-load-media>
            <img src="${course.image}" alt="${escapeHtml(t("course.photoAlt", { title: pick(course.title) }))}" width="720" height="480" fetchpriority="high" />
          </figure>
        </div>
        <dl class="facts" data-load>
          ${facts.map(([label, value]) => `<div><dt>${label}</dt><dd>${escapeHtml(value)}</dd></div>`).join("")}
        </dl>
      </div>
    </section>

    <section class="section">
      <div class="container course-body">
        <div class="course-body__main">
          <h2 class="section__title section__title--sm" data-reveal>${t("course.outcomes")}</h2>
          <ul class="outcomes" data-reveal>
            ${pick(course.outcomes).map((item) => `<li>${check}<span>${escapeHtml(item)}</span></li>`).join("")}
          </ul>

          <h2 class="section__title section__title--sm" id="temario" data-reveal>${t("course.syllabus")}</h2>
          <ol class="modules" data-reveal>
            ${course.modules
              .map((module, i) => {
                const [name, text] = pick(module);
                return `<li class="module">
                  <span class="module__num">${t("course.module", { n: i + 1 })}</span>
                  <h3 class="module__title">${escapeHtml(name)}</h3>
                  <p>${escapeHtml(text)}</p>
                </li>`;
              })
              .join("")}
          </ol>
        </div>

        <aside class="course-body__side">
          <div class="side-card" data-reveal>
            <h2 class="side-card__title">${t("course.requirements")}</h2>
            <ul class="bullets">${pick(course.requirements).map((r) => `<li>${escapeHtml(r)}</li>`).join("")}</ul>
          </div>
          <div class="side-card instructor" data-reveal>
            <h2 class="side-card__title">${t("course.instructor")}</h2>
            <div class="instructor__who">
              <img src="${instructor.photo}" alt="" width="320" height="320" loading="lazy" />
              <div><strong>${instructor.name}</strong><span>${escapeHtml(pick(instructor.role))}</span></div>
            </div>
            <p>${escapeHtml(pick(instructor.bio))}</p>
          </div>
          <a class="btn btn--ember btn--block" href="contacto.html?curso=${course.slug}" data-reveal>${t("course.enroll")}</a>
        </aside>
      </div>
    </section>

    ${
      related.length
        ? `<section class="section section--tint related">
            <div class="container">
              <h2 class="section__title section__title--sm" data-reveal>${t("course.related", { area: areaName(course.area).toLowerCase() })}</h2>
              <div class="course-grid">${related.map((c) => courseCard(c)).join("")}</div>
            </div>
          </section>`
        : ""
    }`;
}

export function init() {
  const root = document.querySelector("[data-course-root]");
  const course = findCourse(new URLSearchParams(location.search).get("c"));

  onLanguageChange(() => {
    root.innerHTML = course ? detail(course) : notFound();
    setMeta(
      course ? `${pick(course.title)} · Forja` : `${t("course.notFoundTitle")} · Forja`,
      course ? pick(course.summary) : undefined,
    );
  });
}
