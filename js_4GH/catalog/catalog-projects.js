/* --- CATALOG FILTER - PROJECTS --- */

const checkboxes = document.querySelectorAll('.projects-filter .form-input[type="checkbox"]');
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

//function createDuplicateCheckbox(checkbox) {
//    const duplicateCheckbox = checkbox.closest('label').cloneNode(true); // Клонируем родительский label
//    duplicateCheckboxesContainer.appendChild(duplicateCheckbox);
//	
////	duplicateCheckboxesContainer.classList.add("active");
//}
//
//function removeDuplicateCheckbox(checkbox) {
//    const duplicate = Array.from(duplicateCheckboxesContainer.children).find(dup => {
//        return dup.querySelector('input').name === checkbox.name;
//    });
//	
//    if (duplicate) {
//        duplicateCheckboxesContainer.removeChild(duplicate);
//    }
//	
////	duplicateCheckboxesContainer.classList.remove("active");
//}

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
//	const showMoreButtonFilter = document.querySelector(".show-more");
//	const filterWrapper = document.querySelector(".content-page .section--projects .projects-filter .projects-filter__wrapper");
//
//	showMoreButtonFilter.addEventListener("click", () => {
//		filterWrapper.classList.toggle("visible");
//	});

	const showMoreButtonFilter = document.querySelector(".show-more");
	const filterWrapper = document.querySelector(".content-page .section--projects .projects-filter .projects-filter__wrapper");

//	showMoreButtonFilter.addEventListener("click", () => {
//		filterWrapper.classList.toggle("visible");
//
//		if (filterWrapper.classList.contains("visible")) {
//			showMoreButtonFilter.textContent = "Свернуть все фильтры";
//			showMoreButtonFilter.title = "Свернуть все фильтры";
//		} else {
//			showMoreButtonFilter.textContent = "Показать все фильтры";
//			showMoreButtonFilter.title = "Показать все фильтры";
//
//			const offset = 200;
//			const elementPosition = filterWrapper.getBoundingClientRect().top + window.scrollY;
//			const offsetPosition = elementPosition - offset;
//
//			window.scrollTo({
//				top: offsetPosition,
//				behavior: 'smooth'
//			});
//		}
//	});

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
		showMoreButtonFilter.innerHTML = `<span class="digit_full">+${hiddenCheckboxesCount}</span> Показать все фильтры`;
		showMoreButtonFilter.title = `Показать все фильтры (${hiddenCheckboxesCount})`;
	}

	updateHiddenCheckboxesCount();

	window.addEventListener('resize', updateHiddenCheckboxesCount);

	showMoreButtonFilter.addEventListener("click", () => {
		filterWrapper.classList.toggle("visible");

		if (filterWrapper.classList.contains("visible")) {
			showMoreButtonFilter.textContent = "Свернуть все фильтры";
			showMoreButtonFilter.title = "Свернуть все фильтры";
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

/* --- / CATALOG FILTER - PROJECTS --- */



/* --- CATALOG FILTER - PROJECTS - MOBILE --- */

const filterPopup = document.querySelector(".projects-filter-popup");
const filterMobileButtonCall = document.querySelector(".filter-button-box .button");
const filterMobileButtonClose = document.querySelector(".projects-filter-popup .button-close");

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

/* --- / CATALOG FILTER - PROJECTS - MOBILE --- */



/* --- SLIDER - PROJECTS --- */

const projectsSection = document.querySelector(".section--projects");
const projectsItems = document.querySelectorAll('.projects__item');
const showMoreButton = document.querySelector('.projects__inner-right .projects__items + .show-more');
const showLessButton = document.querySelector('.projects__inner-right .projects__items + .show-more + .show-less');

let visibleCount;
let itemsPerPage;
const totalItems = projectsItems.length;

// Обновление параметров видимости
function updateVisibilityParams() {
    if (window.innerWidth >= 1181) {
        visibleCount = 9;
        itemsPerPage = 9;
    } else if (window.innerWidth >= 768 && window.innerWidth < 1181) {
        visibleCount = 6;
        itemsPerPage = 6;
    } else {
        visibleCount = 3;
        itemsPerPage = 3;
    }
}

// Вызов при загрузке страницы
updateVisibilityParams();
updateVisibility();

projectsItems.forEach(item => {
    const slides = item.querySelector('.slides');
    const slideCount = slides.children.length;
    const bulletsContainer = item.querySelector('.bullets');
    let currentIndex = 0;
    let autoSlideInterval;

    // Создание буллетов
    for (let i = 0; i < slideCount; i++) {
        const bullet = document.createElement('div');
        bullet.classList.add('bullet');
        bullet.dataset.index = i;
        bulletsContainer.appendChild(bullet);

        bullet.addEventListener('click', () => {
            setActiveSlide(i);
            resetAutoSlide();
        });
    }

    // Установка активного слайда
    function setActiveSlide(index) {
        currentIndex = index;
        const translateX = -index * 100;
        slides.style.transform = `translateX(${translateX}%)`;

        bulletsContainer.querySelectorAll('.bullet').forEach((bullet, i) => {
            bullet.classList.toggle('active', i === index);
        });
    }

    // Установка первого слайда как активного при загрузке
    setActiveSlide(0);

    // Обработчик движения мыши только для слайдера
    const sliderContainer = item.querySelector('.slider');
    sliderContainer.addEventListener('mousemove', (event) => {
        const itemWidth = sliderContainer.offsetWidth;
        const mouseX = event.clientX - sliderContainer.getBoundingClientRect().left;
        const sectionWidth = itemWidth / slideCount;

        const index = Math.floor(mouseX / sectionWidth);
        if (index >= 0 && index < slideCount) {
            setActiveSlide(index);
            resetAutoSlide();
        }
    });

    // Обработчики для кнопок
    const prevButton = item.querySelector('.prev');
    const nextButton = item.querySelector('.next');

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slideCount) % slideCount;
            setActiveSlide(currentIndex);
            resetAutoSlide();
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slideCount;
            setActiveSlide(currentIndex);
            resetAutoSlide();
        });
    }

    // Автопрокручивание
    function autoSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        setActiveSlide(currentIndex);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(autoSlide, 5000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    startAutoSlide();
});

