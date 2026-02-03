/* --- SLICK SLIDER --- */
$(document).ready(function(){
    $('.section--calculator #calc-step-2 .section--slider .inner').slick({
        // dots: true,
        // arrows: true, 
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        // centerMode: false,
        centerPadding: '20px', 
        responsive: [
            {
                breakpoint: 1281,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 820,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    // Удаляем aria-hidden у всех слайдов после инициализации
    $('.section--calculator #calc-step-2 .section--slider .inner').on('init', function(event, slick) {
        $('.slick-slide').removeAttr('aria-hidden');
    });

    // Удаляем aria-hidden у всех слайдов после смены слайда
    $('.section--calculator #calc-step-2 .section--slider .inner').on('afterChange', function(event, slick, currentSlide) {
        $('.slick-slide').removeAttr('aria-hidden');
    });

    $(window).on('resize', function() {
        $('.section--calculator #calc-step-2 .section--slider .inner').slick('setPosition');
    });
});

$(document).ready(function(){
    $('.section--calculator #calc-step-3 .section--slider .inner').slick({
        // dots: true,
        // arrows: true, 
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
//        autoplay: true,
        autoplaySpeed: 2000,
        // centerMode: false,
        centerPadding: '20px', 
        responsive: [
            {
                breakpoint: 1281,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 820,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    // Удаляем aria-hidden у всех слайдов после инициализации
    $('.section--calculator #calc-step-3 .section--slider .inner').on('init', function(event, slick) {
        $('.slick-slide').removeAttr('aria-hidden');
    });

    // Удаляем aria-hidden у всех слайдов после смены слайда
    $('.section--calculator #calc-step-3 .section--slider .inner').on('afterChange', function(event, slick, currentSlide) {
        $('.slick-slide').removeAttr('aria-hidden');
    });

    $(window).on('resize', function() {
        $('.section--calculator #calc-step-3 .section--slider .inner').slick('setPosition');
    });
});





/* --- ACCORDION --- */
document.addEventListener("DOMContentLoaded", function() {
    const calculatorItems = document.querySelectorAll(".calculator__item");

    calculatorItems.forEach(item => {
        const head = item.querySelector(".calculator__item-head");
        const body = item.querySelector(".calculator__item-body");

        head.addEventListener("click", function() {
            item.classList.toggle("open");
        });
    });
});



/* --- CALCULATE --- */
document.addEventListener("DOMContentLoaded", function() {
    const horizontalSlider = document.getElementById("horizontalPanels");
    const verticalSlider = document.getElementById("verticalPanels");
    const horizontalValue = document.getElementById("horizontalValue");
    const verticalValue = document.getElementById("verticalValue");
    const resultHorizontal = document.getElementById("resultHorizontal");
    const resultVertical = document.getElementById("resultVertical");
    const resultTotal = document.getElementById("resultTotal");
    const resultBracket = document.getElementById("resultBracket");
    const resultLCD = document.getElementById("resultLCD");

    // Обновление значений ползунков
    horizontalSlider.addEventListener("input", function() {
        horizontalValue.textContent = horizontalSlider.value;
        updateResults();
    });

    verticalSlider.addEventListener("input", function() {
        verticalValue.textContent = verticalSlider.value;
        updateResults();
    });

    // Обновление результатов при выборе держателя
    const productRadios = document.querySelectorAll('.section--calculator input[name="product"]');
    productRadios.forEach(radio => {
        radio.addEventListener("change", updateResults);
    });

    // Обновление результатов при выборе панели
    const lcdRadios = document.querySelectorAll('.section--calculator input[name="lcdPanel"]');
    lcdRadios.forEach(radio => {
        radio.addEventListener("change", updateResults);
    });

	function updateResults() {
		const horizontalCount = parseInt(horizontalSlider.value);
		const verticalCount = parseInt(verticalSlider.value);

		// Получаем выбранный продукт и LCD панель
		const selectedProduct = document.querySelector('.section--calculator input[name="product"]:checked');
		const selectedLCD = document.querySelector('.section--calculator input[name="lcdPanel"]:checked');

		// Проверяем, выбраны ли продукты
		const productPrice = selectedProduct ? parseInt(selectedProduct.value) : 0;
		const lcdPrice = selectedLCD ? parseInt(selectedLCD.value) : 0;

		// Обновление результатов
		resultHorizontal.textContent = horizontalCount;
		resultVertical.textContent = verticalCount;
//		resultBracket.textContent = selectedProduct ? selectedProduct.parentNode.textContent.trim() : '';
//		resultLCD.textContent = selectedLCD ? selectedLCD.parentNode.textContent.trim() : '';
		resultBracket.textContent = selectedProduct ? selectedProduct.closest('.slider-container').parentNode.querySelector('.slider__item-info .slider__item-title-text a').textContent.trim() : '';
		resultLCD.textContent = selectedLCD ? selectedLCD.closest('.slider-container').parentNode.querySelector('.slider__item-info .slider__item-title-text a').textContent.trim() : '';

		const total = (horizontalCount * verticalCount * lcdPrice) + productPrice;
		resultTotal.textContent = total.toLocaleString();
	}
	
    // Инициализация значений по умолчанию
    updateResults();
});
