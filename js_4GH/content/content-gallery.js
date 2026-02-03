const overlay = document.getElementById("overlay");
const overlayItem = document.getElementById("overlayItem");
const closeBtn = document.getElementById("close");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const galleryItems = document.querySelectorAll(".gallery__item");
let currentIndex = 0;


// Открытие оверлея
//function openOverlay(index) {
//    currentIndex = index;
//    updateOverlayContent();
//    document.documentElement.classList.add("no-scroll");
//    document.body.classList.add("no-scroll");
//    overlay.style.display = "flex";
//}
/* v2 */
function openOverlay(index) {
    currentIndex = index;
    updateOverlayContent();
    document.documentElement.classList.add("no-scroll");
//    document.body.classList.add("no-scroll");
    overlay.style.display = "flex";
}

/* v3 */
//let scrollY = 0;
//
//function openOverlay(index) {
//    currentIndex = index;
//    updateOverlayContent();
//    scrollY = window.scrollY;
//    document.body.style.position = 'fixed';
//    document.body.style.top = `-${scrollY}px`;
//    document.documentElement.classList.add("no-scroll");
//    document.body.classList.add("no-scroll");
//    overlay.style.display = "flex";
//}


// Обновление содержимого оверлея
function updateOverlayContent() {
    const item = galleryItems[currentIndex];
    overlayItem.classList.remove("fade-in");
    overlayItem.classList.add("fade-out");

    setTimeout(() => {
        overlayItem.innerHTML = item.innerHTML; // Копирование содержимого элемента
        void overlayItem.offsetWidth; // Перезапуск анимации
        overlayItem.classList.remove("fade-out");
        overlayItem.classList.add("fade-in");
    }, 250); // Задержка должна СОВПАДАТЬ с длительностью fade-out
}


// Закрытие оверлея
//function closeOverlay() {
//    overlay.style.display = "none";
//    document.documentElement.classList.remove("no-scroll");
//    document.body.classList.remove("no-scroll");
//}

/* v2 */
function closeOverlay() {
    overlay.style.display = "none";
    document.documentElement.classList.remove("no-scroll");
    document.body.classList.remove("no-scroll");
}

/* v3 */
//function closeOverlay() {
//    overlay.style.display = "none";
//    document.documentElement.classList.remove("no-scroll");
//    document.body.classList.remove("no-scroll");
//    document.body.style.position = '';
//    window.scrollTo(0, scrollY);
//}



// Закрытие оверлея при клике на "x"
closeBtn.addEventListener("click", closeOverlay);


// Закрытие оверлея при нажатии на Esc
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeOverlay();
    }
});


// GALLERY ELEMENTS CLICK OPENING
galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => openOverlay(index));
});


// NEXT BUTTON
nextBtn.addEventListener("click", (event) => {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    updateOverlayContent();
});


// PREV BUTTON
prevBtn.addEventListener("click", (event) => {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    updateOverlayContent();
});


// Закрытие оверлея при клике ВНЕ контента
overlay.addEventListener("click", (event) => {
    if (!event.target.closest(".overlay__item") && !event.target.closest(".prev") && !event.target.closest(".next")) {
        closeOverlay();
    }
});



/* SWIPE */
let touchStartX = 0;
let touchEndX = 0;

overlay.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].clientX;
});

overlay.addEventListener("touchend", (event) => {
    touchEndX = event.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX) {
        nextBtn.click();
    } else if (touchEndX > touchStartX) {
        prevBtn.click();
    }
}



/* DESKTOP SWIPE */
let isDragging = false;
let startX = 0;

overlayItem.addEventListener("mousedown", (event) => {
    isDragging = true;
    startX = event.clientX; // Начальная позиция курсора
});

overlayItem.addEventListener("mousemove", (event) => {
    if (!isDragging) return;
    const currentX = event.clientX;
    const diffX = currentX - startX;

    if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
            prevBtn.click();
        } else {
            nextBtn.click();
        }
        isDragging = false;
    }
});

overlayItem.addEventListener("mouseup", () => {
    isDragging = false;
});

overlayItem.addEventListener("mouseleave", () => {
    isDragging = false;
});