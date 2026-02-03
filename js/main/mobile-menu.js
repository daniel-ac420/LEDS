let mobileMenu = document.querySelector(".mobile-menu");
let mobileMenuButtonCall = document.querySelector(".mobile-menu-button");
let buttonClose = document.querySelector(".mobile-menu__close");

mobileMenuButtonCall.addEventListener("click", function() {
    const scrollPosition = window.scrollY;
    document.body.classList.add("no-scroll");
    document.body.style.top = `-${scrollPosition}px`;
    mobileMenu.classList.add("active");
});

buttonClose.addEventListener("click", function() {
    document.body.classList.remove("no-scroll");
    const scrollPosition = document.body.style.top;
    document.body.style.top = "";
    window.scrollTo(0, parseInt(scrollPosition || "0") * -1);
    mobileMenu.classList.remove("active");
});