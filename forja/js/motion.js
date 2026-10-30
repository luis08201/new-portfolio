const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initMotion() {
  const root = document.documentElement;
  const { gsap, ScrollTrigger } = window;
  if (reduced || !gsap) {
    root.classList.remove("js-motion");
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
  intro
    .fromTo("[data-load]", { y: 28, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.08 })
    .fromTo(
      "[data-load-media]",
      { clipPath: "inset(18% 12% 18% 12% round 28px)", autoAlpha: 0 },
      { clipPath: "inset(0% 0% 0% 0% round 28px)", autoAlpha: 1, duration: 1.1, ease: "power3.inOut" },
      0.1,
    )
    .fromTo(
      "[data-float]",
      { y: 24, scale: 0.92, autoAlpha: 0 },
      { y: 0, scale: 1, autoAlpha: 1, duration: 0.7, stagger: 0.12, ease: "back.out(1.6)" },
      0.7,
    );
  root.classList.remove("js-motion");

  revealOnScroll();
}

export function revealOnScroll(scope = document) {
  const { gsap, ScrollTrigger } = window;
  if (reduced || !gsap) return;
  const targets = [...scope.querySelectorAll("[data-reveal]:not([data-revealed])")];
  if (!targets.length) return;
  for (const el of targets) el.dataset.revealed = "";
  gsap.set(targets, { y: 36, autoAlpha: 0 });
  ScrollTrigger.batch(targets, {
    start: "top 88%",
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.08, ease: "power3.out", overwrite: true }),
  });
}
