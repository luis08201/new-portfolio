const { gsap, ScrollTrigger, Flip, SplitText } = window;
const hasGsap = Boolean(gsap && ScrollTrigger && Flip && SplitText);
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const root = document.documentElement;

if (hasGsap) gsap.registerPlugin(ScrollTrigger, Flip, SplitText);

/* Contact form */

const form = document.querySelector("#contacto-form");
const status = document.querySelector("#form-status");
const submit = form.querySelector("button[type=submit]");
const submitLabel = submit.querySelector(".pill__label");

const fields = [
  { id: "nombre", empty: "Escribe tu nombre." },
  { id: "correo", empty: "Escribe un correo válido." },
  { id: "mensaje", empty: "Escribe un mensaje." },
];

function setError(input, message) {
  const error = document.getElementById(`${input.id}-error`);
  error.textContent = message;
  if (message) {
    input.setAttribute("aria-invalid", "true");
    input.setAttribute("aria-describedby", error.id);
  } else {
    input.removeAttribute("aria-invalid");
    input.removeAttribute("aria-describedby");
  }
}

function validate() {
  let firstInvalid = null;

  for (const field of fields) {
    const input = document.getElementById(field.id);
    const value = input.value.trim();
    let message = "";

    if (!value) {
      message = field.empty;
    } else if (input.type === "email" && !input.checkValidity()) {
      message = field.empty;
    }

    setError(input, message);
    if (message && !firstInvalid) firstInvalid = input;
  }

  if (firstInvalid) firstInvalid.focus();
  return !firstInvalid;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  status.hidden = true;
  status.textContent = "";
  status.className = "form-status";

  if (!validate()) return;

  const label = submitLabel.textContent;
  submit.disabled = true;
  submitLabel.textContent = "Enviando…";

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || data.ok === false) {
      throw new Error("No se pudo enviar");
    }
    form.reset();
    for (const field of fields) {
      setError(document.getElementById(field.id), "");
    }
    status.hidden = false;
    status.textContent = "Mensaje enviado. Te responderé a ese correo.";
    status.classList.add("form-status--ok");
  } catch {
    status.hidden = false;
    status.textContent =
      "No se pudo enviar. Puedes escribirme por GitHub o por Twitter.";
    status.classList.add("form-status--error");
  } finally {
    submit.disabled = false;
    submitLabel.textContent = label;
  }
});

for (const field of fields) {
  document.getElementById(field.id).addEventListener("input", (event) => {
    if (event.target.getAttribute("aria-invalid") === "true") {
      setError(event.target, "");
    }
  });
}

/* Challenge filters */

const list = document.getElementById("lista-retos");
const cards = [...list.querySelectorAll(".reto")];
const chips = [...document.querySelectorAll(".chip")];
const moreWrap = document.querySelector(".practice__toggle");
const moreButton = document.getElementById("ver-todos");
const moreLabel = moreButton.querySelector(".pill__label");
const moreText = moreLabel.textContent;
let filter = "todos";
let expanded = false;

function isVisible(card) {
  if (filter !== "todos") return card.dataset.level === filter;
  return expanded || !card.hasAttribute("data-extra");
}

function applyFilter() {
  for (const card of cards) card.hidden = !isVisible(card);
  for (const chip of chips) chip.setAttribute("aria-pressed", String(chip.dataset.filter === filter));
  moreWrap.hidden = filter !== "todos";
  moreButton.setAttribute("aria-expanded", String(expanded));
  moreLabel.textContent = expanded ? "Ver menos retos" : moreText;
}

function render() {
  if (!hasGsap || reducedMotion.matches) {
    applyFilter();
    return;
  }

  // Flip lifts the cards out of the flow while they move, so the list keeps an
  // explicit height that eases to the new one; otherwise the next section jumps up.
  const fromHeight = list.getBoundingClientRect().height;
  const state = Flip.getState(cards);
  Flip.killFlipsOf(cards, true);
  gsap.killTweensOf(list);
  gsap.set(list, { clearProps: "height" });
  applyFilter();
  const toHeight = list.offsetHeight;

  const duration = 0.6;
  gsap.fromTo(
    list,
    { height: fromHeight },
    { height: toHeight, duration, ease: "power3.inOut", clearProps: "height", onComplete: () => ScrollTrigger.refresh() },
  );
  Flip.from(state, {
    duration,
    ease: "power3.inOut",
    absolute: true,
    stagger: 0.015,
    onEnter: (els) =>
      gsap.fromTo(els, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.45, delay: 0.15 }),
    onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.9, duration: 0.3 }),
  });
}

