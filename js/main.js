import { applyLanguage, getLanguage, initialLanguage, saveLanguage, t } from "./i18n.js";

const { gsap, ScrollTrigger, Flip, SplitText } = window;
const hasGsap = Boolean(gsap && ScrollTrigger && Flip && SplitText);
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const root = document.documentElement;

if (hasGsap) gsap.registerPlugin(ScrollTrigger, Flip, SplitText);

/* Language */

// Animations that rewrite or measure text register here so they can undo their
// changes before the copy is swapped and rebuild afterwards.
const languageHooks = new Set();
const onLanguageChange = (hook) => {
  languageHooks.add(hook);
  return () => languageHooks.delete(hook);
};

if (initialLanguage() !== "es") applyLanguage(initialLanguage());

function setLanguage(lang) {
  if (lang === getLanguage()) return;
  for (const hook of languageHooks) hook.before?.();
  applyLanguage(lang);
  saveLanguage(lang);
  refreshMessages();
  for (const hook of languageHooks) hook.after?.();
  if (hasGsap) ScrollTrigger.refresh();

  const url = new URL(location.href);
  if (url.searchParams.has("lang")) {
    url.searchParams.delete("lang");
    history.replaceState(null, "", url);
  }
}

for (const button of document.querySelectorAll("[data-lang]")) {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
}

/* Contact form */

const form = document.querySelector("#contacto-form");
const status = document.querySelector("#form-status");
const submit = form.querySelector("button[type=submit]");
const submitLabel = submit.querySelector(".pill__label");

const fields = [
  { id: "nombre", empty: "error.name" },
  { id: "correo", empty: "error.email" },
  { id: "mensaje", empty: "error.message" },
];

function setError(input, key) {
  const error = document.getElementById(`${input.id}-error`);
  error.dataset.key = key;
  error.textContent = key ? t(key) : "";
  if (key) {
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
  delete status.dataset.key;
  status.className = "form-status";

  if (!validate()) return;

  submit.disabled = true;
  submitLabel.textContent = t("form.sending");

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
    showStatus("form.ok", "form-status--ok");
  } catch {
    showStatus("form.fail", "form-status--error");
  } finally {
    submit.disabled = false;
    submitLabel.textContent = t("form.send");
  }
});

function showStatus(key, modifier) {
  status.hidden = false;
  status.dataset.key = key;
  status.textContent = t(key);
  status.classList.add(modifier);
}

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
  moreLabel.textContent = t(expanded ? "more.less" : "more.all");
}

