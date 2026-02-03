/* --- SLIDER - PRODUCTS --- */

const productsSection = document.querySelector(".section--products");
const productsItems = document.querySelectorAll(".products__item");
const showMoreButton = document.querySelector(".products__box .products__items + .show-more");
const showLessButton = document.querySelector(".products__box .products__items + .show-more + .show-less");

let visibleCount;
let itemsPerPage;
const totalItems = productsItems.length;

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

productsItems.forEach(item => {
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
    productsItems.forEach((item, index) => {
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
	
    // Показываем кнопку "Свернуть", если больше 9-и слайдеров
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
	window.scrollTo({ top: productsSection.offsetTop - (headerHeight * 1.5), behavior: "smooth" });
});

// Обработчик изменения размера окна
window.addEventListener('resize', () => {
    updateVisibilityParams();
    updateVisibility();
});

// Инициализация видимости слайдеров
updateVisibility();


/* --- / SLIDER - PRODUCTS --- */