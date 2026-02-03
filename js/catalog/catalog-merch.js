/* --- CATALOG FILTER - MERCH --- */

const merchCheckboxes = document.querySelectorAll('.merch-filter .form-input[type="checkbox"]');
const merchSelectedCount = document.querySelector('.section--merch .filter-counter .digit'); // Основной счётчик
const merchIosCheckbox = document.querySelector('.section--merch #ios-checkbox_merch');
const merchIosCount = document.querySelector('.section--merch .ios-checkbox-wrapper .digit'); // Счётчик для iOS
const merchDuplicateCheckboxesContainer = document.querySelector('.section--merch .duplicate-checkboxes');

function merchUpdateSelectedCount() {
    const count = Array.from(merchCheckboxes).filter(checkbox => checkbox.checked).length;
    merchSelectedCount.textContent = count;
    merchIosCount.textContent = count; // Обновляем счётчик для iOS

    // Обновляем состояние чекбокса iOS
    merchIosCheckbox.checked = count > 0;
}

function merchCreateDuplicateCheckbox(checkbox) {
    const duplicateCheckbox = checkbox.closest('label').cloneNode(true); // Клонируем родительский label
    merchDuplicateCheckboxesContainer.appendChild(duplicateCheckbox);
    merchDuplicateCheckboxesContainer.classList.add("active"); // Добавление active
}

function merchRemoveDuplicateCheckbox(checkbox) {
    const duplicate = Array.from(merchDuplicateCheckboxesContainer.children).find(dup => {
        return dup.querySelector('input').name === checkbox.name;
    });
	
    if (duplicate) {
        merchDuplicateCheckboxesContainer.removeChild(duplicate);
    }
	
    // Проверка оставшихся дублирующих чекбоксов
    if (merchDuplicateCheckboxesContainer.children.length === 0) {
        merchDuplicateCheckboxesContainer.classList.remove("active"); // Удаление active, если дубликатов больше нет
    }
}

merchCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            merchCreateDuplicateCheckbox(checkbox);
        } else {
            merchRemoveDuplicateCheckbox(checkbox);
        }
		
        merchUpdateSelectedCount();
    });
});

// Обработка клика по дубликату
merchDuplicateCheckboxesContainer.addEventListener('change', (event) => {
    if (event.target.matches('.section--merch .form-input[type="checkbox"]')) {
        const originalCheckbox = Array.from(merchCheckboxes).find(checkbox => checkbox.name === event.target.name);
        if (originalCheckbox) {
            originalCheckbox.checked = !originalCheckbox.checked; // Переключаем состояние оригинального чекбокса
			
            if (originalCheckbox.checked) {
                merchCreateDuplicateCheckbox(originalCheckbox);
            } else {
                merchRemoveDuplicateCheckbox(originalCheckbox);
            }
			
            merchUpdateSelectedCount();
        }
    }
});

// Обработка чекбокса iOS
merchIosCheckbox.addEventListener('change', () => {
    if (merchIosCheckbox.checked) {
        merchCheckboxes.forEach(checkbox => {
            checkbox.checked = true; // Отмечаем все чекбоксы
            merchCreateDuplicateCheckbox(checkbox); // Создаем дубликаты
        });
    } else {
        merchCheckboxes.forEach(checkbox => {
            checkbox.checked = false; // Снимаем все чекбоксы
            merchRemoveDuplicateCheckbox(checkbox); // Удаляем дубликаты
        });
    }
	
    merchUpdateSelectedCount();
});

