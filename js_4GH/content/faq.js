/* --- CATALOG FILTER - FAQ --- */

const checkboxes = document.querySelectorAll('.faq-filter .form-input[type="checkbox"]');
const selectedCount = document.querySelector('.filter-counter .digit'); // Основной счётчик
const iosCheckbox = document.querySelector('#ios-checkbox');
const iosCount = document.querySelector('.ios-checkbox-wrapper .digit'); // Счётчик для iOS
const duplicateCheckboxesContainer = document.querySelector('.duplicate-checkboxes');

function updateSelectedCount() {
    const count = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;
    selectedCount.textContent = count;
    iosCount.textContent = count; // Обновляем счётчик для iOS

    // Обновляем состояние чекбокса iOS
    iosCheckbox.checked = count > 0;
}

function createDuplicateCheckbox(checkbox) {
    const duplicateCheckbox = checkbox.closest('label').cloneNode(true); // Клонируем родительский label
    duplicateCheckboxesContainer.appendChild(duplicateCheckbox);
    duplicateCheckboxesContainer.classList.add("active"); // Добавление active
}

function removeDuplicateCheckbox(checkbox) {
    const duplicate = Array.from(duplicateCheckboxesContainer.children).find(dup => {
        return dup.querySelector('input').name === checkbox.name;
    });
	
    if (duplicate) {
        duplicateCheckboxesContainer.removeChild(duplicate);
    }
	
    // Проверка оставшихся дублирующих чекбоксов
    if (duplicateCheckboxesContainer.children.length === 0) {
        duplicateCheckboxesContainer.classList.remove("active"); // Удаление active, если дубликатов больше нет
    }
}

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            createDuplicateCheckbox(checkbox);
        } else {
            removeDuplicateCheckbox(checkbox);
        }
		
        updateSelectedCount();
    });
});

// Обработка клика по дубликату
duplicateCheckboxesContainer.addEventListener('change', (event) => {
    if (event.target.matches('.form-input[type="checkbox"]')) {
        const originalCheckbox = Array.from(checkboxes).find(checkbox => checkbox.name === event.target.name);
        if (originalCheckbox) {
            originalCheckbox.checked = !originalCheckbox.checked; // Переключаем состояние оригинального чекбокса
			
            if (originalCheckbox.checked) {
                createDuplicateCheckbox(originalCheckbox);
            } else {
                removeDuplicateCheckbox(originalCheckbox);
            }
			
            updateSelectedCount();
        }
    }
});

// Обработка чекбокса iOS
iosCheckbox.addEventListener('change', () => {
    if (iosCheckbox.checked) {
        checkboxes.forEach(checkbox => {
            checkbox.checked = true; // Отмечаем все чекбоксы
            createDuplicateCheckbox(checkbox); // Создаем дубликаты
        });
    } else {
        checkboxes.forEach(checkbox => {
            checkbox.checked = false; // Снимаем все чекбоксы
            removeDuplicateCheckbox(checkbox); // Удаляем дубликаты
        });
    }
	
    updateSelectedCount();
});

// Инициализация счетчика
updateSelectedCount();


	/* --- CATALOG - SHOW MORE FILTERS  --- */

	const showMoreButtonFilter = document.querySelector(".show-more");
	const filterWrapper = document.querySelector(".content-page .section--faq .faq-filter .faq-filter__wrapper");

	function countHiddenCheckboxes() {
		let hiddenCount = 0;

		checkboxes.forEach(checkbox => {
			const checkboxRect = checkbox.getBoundingClientRect(); // Получаем размеры и позицию элемента
			const wrapperRect = filterWrapper.getBoundingClientRect(); // Получаем размеры и позицию контейнера

			// Проверяем, находится ли элемент ниже видимой области контейнера
			if (checkboxRect.top > wrapperRect.bottom) {
				hiddenCount++;
			}
		});

		return hiddenCount;
	}

	function updateHiddenCheckboxesCount() {
		const hiddenCheckboxesCount = countHiddenCheckboxes();
		showMoreButtonFilter.innerHTML = `<span class="digit_full">+${hiddenCheckboxesCount}</span> Показать все темы`;
		showMoreButtonFilter.title = `Показать все темы (${hiddenCheckboxesCount})`;
	}

	updateHiddenCheckboxesCount();

	window.addEventListener('resize', updateHiddenCheckboxesCount);

	showMoreButtonFilter.addEventListener("click", () => {
		filterWrapper.classList.toggle("visible");

		if (filterWrapper.classList.contains("visible")) {
			showMoreButtonFilter.textContent = "Свернуть все темы";
			showMoreButtonFilter.title = "Свернуть все темы";
		} else {
			const offset = 200;
			const elementPosition = filterWrapper.getBoundingClientRect().top + window.scrollY;
			const offsetPosition = elementPosition - offset;

			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth'
			});
			
			// Обновление кол-ва скрытых элементов после завершения анимации
			setTimeout(() => {
				updateHiddenCheckboxesCount();
			}, 500); // Задержка = времени анимации
		}
	});

	/* --- / CATALOG - SHOW MORE FILTERS  --- */

