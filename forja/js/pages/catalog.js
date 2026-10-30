import { AREAS, COURSES, MODES } from "../courses.js";
import { onLanguageChange, pick } from "../i18n.js";
import { areaName, countLabel, courseCard } from "../render.js";

const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const normalize = (text) =>
  text.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().trim();

export function init() {
  const grid = document.querySelector("[data-catalog]");
  const results = document.querySelector("[data-results]");
  const empty = document.querySelector("[data-empty]");
  const chips = [...document.querySelectorAll(".chip[data-area]")];
  const modeSelect = document.querySelector("[data-mode-filter]");
  const search = document.querySelector("[data-search]");
  const form = document.querySelector(".toolbar");

  const params = new URLSearchParams(location.search);
  const state = {
    area: AREAS.some((a) => a.id === params.get("area")) ? params.get("area") : "todas",
    mode: params.get("modo") in MODES ? params.get("modo") : "todas",
    query: params.get("q") ?? "",
  };
  modeSelect.value = state.mode;
  search.value = state.query;

  for (const chip of chips) {
    const id = chip.dataset.area;
    const n = id === "todas" ? COURSES.length : COURSES.filter((c) => c.area === id).length;
    chip.querySelector(".chip__count").textContent = n;
  }

  const matches = (course) => {
    if (state.area !== "todas" && course.area !== state.area) return false;
    if (state.mode !== "todas" && course.mode !== state.mode) return false;
    const query = normalize(state.query);
    if (!query) return true;
    const haystack = normalize(`${pick(course.title)} ${pick(course.summary)} ${areaName(course.area)}`);
    return query.split(/\s+/).every((word) => haystack.includes(word));
  };

  if (window.gsap && window.Flip) window.gsap.registerPlugin(window.Flip);
  let activeFlip = null;

  const apply = ({ animate = true } = {}) => {
    for (const chip of chips) chip.setAttribute("aria-pressed", String(chip.dataset.area === state.area));

    const cards = [...grid.children];
    const { gsap, Flip } = window;
    const useFlip = animate && !reduced && gsap && Flip;
    activeFlip?.progress(1);
    const flipState = useFlip ? Flip.getState(cards, { props: "opacity" }) : null;

    let shown = 0;
    for (const card of cards) {
      const visible = matches(COURSES.find((c) => c.slug === card.dataset.slug));
      card.style.display = visible ? "" : "none";
      if (visible) shown++;
    }

    results.textContent = countLabel(shown, "results");
    empty.hidden = shown > 0;

    if (flipState) {
      activeFlip = Flip.from(flipState, {
        duration: 0.55,
        ease: "power2.inOut",
        absolute: true,
        stagger: 0.02,
        onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, scale: 0.94 }, { autoAlpha: 1, scale: 1, duration: 0.45, delay: 0.1 }),
        onLeave: (els) => gsap.to(els, { autoAlpha: 0, scale: 0.94, duration: 0.3 }),
      });
    }

    const url = new URL(location.href);
    const set = (key, value, fallback) =>
      value && value !== fallback ? url.searchParams.set(key, value) : url.searchParams.delete(key);
    set("area", state.area, "todas");
    set("modo", state.mode, "todas");
    set("q", state.query.trim(), "");
    history.replaceState(history.state, "", url);
  };

  for (const chip of chips) {
    chip.addEventListener("click", () => {
      if (state.area === chip.dataset.area) return;
      state.area = chip.dataset.area;
      apply();
    });
  }
  modeSelect.addEventListener("change", () => {
    state.mode = modeSelect.value;
    apply();
  });
  search.addEventListener("input", () => {
    state.query = search.value;
    apply();
  });
  form.addEventListener("submit", (event) => event.preventDefault());
  document.querySelector("[data-reset]").addEventListener("click", () => {
    Object.assign(state, { area: "todas", mode: "todas", query: "" });
    modeSelect.value = "todas";
    search.value = "";
    apply();
  });

  onLanguageChange(() => {
    activeFlip?.progress(1);
    grid.innerHTML = COURSES.map((course) => courseCard(course, { headingLevel: 2 })).join("");
    apply({ animate: false });
  });
}
