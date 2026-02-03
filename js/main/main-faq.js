/* --- FAQ - SHOW MORE/LESS --- */

document.addEventListener("DOMContentLoaded", function() {
    const faqItems = document.querySelectorAll(".faq__item:not(.faq__item-to-form)");

    faqItems.forEach(item => {
        const head = item.querySelector(".faq__item-head");
        const arrow = item.querySelector(".faq__item-arow");
        const body = item.querySelector(".faq__item-body");

        head.addEventListener("click", function() {
            const isOpen = body.classList.toggle("open");
            arrow.classList.toggle("open", isOpen);
        });
    });
});

/* --- / FAQ - SHOW MORE/LESS --- */


/* --- FAQ - ITEMS NUMBER SHOM MORE / LESS --- */

document.addEventListener("DOMContentLoaded", function () {
	const faqSection = document.querySelector(".section--faq");
    const faqContainer = document.querySelector(".section--faq .faq__items");
    const showMoreButton = document.querySelector(".section--faq .show-more");
    const showLessButton = document.querySelector(".section--faq .show-less");
    const digitCurrent = document.querySelector(".section--faq .digit_current");
    const digitFull = document.querySelector(".section--faq .digit_full");

    const allReviews = faqContainer.querySelectorAll(".faq__item");
    const totalReviews = allReviews.length;
    const initialDisplayCount = 4;
    let currentDisplayCount = initialDisplayCount;

    digitFull.textContent = totalReviews;
    updateDisplay();

    showMoreButton.addEventListener("click", function () {
        currentDisplayCount += 4;
        updateDisplay();
    });

	
	showLessButton.addEventListener("click", function () {
		currentDisplayCount = initialDisplayCount;
		updateDisplay();

		const headerHeight = document.querySelector("header").offsetHeight;
		window.scrollTo({ top: faqSection.offsetTop - (headerHeight * 1.875), behavior: "smooth" });
	});


    function updateDisplay() {
        allReviews.forEach((review, index) => {
            if (index < currentDisplayCount) {
                review.classList.add("visible");
            } else {
                review.classList.remove("visible");
            }
        });

        digitCurrent.textContent = Math.min(currentDisplayCount, totalReviews);
        
        if (currentDisplayCount >= totalReviews) {
            showMoreButton.style.display = "none";
        } else {
            showMoreButton.style.display = "block";
        }
        
        showLessButton.style.display = currentDisplayCount > initialDisplayCount ? "block" : "none";
    }
});

/* --- / FAQ - ITEMS NUMBER SHOM MORE / LESS --- */