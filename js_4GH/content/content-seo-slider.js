/* --- CONTENT SEO - RIGHT PART --- */

const sliderSeoItems = document.querySelectorAll(".section--seo .slider__item");

sliderSeoItems.forEach(item => {
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

/* --- / CONTENT SEO - RIGHT PART --- */