function refreshMessages() {
  for (const el of document.querySelectorAll(".field-error[data-key], #form-status[data-key]")) {
    if (el.dataset.key) el.textContent = t(el.dataset.key);
  }
  submitLabel.textContent = t(submit.disabled ? "form.sending" : "form.send");
  moreLabel.textContent = t(expanded ? "more.less" : "more.all");
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
  let heightTween = null;
  const release = () => {
    gsap.set(list, { clearProps: "height" });
    ScrollTrigger.refresh();
  };
  if (toHeight >= fromHeight) {
    gsap.set(list, { height: toHeight });
  } else {
    heightTween = gsap.fromTo(
      list,
      { height: fromHeight },
      { height: toHeight, duration: 0.75, delay: 0.25, ease: "power2.inOut" },
    );
  }
  Flip.from(state, {
    duration,
    ease: "power3.inOut",
    absolute: true,
    stagger: 0.015,
    // The staggered cards finish after the height tween. Releasing the height
    // earlier collapses the list for a few frames and makes the next section jump.
    onComplete: () => {
      if (heightTween?.isActive()) heightTween.eventCallback("onComplete", release);
      else release();
    },
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

/* Projects gallery */

const projects = document.getElementById("trabajo");
const works = projects.querySelector(".works");

/* Motion */

if (!hasGsap) {
  root.classList.remove("js-motion");
} else {
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: reduce)", () => {
    root.classList.remove("js-motion");
  });

  mm.add("(prefers-reduced-motion: no-preference)", (context) => {
    const unhooks = [];
    const fontsReady = Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1200))]);

    // Page load: each block fades in while rising 5% of its height, at its own delay.
    fontsReady.then(context.add(() => {
      const intro = gsap.timeline({ defaults: { duration: 0.3, ease: "sine.inOut" } });
      for (const el of document.querySelectorAll("[data-load]")) {
        const from = el.dataset.load === "slide" ? { opacity: 0, yPercent: 5 } : { opacity: 0 };
        const to = el.dataset.load === "slide" ? { opacity: 1, yPercent: 0 } : { opacity: 1 };
        intro.fromTo(el, from, to, Number(el.dataset.delay) || 0);
      }
      root.classList.remove("js-motion");
    }));

    gsap.to(".badge__ring", { rotation: 360, duration: 16, ease: "none", repeat: -1 });

    // Each row is copied until one copy can slide out of view without exposing an edge,
    // then the scroll moves the rows a full copy in opposite directions.
    const showcaseRows = gsap.utils.toArray("[data-showcase]");
    const fillRow = (row) => {
      const originals = [...row.querySelectorAll(":scope > :not([data-clone])")];
      const copyWidth = () => originals.length * (originals[1].offsetLeft - originals[0].offsetLeft);
      const needed = Math.max(3, Math.ceil(window.innerWidth / copyWidth()) + 2);
      while (row.children.length < originals.length * needed) {
        for (const card of originals) {
          const clone = card.cloneNode(true);
          clone.setAttribute("data-clone", "");
          row.append(clone);
        }
      }
      return copyWidth;
    };
    for (const row of showcaseRows) {
      const copyWidth = fillRow(row);
      const left = row.dataset.showcase === "left";
      gsap.fromTo(
        row,
        { x: () => (left ? 0 : -copyWidth()) },
        {
          x: () => (left ? -copyWidth() : 0),
          ease: "none",
          scrollTrigger: { trigger: row, start: "top bottom", end: "bottom top", scrub: 1, invalidateOnRefresh: true },
        },
      );
    }
    const onResize = () => showcaseRows.forEach(fillRow);
    window.addEventListener("resize", onResize);

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

    gsap.set(".reto:not([hidden])", { opacity: 0, y: 30 });
    ScrollTrigger.batch(".reto:not([hidden])", {
      start: "top 92%",
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.06, clearProps: "transform" }),
    });

    let statement;
    let statementFade;
    const buildStatement = () => {
      statement = SplitText.create(".about__statement", { type: "words" });
      statementFade = gsap.fromTo(
        statement.words,
        { opacity: 0.18 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: { trigger: ".about__statement", start: "top 80%", end: "bottom 45%", scrub: true },
        },
      );
    };
    buildStatement();
    unhooks.push(onLanguageChange({
      before: () => {
        statementFade.scrollTrigger.kill();
        statementFade.kill();
        statement.revert();
      },
      after: () => context.add(buildStatement),
    }));

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

    return () => {
      window.removeEventListener("resize", onResize);
      document.querySelectorAll("[data-showcase] > [data-clone]").forEach((clone) => clone.remove());
      unhooks.forEach((unhook) => unhook());
    };
  });

  mm.add("(prefers-reduced-motion: no-preference) and (min-width: 900px)", () => {
    const track = works.querySelector(".works__track");
    const distance = () => {
      const style = getComputedStyle(works);
      const inner = works.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
      return Math.max(0, track.scrollWidth - inner);
    };

    projects.classList.add("is-pinned");
    works.scrollLeft = 0;

    gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: projects,
        start: "center center",
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    });

    return () => projects.classList.remove("is-pinned");
  });

  mm.add("(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)", () => {
    const magnets = gsap.utils.toArray(".badge");
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

  // Buttons: a slight press, an oval fill rising from below and the arrow nudging
  // out; leaving plays the same timeline backwards.
  for (const pill of document.querySelectorAll(".pill")) {
    const fill = document.createElement("span");
    fill.className = "pill__fill";
    fill.setAttribute("aria-hidden", "true");
    pill.prepend(fill);
    gsap.set(fill, { yPercent: 100 });

    const glyph = pill.querySelector(".pill__arrow > span");
    const nudge = glyph?.textContent.trim() === "↓" ? { y: 3 } : { x: 3, y: -3, rotation: -45 };
    const hover = gsap
      .timeline({ paused: true })
      .to(pill, { scale: 0.98, duration: 0.3, ease: "power1.out" }, 0)
      .to(fill, { yPercent: 0, duration: 0.5, ease: "power2.out" }, 0);
    if (glyph) hover.to(glyph, { ...nudge, duration: 0.3, ease: "power1.out" }, 0);

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