// Инициализация счетчика
merchUpdateSelectedCount();

	/* --- CATALOG - SHOW MORE FILTERS  --- */

	const merchShowMoreButtonFilter = document.querySelector(".section--merch .merch-filter .show-more");
	const merchFilterWrapper = document.querySelector(".section--merch .merch-filter .merch-filter__wrapper");

	function merchCountHiddenCheckboxes() {
		let hiddenCount = 0;

		merchCheckboxes.forEach(checkbox => {
			const checkboxRect = checkbox.getBoundingClientRect(); // Получаем размеры и позицию элемента
			const wrapperRect = merchFilterWrapper.getBoundingClientRect(); // Получаем размеры и позицию контейнера

			// Проверяем, находится ли элемент ниже видимой области контейнера
			if (checkboxRect.top > wrapperRect.bottom) {
				hiddenCount++;
			}
		});

		return hiddenCount;
	}

	function merchUpdateHiddenCheckboxesCount() {
		const hiddenCheckboxesCount = merchCountHiddenCheckboxes();
		merchShowMoreButtonFilter.innerHTML = `<span class="digit_full">+${hiddenCheckboxesCount}</span> Показать все фильтры`;
		merchShowMoreButtonFilter.title = `Показать все фильтры (${hiddenCheckboxesCount})`;
	}

	merchUpdateHiddenCheckboxesCount();

	window.addEventListener('resize', merchUpdateHiddenCheckboxesCount);

	merchShowMoreButtonFilter.addEventListener("click", () => {
		merchFilterWrapper.classList.toggle("visible");

		if (merchFilterWrapper.classList.contains("visible")) {
			merchShowMoreButtonFilter.textContent = "Свернуть все фильтры";
			merchShowMoreButtonFilter.title = "Свернуть все фильтры";
		} else {
			const offset = 200;
			const elementPosition = merchFilterWrapper.getBoundingClientRect().top + window.scrollY;
			const offsetPosition = elementPosition - offset;

			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth'
			});
			
			// Обновление кол-ва скрытых элементов после завершения анимации
			setTimeout(() => {
				merchUpdateHiddenCheckboxesCount();
			}, 500); // Задержка = времени анимации
		}
	});


	/* --- / CATALOG - SHOW MORE FILTERS  --- */

/* --- / CATALOG FILTER - MERCH --- */



/* --- CATALOG FILTER - MERCH - MOBILE --- */

const merchFilterPopup = document.querySelector(".merch-filter-popup");
const merchFilterMobileButtonCall = document.querySelector(".section--merch .filter-button-box .button");
const merchFilterMobileButtonClose = document.querySelector(".merch-filter-popup .button-close");

merchFilterMobileButtonCall.addEventListener("click", function() {
	const scrollPosition = window.scrollY;
    document.body.classList.add("no-scroll");
    document.body.style.top = `-${scrollPosition}px`;
	merchFilterPopup.classList.add("active");
});

merchFilterMobileButtonClose.addEventListener("click", function() {
	document.body.classList.remove("no-scroll");
    const scrollPosition = document.body.style.top;
    document.body.style.top = "";
    window.scrollTo(0, parseInt(scrollPosition || "0") * -1);
	merchFilterPopup.classList.remove("active");
});

/* --- / CATALOG FILTER - MERCH - MOBILE --- */



/* --- SLIDER - MERCH --- */

const merchSection = document.querySelector(".section--merch");
const merchItems = document.querySelectorAll('.merch__item');
const merchShowMoreButton = document.querySelector('.merch__inner-right .merch__items + .show-more');
const merchShowLessButton = document.querySelector('.merch__inner-right .merch__items + .show-more + .show-less');

let merchVisibleCount;
let merchItemsPerPage;
const merchTotalItems = merchItems.length;

// Обновление параметров видимости
function merchUpdateVisibilityParams() {
    if (window.innerWidth >= 1181) {
        merchVisibleCount = 9;
        merchItemsPerPage = 9;
    } else if (window.innerWidth >= 768 && window.innerWidth < 1181) {
        merchVisibleCount = 6;
        merchItemsPerPage = 6;
    } else {
        merchVisibleCount = 3;
        merchItemsPerPage = 3;
    }
}

// Вызов при загрузке страницы
merchUpdateVisibilityParams();
merchUpdateVisibility();

