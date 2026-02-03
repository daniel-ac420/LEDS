///* --- MAIN SLIDER - SPECS / SOLUTIONS --- */
//
//const specsSection = document.querySelector(".content-page .section--specializations");
//const specsItems = document.querySelectorAll('.specs__item');
//const showMoreButtonSpec = document.querySelector('#specializations .show-more');
//const showLessButtonSpec = document.querySelector('#specializations .show-less');
//
//let visibleCountSpec = 6;
//const itemsPerPageSpec = 3;
//const totalItemsSpec = specsItems.length;
//
//specsItems.forEach(item => {
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
//
//// Функция для обновления видимости слайдеров
//function updateVisibilitySpec() {
//    specsItems.forEach((item, index) => {
//        if (index < visibleCountSpec) {
//			item.classList.add('visible');
//        } else {
//			setTimeout(() => {
//				item.classList.remove('visible');
//			}, 250);
//        }
//    });
//
//	// Обновление текста в кнопке "Загрузить ещё"
//    showMoreButtonSpec.querySelector('.digit_current').textContent = visibleCountSpec;
//	showMoreButtonSpec.querySelector('.digit_full').textContent = totalItemsSpec;
//	
//    // Скрываем кнопку "Загрузить ещё", если нет слайдеров для показа
//    showMoreButtonSpec.style.display = visibleCountSpec < totalItemsSpec ? 'block' : 'none';
//	
//    // Показываем кнопку "Свернуть", если больше двух слайдеров
//    showLessButtonSpec.style.display = visibleCountSpec > 6 ? 'block' : 'none';
//}
//
//// Обработчик для кнопки "Загрузить ещё"
//showMoreButtonSpec.addEventListener('click', () => {
//    visibleCountSpec += itemsPerPageSpec;
//    updateVisibilitySpec();
//});
//
//// Обработчик для кнопки "Свернуть"
//showLessButtonSpec.addEventListener('click', () => {
//    visibleCountSpec = 6;
//    updateVisibilitySpec();
//	
//	const headerHeight = document.querySelector("header").offsetHeight;
//	window.scrollTo({ top: specsSection.offsetTop - (headerHeight * 1.5), behavior: "smooth" });
//});
//
//// Инициализация видимости слайдеров
//updateVisibilitySpec();
//
//
///* --- / MAIN SLIDER - SPECS / SOLUTIONS --- */





/* --- MAIN SLIDER - SPECS / SOLUTIONS --- */

const specsSection = document.querySelector(".content-page .section--specializations");
const specsItems = document.querySelectorAll('.specs__item');
const showMoreButtonSpec = document.querySelector('#specializations .show-more');
const showLessButtonSpec = document.querySelector('#specializations .show-less');

let visibleCountSpec;
let itemsPerPageSpec;
const totalItemsSpec = specsItems.length;

// Обновление параметров видимости
function updateVisibilityParamsSpec() {
    if (window.innerWidth >= 768) {
        visibleCountSpec = 6;
        itemsPerPageSpec = 6;
    } else {
        visibleCountSpec = 3;
        itemsPerPageSpec = 3;
    }
}

// Вызов при загрузке страницы
updateVisibilityParamsSpec();
updateVisibilitySpec();

specsItems.forEach(item => {
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
function updateVisibilitySpec() {
    specsItems.forEach((item, index) => {
        if (index < visibleCountSpec) {
            item.classList.add('visible');
        } else {
            setTimeout(() => {
                item.classList.remove('visible');
            }, 250);
        }
    });

    // Обновление текста в кнопке "Загрузить ещё"
    showMoreButtonSpec.querySelector('.digit_current').textContent = visibleCountSpec;
    showMoreButtonSpec.querySelector('.digit_full').textContent = totalItemsSpec;

    // Скрываем кнопку "Загрузить ещё", если нет слайдеров для показа
    showMoreButtonSpec.style.display = visibleCountSpec < totalItemsSpec ? 'block' : 'none';

    // Показываем кнопку "Свернуть", если больше 6 слайдеров
    showLessButtonSpec.style.display = visibleCountSpec > 6 ? 'block' : 'none';
}

// Обработчик для кнопки "Загрузить ещё"
showMoreButtonSpec.addEventListener('click', () => {
    visibleCountSpec += itemsPerPageSpec;
    updateVisibilitySpec();
});

// Обработчик для кнопки "Свернуть"
showLessButtonSpec.addEventListener('click', () => {
    if (window.innerWidth >= 768) {
        visibleCountSpec = 6;
    } else {
        visibleCountSpec = 3;
    }
    updateVisibilitySpec();

    const headerHeight = document.querySelector("header").offsetHeight;
    window.scrollTo({ top: specsSection.offsetTop - (headerHeight * 1.5), behavior: "smooth" });
});

// Обработчик изменения размера окна
window.addEventListener('resize', () => {
    updateVisibilityParamsSpec();
    updateVisibilitySpec();
});

// Инициализация видимости слайдеров
updateVisibilitySpec();

/* --- / MAIN SLIDER - SPECS / SOLUTIONS --- */