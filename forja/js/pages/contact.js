import { AREAS, COURSES, findCourse } from "../courses.js";
import { onLanguageChange, pick, t } from "../i18n.js";
import { escapeHtml } from "../render.js";

const UNDECIDED = "sin-decidir";
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[\d\s-]{7,}$/;

export function init() {
  const form = document.querySelector("[data-enroll]");
  const select = form.querySelector("[data-course-select]");
  const submit = form.querySelector("[data-submit]");
  const success = document.querySelector("[data-success]");
  const fields = {
    name: form.elements.name,
    email: form.elements.email,
    phone: form.elements.phone,
    course: form.elements.course,
  };
  const errors = {};

  const preselected = new URLSearchParams(location.search).get("curso");
  if (findCourse(preselected)) select.dataset.value = preselected;

  const validators = {
    name: (value) => (value.trim().length >= 2 ? null : "error.name"),
    email: (value) => (EMAIL.test(value.trim()) ? null : "error.email"),
    phone: (value) => (!value.trim() || PHONE.test(value.trim()) ? null : "error.phone"),
    course: (value) => (value ? null : "error.course"),
  };

  const showError = (name, key) => {
    errors[name] = key;
    const input = fields[name];
    const message = document.getElementById(`${input.id}-error`);
    message.textContent = key ? t(key) : "";
    input.toggleAttribute("aria-invalid", Boolean(key));
    input.closest(".field").classList.toggle("has-error", Boolean(key));
  };

  const validate = (name) => {
    const key = validators[name](fields[name].value);
    showError(name, key);
    return !key;
  };

  for (const name of Object.keys(fields)) {
    const input = fields[name];
    input.addEventListener("blur", () => {
      if (input.value || errors[name]) validate(name);
    });
    input.addEventListener(name === "course" ? "change" : "input", () => {
      if (errors[name]) validate(name);
    });
  }

  const renderOptions = () => {
    const value = select.value || select.dataset.value || "";
    const placeholder = select.querySelector('option[value=""]');
    select.replaceChildren(placeholder);
    for (const area of AREAS) {
      const group = document.createElement("optgroup");
      group.label = pick(area.name);
      for (const course of COURSES.filter((c) => c.area === area.id)) {
        group.append(new Option(pick(course.title), course.slug));
      }
      select.append(group);
    }
    select.append(new Option(t("form.undecided"), UNDECIDED));
    select.value = value;
    delete select.dataset.value;
  };

  const renderSuccess = () => {
    const { name, email, course } = success.dataset;
    if (!name) return;
    success.querySelector("[data-success-title]").textContent = t("form.successTitle", {
      name: name.split(" ")[0],
    });
    const chosen = findCourse(course);
    success.querySelector("[data-success-text]").innerHTML = chosen
      ? t("form.successText", {
          course: `<strong>${escapeHtml(pick(chosen.title))}</strong>`,
          email: `<strong>${escapeHtml(email)}</strong>`,
        })
      : t("form.successTextUndecided", { email: `<strong>${escapeHtml(email)}</strong>` });
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const invalid = Object.keys(fields).filter((name) => !validate(name));
    if (invalid.length) {
      fields[invalid[0]].focus();
      return;
    }

    submit.disabled = true;
    submit.textContent = t("form.sending");
    // Demo only: nothing leaves the browser.
    setTimeout(() => {
      Object.assign(success.dataset, {
        name: fields.name.value.trim(),
        email: fields.email.value.trim(),
        course: fields.course.value,
      });
      renderSuccess();
      form.hidden = true;
      success.hidden = false;
      success.focus();
      submit.disabled = false;
      submit.textContent = submit.dataset.label;
    }, 900);
  });

  success.querySelector("[data-again]").addEventListener("click", () => {
    form.reset();
    for (const name of Object.keys(fields)) showError(name, null);
    for (const key of ["name", "email", "course"]) delete success.dataset[key];
    success.hidden = true;
    form.hidden = false;
    fields.name.focus();
  });

  onLanguageChange(() => {
    renderOptions();
    submit.dataset.label = submit.textContent;
    for (const [name, key] of Object.entries(errors)) if (key) showError(name, key);
    renderSuccess();
  });
}
