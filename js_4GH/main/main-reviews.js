/* --- REVIEWS - INNER SHOW MORE --- */

document.addEventListener("click", (event) => {
    const button = event.target.closest(".reviews__items .show-more");
    if (!button) return;

    const textElement = button.previousElementSibling;
    const svgArrow = button.querySelector("svg");

    const isVisible = textElement.classList.contains("visible");

    if (isVisible) {
        textElement.classList.remove("visible");
        button.querySelector(".show-more__text").textContent = "Читать полностью";
        svgArrow.style.transform = "rotate(0deg)";
    } else {
        textElement.classList.add("visible");
        button.querySelector(".show-more__text").textContent = "Скрыть";
        svgArrow.style.transform = "rotate(180deg)";
    }
});

/* --- / REVIEWS - INNER SHOW MORE --- */



/* --- REVIEWS - ITEMS NUMBER SHOM MORE / LESS --- */

document.addEventListener('DOMContentLoaded', function () {
	const reviewsSection = document.querySelector('.section--reviews');
    const reviewsContainer = document.querySelector('.section--reviews .reviews__items');
    const showMoreButton = document.querySelector('.section--reviews .reviews__items + .show-more');
    const showLessButton = document.querySelector('.section--reviews .show-less');
    const digitCurrent = document.querySelector('.section--reviews .digit_current');
    const digitFull = document.querySelector('.section--reviews .digit_full');

    const allReviews = reviewsContainer.querySelectorAll('.reviews__item');
    const totalReviews = allReviews.length;
    const initialDisplayCount = 2;
    let currentDisplayCount = initialDisplayCount;

    digitFull.textContent = totalReviews;
    updateDisplay();

    showMoreButton.addEventListener('click', function () {
        currentDisplayCount += 2;
        updateDisplay();
    });

	
	showLessButton.addEventListener('click', function () {
		currentDisplayCount = initialDisplayCount;
		updateDisplay();

		const headerHeight = document.querySelector('header').offsetHeight;
		window.scrollTo({ top: reviewsSection.offsetTop - (headerHeight * 1.875), behavior: 'smooth' });
	});


    function updateDisplay() {
        allReviews.forEach((review, index) => {
            if (index < currentDisplayCount) {
                review.classList.add('visible');
            } else {
                review.classList.remove('visible');
            }
        });

        digitCurrent.textContent = Math.min(currentDisplayCount, totalReviews);
        
        if (currentDisplayCount >= totalReviews) {
            showMoreButton.style.display = 'none';
        } else {
            showMoreButton.style.display = 'block';
        }
        
        showLessButton.style.display = currentDisplayCount > initialDisplayCount ? 'block' : 'none';
    }
});

/* */