/* --- / CATALOG FILTER - FAQ --- */



/* --- CATALOG FILTER - FAQ - MOBILE --- */

const filterPopup = document.querySelector(".faq-filter-popup");
const filterMobileButtonCall = document.querySelector(".filter-button-box .button");
const filterMobileButtonClose = document.querySelector(".faq-filter-popup .button-close");

filterMobileButtonCall.addEventListener("click", function() {
	const scrollPosition = window.scrollY;
    document.body.classList.add("no-scroll");
    document.body.style.top = `-${scrollPosition}px`;
	filterPopup.classList.add("active");
});

filterMobileButtonClose.addEventListener("click", function() {
	document.body.classList.remove("no-scroll");
    const scrollPosition = document.body.style.top;
    document.body.style.top = "";
    window.scrollTo(0, parseInt(scrollPosition || "0") * -1);
	filterPopup.classList.remove("active");
});

/* --- / CATALOG FILTER - FAQ - MOBILE --- */



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

//document.addEventListener("DOMContentLoaded", function () {
//	const faqSection = document.querySelector(".section--faq");
//    const faqContainer = document.querySelector(".section--faq .faq__items");
//    const showMoreButton = document.querySelector(".section--faq .faq__inner + .faq__wrapper .show-more");
//    const showLessButton = document.querySelector(".section--faq .show-less");
//    const digitCurrent = document.querySelector(".section--faq .digit_current");
//    const digitFull = document.querySelector(".section--faq .faq__inner + .faq__wrapper .digit_full");
//
//    const allReviews = faqContainer.querySelectorAll(".faq__item");
//    const totalReviews = allReviews.length;
//    const initialDisplayCount = 8;
//    let currentDisplayCount = initialDisplayCount;
//
//    digitFull.textContent = totalReviews;
//    updateDisplay();
//
//    showMoreButton.addEventListener("click", function () {
//        currentDisplayCount += 4;
//        updateDisplay();
//    });
//
//	
//	showLessButton.addEventListener("click", function () {
//		currentDisplayCount = initialDisplayCount;
//		updateDisplay();
//
//		const headerHeight = document.querySelector("header").offsetHeight;
//		window.scrollTo({ top: faqSection.offsetTop - (headerHeight * 1.875), behavior: "smooth" });
//	});
//
//
//    function updateDisplay() {
//        allReviews.forEach((review, index) => {
//            if (index < currentDisplayCount) {
//                review.classList.add("visible");
//				review.classList.remove("visually-hidden");
//            } else {
//                review.classList.remove("visible");
//				review.classList.add("visually-hidden");
//            }
//        });
//
//        digitCurrent.textContent = Math.min(currentDisplayCount, totalReviews);
//        
//        if (currentDisplayCount >= totalReviews) {
//            showMoreButton.style.display = "none";
//        } else {
//            showMoreButton.style.display = "block";
//        }
//        
//        showLessButton.style.display = currentDisplayCount > initialDisplayCount ? "block" : "none";
//    }
//});


