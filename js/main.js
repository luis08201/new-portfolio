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

const moreButton = document.querySelector("[aria-controls='mas-retos']");
const morePanel = document.getElementById("mas-retos");
const moreLabel = moreButton.querySelector(".pill__label");

moreButton.addEventListener("click", () => {
  const open = morePanel.hidden;
  morePanel.hidden = !open;
  moreButton.setAttribute("aria-expanded", String(open));
  moreLabel.textContent = open ? "Ver menos retos" : `Ver ${moreButton.dataset.more} retos más`;
  if (!open) {
    document.getElementById("practica").scrollIntoView({ behavior: "smooth" });
  }
});

for (const field of fields) {
  document.getElementById(field.id).addEventListener("input", (event) => {
    if (event.target.getAttribute("aria-invalid") === "true") {
      setError(event.target, "");
    }
  });
}
