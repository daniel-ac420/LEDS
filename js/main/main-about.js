//$(document).ready(function(){
//    $(".section--about .about__items").slick({
////        dots: true,
//        infinite: true,
//        speed: 500,
//        slidesToShow: 3,
//        slidesToScroll: 1,
//        autoplay: true,
//        autoplaySpeed: 2000,
//        centerMode: false,
//        centerPadding: '15px', 
//		responsive: [
//            {
//                breakpoint: 1281,
//                settings: {
//                    slidesToShow: 2,
//                    slidesToScroll: 1
//                }
//            },
//            {
//                breakpoint: 820,
//                settings: {
//                    slidesToShow: 1,
//                    slidesToScroll: 1
//                }
//            }
//        ]
//    });
//	
////	$(window).on('resize', function() {
////       $(".section--about .about__items").slick('setPosition');
////    });
//});



$(document).ready(function() {
    function initializeSlick() {
        if ($(window).width() >= 768) {
            if (!$(".section--about .about__items").hasClass('slick-initialized')) {
                $(".section--about .about__items").slick({
                    infinite: true,
                    speed: 500,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 2000,
                    centerMode: false,
                    centerPadding: '15px',
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
            }
        } else {
            if ($(".section--about .about__items").hasClass('slick-initialized')) {
                $(".section--about .about__items").slick('unslick');
            }
        }
    }

    initializeSlick();

    $(window).resize(function() {
        initializeSlick();
    });
});
