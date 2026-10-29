const { gsap, ScrollTrigger, Flip, DrawSVGPlugin, SplitText } = window;
const hasGsap = Boolean(gsap && ScrollTrigger && Flip && DrawSVGPlugin && SplitText);
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (hasGsap) gsap.registerPlugin(ScrollTrigger, Flip, DrawSVGPlugin, SplitText);

/* Contact form */

const form = document.querySelector("#contacto-form");
const status = document.querySelector("#form-status");
const submit = form.querySelector("button[type=submit]");
const submitLabel = submit.querySelector(".btn__label");

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

const cards = [...document.querySelectorAll(".reto")];
const chips = [...document.querySelectorAll(".chip")];
const moreWrap = document.querySelector(".retos__more");
const moreButton = document.getElementById("ver-todos");
const moreText = moreButton.textContent.trim();
let filter = "todos";
let expanded = false;

function isVisible(card) {
  if (filter !== "todos") return card.dataset.level === filter;
  return expanded || !card.hasAttribute("data-extra");
}

function render() {
  const animate = hasGsap && !reducedMotion.matches;
  const state = animate ? Flip.getState(cards) : null;

  for (const card of cards) card.hidden = !isVisible(card);
  for (const chip of chips) chip.setAttribute("aria-pressed", String(chip.dataset.filter === filter));
  moreWrap.hidden = filter !== "todos";
  moreButton.setAttribute("aria-expanded", String(expanded));
  moreButton.textContent = expanded ? "Ver menos retos" : moreText;

  if (!animate) return;
  Flip.from(state, {
    duration: 0.6,
    ease: "power3.inOut",
    absolute: true,
    stagger: 0.015,
    onEnter: (els) =>
      gsap.fromTo(els, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.45, delay: 0.15 }),
    onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.9, duration: 0.3 }),
    onComplete: () => ScrollTrigger.refresh(),
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
    document.getElementById("retos").scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth" });
  }
});

/* Motion */

const root = document.documentElement;

if (!hasGsap) {
  root.classList.remove("js-motion");
} else {
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: reduce)", () => {
    root.classList.remove("js-motion");
  });

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    const tiles = gsap.utils.toArray(".bento .tile");
    const title = document.querySelector(".tile--intro h1");

    gsap.fromTo(
      tiles,
      { opacity: 0, y: 40, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power3.out", stagger: 0.08, clearProps: "transform" },
    );
    gsap.set(title, { visibility: "hidden" });
    root.classList.remove("js-motion");

    document.fonts.ready.then(() => {
      SplitText.create(title, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit(self) {
          gsap.set(title, { visibility: "visible" });
          return gsap.from(self.lines, { yPercent: 110, duration: 1, ease: "power4.out", stagger: 0.1, delay: 0.15 });
        },
      });
    });

    const counter = document.querySelector("[data-count]");
    const total = Number(counter.dataset.count);
    const tally = { value: 0 };
    counter.textContent = "0";
    gsap.to(tally, {
      value: total,
      duration: 1.8,
      delay: 0.4,
      ease: "power2.out",
      onUpdate: () => {
        counter.textContent = String(Math.round(tally.value));
      },
      scrollTrigger: { trigger: counter, start: "top 95%", once: true },
    });

    gsap.utils.toArray(".services li, .section__head, .project, .about__intro, .contact").forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    });

    gsap.set(".reto:not([hidden])", { opacity: 0, y: 30 });
    ScrollTrigger.batch(".reto:not([hidden])", {
      start: "top 92%",
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.06, clearProps: "transform" }),
    });

    gsap.from(".timeline__line path", {
      drawSVG: "0%",
      ease: "none",
      scrollTrigger: { trigger: ".timeline", start: "top 75%", end: "bottom 55%", scrub: 0.6 },
    });

    gsap.utils.toArray(".timeline li").forEach((item) => {
      gsap.from(item, {
        opacity: 0.15,
        x: 24,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: item, start: "top 80%", once: true },
      });
    });
  });

  mm.add("(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)", () => {
    const tiltables = gsap.utils.toArray(".bento .tile, .project");
    const cleanups = tiltables.map((el) => {
      const rotateX = gsap.quickTo(el, "rotationX", { duration: 0.5, ease: "power3.out" });
      const rotateY = gsap.quickTo(el, "rotationY", { duration: 0.5, ease: "power3.out" });

      const enter = () => gsap.set(el, { transformPerspective: 1000 });
      const move = (event) => {
        const box = el.getBoundingClientRect();
        const x = (event.clientX - box.left) / box.width - 0.5;
        const y = (event.clientY - box.top) / box.height - 0.5;
        rotateY(x * 6);
        rotateX(y * -6);
      };
      const leave = () => {
        rotateX(0);
        rotateY(0);
      };

      el.addEventListener("pointerenter", enter);
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointerenter", enter);
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  });
}
