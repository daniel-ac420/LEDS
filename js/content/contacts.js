/* --- CONTACTS DETAILS --- */

document.addEventListener('DOMContentLoaded', function() {
    const copyButton = document.querySelector('.section--details .button-contacts_copy');
    const notification = document.querySelector('.notification');

    copyButton.addEventListener('click', function() {
        const items = document.querySelectorAll('.details__item');
        let copiedText = 'Реквизиты:\n';

        items.forEach(item => {
            const term = item.querySelector('.details__item-term').textContent.trim();
            const descr = item.querySelector('.details__item-descr').textContent.trim();
            copiedText += `${term}: ${descr}\n`;
        });

        navigator.clipboard.writeText(copiedText).then(() => {
            console.log('Текст скопирован в буфер обмена');
            showNotification();
        }).catch(err => {
            console.error('Ошибка при копировании текста: ', err);
        });
    });

	function showNotification() {
        notification.classList.add('active');
        setTimeout(() => {
            notification.classList.remove('active');
        }, 2000);
    }
});

/* --- / CONTACTS DETAILS --- */



/* --- CONTACTS SLIDER --- */

const contactsItems = document.querySelectorAll(".contacts-slider");

contactsItems.forEach(item => {
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

/* --- / CONTACTS SLIDER --- */