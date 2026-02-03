/* --- MAIN FILTER - PROJECTS --- */
function checkWidth() {
    if (window.innerWidth >= 768) {
		const checkboxes = document.querySelectorAll('#projects .desktop .projects-filter .form-input[type="checkbox"]');
		const selectedCount = document.querySelector('#projects .desktop .projects-filter .filter-counter .digit');

		function updateSelectedCount() {
			const count = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;
			selectedCount.textContent = count;
		}

		checkboxes.forEach(checkbox => {
			checkbox.addEventListener('change', updateSelectedCount);
		});

		updateSelectedCount();

			/* --- SHOW MORE FILTERS  --- */
			const showMoreButtonFilter = document.querySelector('.projects__inner-left .show-more');
			const hiddenCheckboxes = document.querySelector('.projects__inner-left .hidden-checkboxes');
			const showMoreText = showMoreButtonFilter.querySelector('.projects__inner-left .show-more__text');
			const showMoreArrow = showMoreButtonFilter.querySelector('.projects__inner-left .show-more__arrow');

			showMoreButtonFilter.addEventListener('click', () => {
				hiddenCheckboxes.classList.toggle('show');

				// Меняем текст и поворот стрелки
				if (hiddenCheckboxes.classList.contains('show')) {
					setTimeout(() => {
						showMoreText.textContent = 'Скрыть';
						showMoreArrow.style.transform = 'rotate(180deg)';
					}, 250);
				} else {
					setTimeout(() => {
						showMoreText.textContent = 'Показать ещё';
						showMoreArrow.style.transform = 'rotate(0deg)';
					}, 400);
				}
			});

			/* --- / SHOW MORE FILTERS  --- */
		
//		console.log("DESKTOP");
    }
}

checkWidth();

window.addEventListener("resize", checkWidth);

/* --- / MAIN FILTER - PROJECTS --- */



/* --- MAIN SLIDER - PROJECTS --- */

const projectsSection = document.querySelector(".section--projects");
const projectsItems = document.querySelectorAll('.projects__item');
const showMoreButton = document.querySelector('.projects__inner-right .show-more');
const showLessButton = document.querySelector('.projects__inner-right .show-less');

let visibleCount = 2;
const itemsPerPage = 2;
const totalItems = projectsItems.length;

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
	
    // Показываем кнопку "Свернуть", если больше двух слайдеров
    showLessButton.style.display = visibleCount > 2 ? 'block' : 'none';
}

// Обработчик для кнопки "Загрузить ещё"
showMoreButton.addEventListener('click', () => {
    visibleCount += itemsPerPage;
    updateVisibility();
});

// Обработчик для кнопки "Свернуть"
showLessButton.addEventListener('click', () => {
    visibleCount = 2;
    updateVisibility();
	
	const headerHeight = document.querySelector("header").offsetHeight;
	window.scrollTo({ top: projectsSection.offsetTop - (headerHeight * 1.875), behavior: "smooth" });
});

// Инициализация видимости слайдеров
updateVisibility();


/* --- / MAIN SLIDER - PROJECTS --- */