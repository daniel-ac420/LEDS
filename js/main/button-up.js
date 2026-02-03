let bodyContainer = document.querySelector("body");

let newButtonUp = document.createElement("div");
newButtonUp.classList.add("button-up");
newButtonUp.classList.add("button-up_hide");
newButtonUp.title = "Наверх";

let newButtonUpImage = document.createElement("div");
newButtonUpImage.classList.add("button-up__image");
newButtonUp.append(newButtonUpImage);

bodyContainer.append(newButtonUp);

const buttonUp = {
    element: document.querySelector(".button-up"),
    show() {
        this.element.classList.remove("button-up_hide");
    },
    hide() {
        this.element.classList.add("button-up_hide");
    },
    addEventListener() {
        /* --- Scroll --- */
        window.addEventListener("scroll", () => {
            const scrollY = window.scrollY || document.documentElement.scrollTop;
            scrollY > 400 ? this.show() : this.hide();
        });

        /* --- Click --- */
        document.querySelector(".button-up").onclick = () => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth"
            });
        }
    }
}

buttonUp.addEventListener();