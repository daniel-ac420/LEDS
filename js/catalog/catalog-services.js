/* --- MAIN SLIDER - SERVICES --- */

const servicesSection = document.querySelector(".content-page .section--services");
const servicesItems = document.querySelectorAll('.services__item');
const showMoreButtonServ = document.querySelector('#services .show-more');
const showLessButtonServ = document.querySelector('#services .show-less');

let visibleCountServ;
let itemsPerPageServ;
const totalItemsServ = servicesItems.length;

// Обновление параметров видимости
function updateVisibilityParamsServ() {
    if (window.innerWidth >= 768) {
        visibleCountServ = 6;
        itemsPerPageServ = 6;
    } else {
        visibleCountServ = 3;
        itemsPerPageServ = 3;
    }
}

// Вызов при загрузке страницы
updateVisibilityParamsServ();
updateVisibilityServ();

//servicesItems.forEach(item => {
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
function updateVisibilityServ() {
    servicesItems.forEach((item, index) => {
        if (index < visibleCountServ) {
            item.classList.add('visible');
			item.classList.remove("visually-hidden");
        } else {
            setTimeout(() => {
                item.classList.remove('visible');
				item.classList.add("visually-hidden");
            }, 250);
        }
    });

    // Обновление текста в кнопке "Загрузить ещё"
    showMoreButtonServ.querySelector('.digit_current').textContent = visibleCountServ;
    showMoreButtonServ.querySelector('.digit_full').textContent = totalItemsServ;

    // Скрываем кнопку "Загрузить ещё", если нет слайдеров для показа
    showMoreButtonServ.style.display = visibleCountServ < totalItemsServ ? 'block' : 'none';

    // Показываем кнопку "Свернуть", если больше 6 слайдеров
    showLessButtonServ.style.display = visibleCountServ > 6 ? 'block' : 'none';
}

// Обработчик для кнопки "Загрузить ещё"
showMoreButtonServ.addEventListener('click', () => {
    visibleCountServ += itemsPerPageServ;
    updateVisibilityServ();
});

// Обработчик для кнопки "Свернуть"
showLessButtonServ.addEventListener('click', () => {
    if (window.innerWidth >= 768) {
        visibleCountServ = 6;
    } else {
        visibleCountServ = 3;
    }
    updateVisibilityServ();

    const headerHeight = document.querySelector("header").offsetHeight;
    window.scrollTo({ top: servicesSection.offsetTop - (headerHeight * 1.5), behavior: "smooth" });
});

// Обработчик изменения размера окна
window.addEventListener('resize', () => {
    updateVisibilityParamsServ();
    updateVisibilityServ();
});

// Инициализация видимости слайдеров
updateVisibilityServ();

/* --- / MAIN SLIDER - SERVICES --- */