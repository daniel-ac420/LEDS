$(document).ready(function(){
//    $('.section--slider .inner').slick({
	$('.section--slider .inner').not('.section--slider .inner.mobile, .section--calculator #calc-step-2 .section--slider .inner, .section--calculator #calc-step-3 .section--slider .inner').slick({
//        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
//        centerMode: false,
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
	
	$(window).on('resize', function() {
        $('.section--slider .inner').not('.section--slider .inner.mobile, .section--calculator #calc-step-2 .section--slider .inner, .section--calculator #calc-step-3 .section--slider .inner').slick('setPosition');
    });
});
