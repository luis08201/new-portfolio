let btnOn = document.getElementById("menuBTNON");
let btnOFF = document.getElementById("menuBTNOFF");

btnOn.addEventListener("click", () => {
    btnOFF.classList.remove("active");

    btnOn.classList.add("active");
    let nav = document.getElementById("nav");
    nav.classList.add("active");

    if(btnOn.classList.contains("active")){
        btnOFF.addEventListener("click", () =>{
            btnOn.classList.remove("active");
            nav.classList.remove("active");
        })
    }
})