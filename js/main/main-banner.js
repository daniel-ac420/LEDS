/* --- MAIN BANNER - RIGHT PART --- */

const sliderBannerMainRightItems = document.querySelectorAll(".banner__part-right .banner-main-slider__item");

sliderBannerMainRightItems.forEach(item => {
    const slides = item.querySelector(".slides");
    const slideCount = slides.children.length;
    const bulletsContainer = item.querySelector(".bullets");
    let currentIndex = 0;
    let autoSlideInterval;

    // Создание буллетов
    for (let i = 0; i < slideCount; i++) {
        const bullet = document.createElement("div");
        bullet.classList.add("bullet");
        bullet.dataset.index = i;
        bulletsContainer.appendChild(bullet);

        bullet.addEventListener("click", () => {
            setActiveSlide(i);
            resetAutoSlide();
        });
    }

    // Установка активного слайда
    function setActiveSlide(index) {
        currentIndex = index;
        const translateX = -index * 100;
        slides.style.transform = `translateX(${translateX}%)`;

        bulletsContainer.querySelectorAll(".bullet").forEach((bullet, i) => {
            bullet.classList.toggle("active", i === index);
        });
    }

    // Установка первого слайда как активного при загрузке
    setActiveSlide(0);

    // Обработчик движения мыши для слайдера
    const sliderContainer = item.querySelector(".slider");
	
    sliderContainer.addEventListener("mousemove", (event) => {
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
    const prevButton = item.querySelector(".prev");
    const nextButton = item.querySelector(".next");

    if (prevButton) {
        prevButton.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + slideCount) % slideCount;
            setActiveSlide(currentIndex);
            resetAutoSlide();
        });
    }

    if (nextButton) {
        nextButton.addEventListener("click", () => {
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

/* --- / MAIN BANNER - RIGHT PART --- */



/* --- MAIN BANNER - LEFT PART --- */

const sliderBannerMainLeftItems = document.querySelectorAll(".banner__part-left .banner-main-slider__item");

sliderBannerMainLeftItems.forEach(item => {
    const slides = item.querySelector(".slides");
    const slideCount = slides.children.length;
    const bulletsContainer = item.querySelector(".bullets");
    let currentIndex = 0;
    let autoSlideInterval;
    let fillProgressInterval;

    // Создание буллетов
    for (let i = 0; i < slideCount; i++) {
        const bullet = document.createElement("div");
        bullet.classList.add("bullet");
        bullet.dataset.index = i;

        bulletsContainer.appendChild(bullet);

        bullet.addEventListener("click", () => {
            setActiveSlide(i);
            resetAutoSlide();
        });
    }

    // Установка активного слайда
    function setActiveSlide(index) {
        currentIndex = index;
        const translateX = -index * 100;
        slides.style.transform = `translateX(${translateX}%)`;

        bulletsContainer.querySelectorAll(".bullet").forEach((bullet, i) => {
            bullet.classList.toggle("active", i === index);
            if (i === index) {
                resetFillProgress();
            } else {
                resetBulletFill(bullet);
            }
        });
    }

    // Заполнение активного буллета
    function fillActiveBullet() {
        const activeBullet = bulletsContainer.querySelector(".bullet.active");
        let fillWidth = 0;

        fillProgressInterval = setInterval(() => {
            if (fillWidth >= 100) {
                clearInterval(fillProgressInterval);
            } else {
                fillWidth += 1;
                activeBullet.style.background = `linear-gradient(to right, var(--colorYellow) ${fillWidth}%, var(--colorWhite) ${fillWidth}%)`;
            }
        }, 100);
    }

    // Сброс заполнения активного буллета
    function resetFillProgress() {
        clearInterval(fillProgressInterval);
        fillActiveBullet();
    }

    // Плавный сброс заливки для неактивного буллета
    function resetBulletFill(bullet) {
        bullet.style.transition = 'background 0.75s';
        bullet.style.background = 'var(--colorWhite)';
    }

    // Установка первого слайда как активного при загрузке
    setActiveSlide(0);

    // Обработчик движения мыши для слайдера
    const sliderContainer = item.querySelector(".slider");
	
    sliderContainer.addEventListener("mousemove", (event) => {
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
    const prevButton = item.querySelector(".prev");
    const nextButton = item.querySelector(".next");

    if (prevButton) {
        prevButton.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + slideCount) % slideCount;
            setActiveSlide(currentIndex);
            resetAutoSlide();
        });
    }

    if (nextButton) {
        nextButton.addEventListener("click", () => {
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
        autoSlideInterval = setInterval(autoSlide, 10000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    startAutoSlide();
});

/* --- MAIN BANNER - LEFT PART --- */