//merchItems.forEach(item => {
//    const slides = item.querySelector('.slides');
//    const slideCount = slides.children.length;
//    const bulletsContainer = item.querySelector('.bullets');
//    let currentIndex = 0;
//    let autoSlideInterval;
//
//    // Создание буллетов
//    for (let i = 0; i < slideCount; i++) {
//        const bullet = document.createElement('div');
//        bullet.classList.add('bullet');
//        bullet.dataset.index = i;
//        bulletsContainer.appendChild(bullet);
//
//        bullet.addEventListener('click', () => {
//            setActiveSlide(i);
//            resetAutoSlide();
//        });
//    }
//
//    // Установка активного слайда
//    function setActiveSlide(index) {
//        currentIndex = index;
//        const translateX = -index * 100;
//        slides.style.transform = `translateX(${translateX}%)`;
//
//        bulletsContainer.querySelectorAll('.bullet').forEach((bullet, i) => {
//            bullet.classList.toggle('active', i === index);
//        });
//    }
//
//    // Установка первого слайда как активного при загрузке
//    setActiveSlide(0);
//
//    // Обработчик движения мыши только для слайдера
//    const sliderContainer = item.querySelector('.slider');
//    sliderContainer.addEventListener('mousemove', (event) => {
//        const itemWidth = sliderContainer.offsetWidth;
//        const mouseX = event.clientX - sliderContainer.getBoundingClientRect().left;
//        const sectionWidth = itemWidth / slideCount;
//
//        const index = Math.floor(mouseX / sectionWidth);
//        if (index >= 0 && index < slideCount) {
//            setActiveSlide(index);
//            resetAutoSlide();
//        }
//    });
//
//    // Обработчики для кнопок
//    const prevButton = item.querySelector('.prev');
//    const nextButton = item.querySelector('.next');
//
//    if (prevButton) {
//        prevButton.addEventListener('click', () => {
//            currentIndex = (currentIndex - 1 + slideCount) % slideCount;
//            setActiveSlide(currentIndex);
//            resetAutoSlide();
//        });
//    }
//
//    if (nextButton) {
//        nextButton.addEventListener('click', () => {
//            currentIndex = (currentIndex + 1) % slideCount;
//            setActiveSlide(currentIndex);
//            resetAutoSlide();
//        });
//    }
//
//    // Автопрокручивание
//    function autoSlide() {
//        currentIndex = (currentIndex + 1) % slideCount;
//        setActiveSlide(currentIndex);
//    }
//
//    function startAutoSlide() {
//        autoSlideInterval = setInterval(autoSlide, 5000);
//    }
//
//    function resetAutoSlide() {
//        clearInterval(autoSlideInterval);
//        startAutoSlide();
//    }
//
//    startAutoSlide();
//});

// Функция для обновления видимости слайдеров
function merchUpdateVisibility() {
    merchItems.forEach((item, index) => {
        if (index < merchVisibleCount) {
            item.classList.add('visible');
        } else {
            setTimeout(() => {
                item.classList.remove('visible');
            }, 250);
        }
    });

    // Обновление текста в кнопке "Загрузить ещё"
    merchShowMoreButton.querySelector('.digit_current').textContent = merchVisibleCount;
    merchShowMoreButton.querySelector('.digit_full').textContent = merchTotalItems;

    // Скрываем кнопку "Загрузить ещё", если нет слайдеров для показа
    merchShowMoreButton.style.display = merchVisibleCount < merchTotalItems ? 'block' : 'none';

    // Показываем кнопку "Свернуть", если больше 9 слайдов
    merchShowLessButton.style.display = merchVisibleCount > 9 ? 'block' : 'none';
}

// Обработчик для кнопки "Загрузить ещё"
merchShowMoreButton.addEventListener('click', () => {
    merchVisibleCount += merchItemsPerPage;
    merchUpdateVisibility();
});

// Обработчик для кнопки "Свернуть"
merchShowLessButton.addEventListener('click', () => {
    merchVisibleCount = (window.innerWidth >= 1181) ? 9 : (window.innerWidth >= 768 && window.innerWidth < 1181) ? 6 : 3;
    merchUpdateVisibility();

    const headerHeight = document.querySelector("header").offsetHeight;
    window.scrollTo({ top: merchSection.offsetTop - (headerHeight * 1.5), behavior: "smooth" });
});

// Обработчик изменения размера окна
window.addEventListener('resize', () => {
    merchUpdateVisibilityParams();
    merchUpdateVisibility();
});

// Инициализация видимости слайдеров
merchUpdateVisibility();

/* --- / SLIDER - merch --- */



/* --- SORTING --- */

document.addEventListener("DOMContentLoaded", function() {
    let sortingBox = document.querySelector(".sorting");
    const sortingButtons = sortingBox.querySelectorAll(".button-sorting");

    function resetActiveButtons() {
        for (let sortingButton of sortingButtons) {
            sortingButton.classList.remove("active");
            sortingButton.setAttribute("aria-pressed", "false");
        }
    }

    for (let sortingButton of sortingButtons) {
        sortingButton.addEventListener("click", function() {
            if (!this.classList.contains("active")) {
                resetActiveButtons();
                this.classList.add("active");
                this.setAttribute("aria-pressed", "true");
				
                /* Здесь вызов функции сортировки */
				/**
				 *
				*/
            } else {
//                console.log("Already active");
            }
        });
    }
});

/* --- / SORTING --- */