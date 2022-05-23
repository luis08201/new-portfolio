window.addEventListener("scroll", function () {
  const floatingBtn = document.querySelector(".floating--btn");
  floatingBtn.classList.toggle("sticky", window.scrollY > 200);
  console.log(window.scrollY);
});