// Функция для обновления видимости слайдеров
function updateVisibility() {
    projectsItems.forEach((item, index) => {
        if (index < visibleCount) {
            item.classList.add('visible');
        } else {
            setTimeout(() => {
                item.classList.remove('visible');
            }, 250);
        }
    });

    // Обновление текста в кнопке "Загрузить ещё"
    showMoreButton.querySelector('.digit_current').textContent = visibleCount;
    showMoreButton.querySelector('.digit_full').textContent = totalItems;

    // Скрываем кнопку "Загрузить ещё", если нет слайдеров для показа
    showMoreButton.style.display = visibleCount < totalItems ? 'block' : 'none';

    // Показываем кнопку "Свернуть", если больше 9 слайдов
    showLessButton.style.display = visibleCount > 9 ? 'block' : 'none';
}

// Обработчик для кнопки "Загрузить ещё"
showMoreButton.addEventListener('click', () => {
    visibleCount += itemsPerPage;
    updateVisibility();
});

// Обработчик для кнопки "Свернуть"
showLessButton.addEventListener('click', () => {
    visibleCount = (window.innerWidth >= 1181) ? 9 : (window.innerWidth >= 768 && window.innerWidth < 1181) ? 6 : 3;
    updateVisibility();

    const headerHeight = document.querySelector("header").offsetHeight;
    window.scrollTo({ top: projectsSection.offsetTop - (headerHeight * 1.5), behavior: "smooth" });
});

// Обработчик изменения размера окна
window.addEventListener('resize', () => {
    updateVisibilityParams();
    updateVisibility();
});

// Инициализация видимости слайдеров
updateVisibility();

/* --- / SLIDER - PROJECTS --- */



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