// Buttons: a slight press and an oval fill rising from below; leaving plays
// the same timeline backwards.
export function initPills() {
  const { gsap } = window;
  if (!gsap) return;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  for (const pill of document.querySelectorAll(".pill")) {
    const fill = document.createElement("span");
    fill.className = "pill__fill";
    fill.setAttribute("aria-hidden", "true");
    pill.prepend(fill);
    gsap.set(fill, { yPercent: 100 });

    const hover = gsap
      .timeline({ paused: true })
      .to(pill, { scale: 0.98, duration: 0.4, ease: "power2.out" }, 0)
      .to(fill, { yPercent: 0, duration: 0.6, ease: "power3.out" }, 0);

    const enter = () => {
      if (pill.disabled) return;
      pill.classList.add("is-hover");
      if (reducedMotion.matches) hover.progress(1).pause();
      else hover.play();
    };
    const leave = () => {
      pill.classList.remove("is-hover");
      if (reducedMotion.matches) hover.progress(0).pause();
      else hover.reverse();
    };
    pill.addEventListener("pointerenter", (event) => event.pointerType === "mouse" && enter());
    pill.addEventListener("pointerleave", leave);
    pill.addEventListener("focusin", () => pill.matches(":focus-visible") && enter());
    pill.addEventListener("focusout", leave);
  }
}
