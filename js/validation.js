const nombre = document.getElementById("contacto__formulario--name");

nombre.addEventListener('input', () => {
    const nombrePattern = /^[a-zA-ZÀ-ÿ\s]{1,40}$/

    if(nombre.value.match(nombrePattern)){
        nombre.classList.add("active");
        nombre.classList.remove("error");
        nombre.classList.remove("empty");
    }else if(nombre.value === ''){
        nombre.classList.add("empty");
         nombre.classList.remove("active");
         nombre.classList.remove("error");
    }else{
        nombre.classList.add("error");
        nombre.classList.remove("active");
        nombre.classList.remove("empty");
    }
})

const email = document.getElementById("contacto__formulario--email");

email.addEventListener("input", () => {
  const emailPattern = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$/;

  if (email.value.match(emailPattern)) {
    email.classList.add("active");
    email.classList.remove("error");
    email.classList.remove("empty");
  } else if (email.value === "") {
    email.classList.add("empty");
    email.classList.remove("active");
    email.classList.remove("error");
  } else {
    email.classList.add("error");
    email.classList.remove("active");
    email.classList.remove("empty");
  }
});