const mobileQuery = matchMedia("(max-width: 960px)");

export function initHeader() {
  const header = document.querySelector(".site-header");
  const toggle = header.querySelector(".nav__toggle");
  const menu = header.querySelector(".nav__menu");
  const disclosure = header.querySelector(".nav__disclosure");
  const panel = header.querySelector(".areas-panel");
  const courses = header.querySelector(".nav__courses");

  const setPanel = (open) => {
    disclosure.setAttribute("aria-expanded", String(open));
    courses.classList.toggle("is-open", open);
  };

  const setMenu = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    header.classList.toggle("is-menu-open", open);
    document.body.classList.toggle("is-locked", open);
    if (!open) setPanel(false);
  };

  disclosure.addEventListener("click", () => {
    setPanel(disclosure.getAttribute("aria-expanded") !== "true");
  });
  toggle.addEventListener("click", () => {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });

  courses.addEventListener("focusout", (event) => {
    if (!mobileQuery.matches && !courses.contains(event.relatedTarget)) setPanel(false);
  });
  document.addEventListener("click", (event) => {
    if (!courses.contains(event.target)) {
      if (!mobileQuery.matches) setPanel(false);
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (disclosure.getAttribute("aria-expanded") === "true") {
      setPanel(false);
      disclosure.focus();
    } else if (toggle.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      toggle.focus();
    }
  });
  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenu(false);
  });
  mobileQuery.addEventListener("change", () => setMenu(false));

  // Keyboard users open the panel with the button; hovering opens it too on desktop.
  courses.addEventListener("pointerenter", (event) => {
    if (event.pointerType === "mouse" && !mobileQuery.matches) setPanel(true);
  });
  courses.addEventListener("pointerleave", (event) => {
    if (event.pointerType === "mouse" && !mobileQuery.matches && !panel.contains(document.activeElement)) {
      setPanel(false);
    }
  });

  const onScroll = () => header.classList.toggle("is-scrolled", scrollY > 8);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}