//document.addEventListener("DOMContentLoaded", function () {
//	const faqSection = document.querySelector(".section--faq");
//	const faqContainer = document.querySelector(".section--faq .faq__items");
//	const showMoreButton = document.querySelector(".section--faq .faq__inner + .faq__wrapper .show-more");
//	const showLessButton = document.querySelector(".section--faq .show-less");
//	const digitCurrent = document.querySelector(".section--faq .digit_current");
//	const digitFull = document.querySelector(".section--faq .faq__inner + .faq__wrapper .digit_full");
//
//	const allReviews = faqContainer.querySelectorAll(".faq__item");
//	const totalReviews = allReviews.length;
//
//	let initialDisplayCount;
//	let currentDisplayCount;
//
//	// Определение количества отображаемых элементов на старте
//	function updateFaqVisibilityParams() {
//		if (window.innerWidth <= 1024) {
//			initialDisplayCount = 4;
//		} else {
//			initialDisplayCount = 8;
//		}
//		// Не сбрасываем currentDisplayCount — пусть остаётся
//	}
//
//	// Основная функция отображения/скрытия элементов
//	function updateDisplay() {
//		allReviews.forEach((review, index) => {
//			if (index < currentDisplayCount) {
//				review.classList.add("visible");
//				review.classList.remove("visually-hidden");
//			} else {
//				review.classList.remove("visible");
//				review.classList.add("visually-hidden");
//			}
//		});
//
//		digitCurrent.textContent = Math.min(currentDisplayCount, totalReviews);
//		digitFull.textContent = totalReviews;
//
//		showMoreButton.style.display = currentDisplayCount >= totalReviews ? "none" : "block";
//		showLessButton.style.display = currentDisplayCount > initialDisplayCount ? "block" : "none";
//	}
//
//	// Обработчик кнопки "Показать ещё"
//	showMoreButton.addEventListener("click", function () {
//		currentDisplayCount += 4;
//		updateDisplay();
//	});
//
//	// Обработчик кнопки "Свернуть"
//	showLessButton.addEventListener("click", function () {
//		currentDisplayCount = initialDisplayCount;
//		updateDisplay();
//
//		const headerHeight = document.querySelector("header").offsetHeight;
//		window.scrollTo({ top: faqSection.offsetTop - (headerHeight * 1.875), behavior: "smooth" });
//	});
//
//	// Адаптивная логика при изменении размера окна
//	window.addEventListener("resize", () => {
//		const previousInitial = initialDisplayCount;
//		updateFaqVisibilityParams();
//
//		// Если уменьшили экран, и current меньше нового initial — увеличиваем до initial
//		if (currentDisplayCount < initialDisplayCount) {
//			currentDisplayCount = initialDisplayCount;
//		}
//
//		// Перерисовка
//		updateDisplay();
//	});
//
//	// Инициализация при загрузке
//	updateFaqVisibilityParams();
//	currentDisplayCount = initialDisplayCount;
//	updateDisplay();
//});


document.addEventListener("DOMContentLoaded", function () {
	const faqSection = document.querySelector(".section--faq");
	const faqContainer = document.querySelector(".section--faq .faq__items");
	const showMoreButton = document.querySelector(".section--faq .faq__inner + .faq__wrapper .show-more");
	const showLessButton = document.querySelector(".section--faq .show-less");
	const digitCurrent = document.querySelector(".section--faq .digit_current");
	const digitFull = document.querySelector(".section--faq .faq__inner + .faq__wrapper .digit_full");

	const allReviews = faqContainer.querySelectorAll(".faq__item");
	const totalReviews = allReviews.length;

	let initialDisplayCount;
	let currentDisplayCount;

	// Определение количества отображаемых элементов на старте
	function updateFaqVisibilityParams() {
		if (window.innerWidth <= 1024) {
			initialDisplayCount = 4;
		} else {
			initialDisplayCount = 8;
		}
		// Не сбрасываем currentDisplayCount — пусть остаётся
	}

	// Основная функция отображения/скрытия элементов
	function updateDisplay() {
		allReviews.forEach((review, index) => {
			if (index < currentDisplayCount) {
				review.classList.add("visible");
				review.classList.remove("visually-hidden");
			} else {
				review.classList.remove("visible");
				review.classList.add("visually-hidden");
			}
		});

		digitCurrent.textContent = Math.min(currentDisplayCount, totalReviews);
		digitFull.textContent = totalReviews;

		showMoreButton.style.display = currentDisplayCount >= totalReviews ? "none" : "block";
		showLessButton.style.display = currentDisplayCount > initialDisplayCount ? "block" : "none";
	}

	// Обработчик кнопки "Показать ещё"
	showMoreButton.addEventListener("click", function () {
		currentDisplayCount += 4;
		updateDisplay();
	});

	// Обработчик кнопки "Свернуть"
	showLessButton.addEventListener("click", function () {
		currentDisplayCount = initialDisplayCount;
		updateDisplay();

		const headerHeight = document.querySelector("header").offsetHeight;
		window.scrollTo({ top: faqSection.offsetTop - (headerHeight * 1.875), behavior: "smooth" });
	});

	// Debounce-функция
	function debounce(func, delay) {
		let timeout;
		return function () {
			clearTimeout(timeout);
			timeout = setTimeout(() => func.apply(this, arguments), delay);
		};
	}

	// Адаптивная логика при изменении размера окна с debounce
	window.addEventListener("resize", debounce(() => {
		const previousInitial = initialDisplayCount;
		updateFaqVisibilityParams();

		// Если уменьшили экран, и currentDisplayCount меньше нового initial — увеличиваем до initial
		if (currentDisplayCount < initialDisplayCount) {
			currentDisplayCount = initialDisplayCount;
		}

		// Перерисовка
		updateDisplay();
	}, 200));

	// Инициализация при загрузке
	updateFaqVisibilityParams();
	currentDisplayCount = initialDisplayCount;
	updateDisplay();
});



/* --- / FAQ - ITEMS NUMBER SHOM MORE / LESS --- */