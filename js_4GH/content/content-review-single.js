const reviewOverlay = document.getElementById("reviewOverlay");
const reviewOverlayItem = document.getElementById("reviewOverlayItem");
const reviewCloseBtn = document.getElementById("reviewClose");
const reviewPrevBtn = document.getElementById("reviewPrev");
const reviewNextBtn = document.getElementById("reviewNext");
const reviewGalleryItems = document.querySelectorAll(".reviews__item-gallery-item");
let currentReviewIndex = 0;

// Открытие оверлея
function openReviewOverlay(index) {
    currentReviewIndex = index;
    updateReviewOverlayContent();
    document.documentElement.classList.add("no-scroll");
    document.body.classList.add("no-scroll");
    reviewOverlay.style.display = "flex";
}

// Обновление содержимого оверлея
function updateReviewOverlayContent() {
    const item = reviewGalleryItems[currentReviewIndex];
    reviewOverlayItem.classList.remove("fade-in");
    reviewOverlayItem.classList.add("fade-out");

    setTimeout(() => {
        reviewOverlayItem.innerHTML = item.innerHTML;
        void reviewOverlayItem.offsetWidth;
        reviewOverlayItem.classList.remove("fade-out");
        reviewOverlayItem.classList.add("fade-in");
    }, 250);
}

// Закрытие оверлея
function closeReviewOverlay() {
    reviewOverlay.style.display = "none";
    document.documentElement.classList.remove("no-scroll");
    document.body.classList.remove("no-scroll");
}

// Закрытие оверлея при клике на "x"
reviewCloseBtn.addEventListener("click", closeReviewOverlay);

// Закрытие оверлея при нажатии на Esc
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeReviewOverlay();
    }
});

// GALLERY ELEMENTS CLICK OPENING
reviewGalleryItems.forEach((item, index) => {
    item.addEventListener("click", () => openReviewOverlay(index));
});

// NEXT BUTTON
reviewNextBtn.addEventListener("click", (event) => {
    currentReviewIndex = (currentReviewIndex + 1) % reviewGalleryItems.length;
    updateReviewOverlayContent();
});

// PREV BUTTON
reviewPrevBtn.addEventListener("click", (event) => {
    currentReviewIndex = (currentReviewIndex - 1 + reviewGalleryItems.length) % reviewGalleryItems.length;
    updateReviewOverlayContent();
});

// Закрытие оверлея при клике ВНЕ контента
reviewOverlay.addEventListener("click", (event) => {
    if (!event.target.closest(".overlay__item") && !event.target.closest(".prev") && !event.target.closest(".next")) {
        closeReviewOverlay();
    }
});


/* --- SWIPE --- */
let revTouchrevStartX = 0;
let revTouchEndX = 0;

// Касание
reviewOverlay.addEventListener("touchstart", (event) => {
    revTouchrevStartX = event.changedTouches[0].clientX;
});

// Завершение касания
reviewOverlay.addEventListener("touchend", (event) => {
    revTouchEndX = event.changedTouches[0].clientX;
    handleReviewSwipe();
});

function handleReviewSwipe() {
    if (revTouchEndX < revTouchrevStartX) {
        reviewNextBtn.click(); // Свайп влево
    } else if (revTouchEndX > revTouchrevStartX) {
        reviewPrevBtn.click(); // Свайп вправо
    }
}


/* DESKTOP SWIPE */
let isDraggingReviews = false;
let revStartX = 0;

// Начало перетаскивания
reviewOverlayItem.addEventListener("mousedown", (event) => {
    isDraggingReviews = true;
    revStartX = event.clientX; // Сохраняем начальную позицию мыши
});

// Движение мыши
reviewOverlayItem.addEventListener("mousemove", (event) => {
    if (!isDraggingReviews) return;
    const currentX = event.clientX;
    const diffX = currentX - revStartX;

    if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
            reviewPrevBtn.click();
        } else {
            reviewNextBtn.click();
        }
        isDraggingReviews = false;
    }
});

// Завершение перетаскивания
reviewOverlayItem.addEventListener("mouseup", () => {
    isDraggingReviews = false;
});

// Выход курсора за пределы элемента
reviewOverlayItem.addEventListener("mouseleave", () => {
    isDraggingReviews = false;
});



/* --- REVIEW SINGLE - BUTTON SHOW MORE --- */
document.addEventListener("DOMContentLoaded", function() {
    const showMoreButtons = document.querySelectorAll(".section--review-single .button.show-more");

    showMoreButtons.forEach(button => {
        button.addEventListener("click", function() {
            const reviewsItemText = this.closest(".reviews__item").querySelector(".reviews__item-text");
            const arrow = this.querySelector(".show-more__arrow");
            const text = this.querySelector(".show-more__text");

            reviewsItemText.classList.toggle("visible");
            arrow.classList.toggle("rotate");

            if (reviewsItemText.classList.contains("visible")) {
                text.textContent = "Скрыть";
            } else {
                text.textContent = "Читать полностью";
            }
        });
    });
});