for (const chip of chips) {
  chip.addEventListener("click", () => {
    if (chip.dataset.filter === filter) return;
    filter = chip.dataset.filter;
    render();
  });
}

moreButton.addEventListener("click", () => {
  expanded = !expanded;
  render();
  if (!expanded) {
    document.getElementById("practica").scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth" });
  }
});

/* Motion */

if (!hasGsap) {
  root.classList.remove("js-motion");
} else {
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: reduce)", () => {
    root.classList.remove("js-motion");
  });

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    const fontsReady = Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1200))]);

    fontsReady.then(() => {
      const title = SplitText.create(".hero h1", { type: "words", mask: "words" });
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      gsap.set([".topbar", ".hero__body > *"], { opacity: 1 });
      root.classList.remove("js-motion");

      intro
        .from(".topbar", { y: -24, opacity: 0, duration: 0.7 })
        .from(".hero__intro .script", { y: 20, opacity: 0, duration: 0.6 }, "-=0.35")
        .from(title.words, { yPercent: 110, duration: 1, ease: "power4.out", stagger: 0.12 }, "-=0.3")
        .from(".hero__portrait img", { y: 80, opacity: 0, duration: 1.1 }, "-=0.9")
        .from(".hero__intro .hero__small, .hero__aside", { y: 24, opacity: 0, duration: 0.7, stagger: 0.12 }, "-=0.6")
        .from(".badge", { scale: 0, rotation: -120, duration: 0.9, ease: "back.out(1.6)" }, "-=0.6")
        .from(".marquee", { opacity: 0, duration: 0.8 }, "-=0.5");
    });

    gsap.to(".badge__ring", { rotation: 360, duration: 16, ease: "none", repeat: -1 });

    const marquee = document.querySelector(".marquee");
    marquee.classList.add("is-moving");
    const loop = gsap.to(".marquee__track", { xPercent: -50, duration: 26, ease: "none", repeat: -1 });
    ScrollTrigger.create({
      onUpdate(self) {
        const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 300, 5);
        loop.timeScale(boost);
        gsap.to(loop, { timeScale: 1, duration: 0.8, overwrite: true });
      },
    });

    gsap.to(".hero__portrait img", {
      yPercent: 10,
      ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
    });

    gsap.utils
      .toArray(".trust__list, .split > *, .practice__head > *, .about__row, .contact__intro, .contact form")
      .forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

    gsap.utils.toArray(".work").forEach((work) => {
      gsap.fromTo(
        work.querySelector(".work__media"),
        { clipPath: "inset(10% 14% 10% 14% round 22px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 22px)",
          ease: "none",
          scrollTrigger: { trigger: work, start: "top 90%", end: "top 40%", scrub: 0.6 },
        },
      );
      gsap.from(work.querySelectorAll(".work__body > *"), {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: work, start: "top 75%", once: true },
      });
    });

    gsap.set(".reto:not([hidden])", { opacity: 0, y: 30 });
    ScrollTrigger.batch(".reto:not([hidden])", {
      start: "top 92%",
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.06, clearProps: "transform" }),
    });

    const statement = SplitText.create(".about__statement", { type: "words" });
    gsap.fromTo(
      statement.words,
      { opacity: 0.18 },
      {
        opacity: 1,
        ease: "none",
        stagger: 0.1,
        scrollTrigger: { trigger: ".about__statement", start: "top 80%", end: "bottom 45%", scrub: true },
      },
    );

    document.querySelectorAll("[data-count]").forEach((el) => {
      const total = Number(el.dataset.count);
      const tally = { value: 0 };
      el.textContent = "0";
      gsap.to(tally, {
        value: total,
        duration: 1.6,
        ease: "power2.out",
        delay: el.closest(".hero") ? 1.2 : 0,
        onUpdate: () => {
          el.textContent = String(Math.round(tally.value));
        },
        scrollTrigger: { trigger: el, start: "top 95%", once: true },
      });
    });
  });

  mm.add("(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)", () => {
    const magnets = gsap.utils.toArray(".pill, .badge");
    const cleanups = magnets.map((el) => {
      const toX = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
      const toY = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
      const move = (event) => {
        const box = el.getBoundingClientRect();
        toX((event.clientX - box.left - box.width / 2) * 0.25);
        toY((event.clientY - box.top - box.height / 2) * 0.35);
      };
      const leave = () => {
        toX(0);
        toY(0);
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    });
    return () => cleanups.forEach((cleanup) => cleanup());
  });
}
