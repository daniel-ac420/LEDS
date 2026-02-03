/* --- CERTIFICATES SLIDER --- */
$(function(){
	$(".certificates__slider").slick({
		arrows: true,
		dots: false,
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplay: true,
		fade: false, 
		responsive: [
			{
				breakpoint: 1280,
				settings: {
					slidesToShow: 3
				}
			}, 
			{
				breakpoint: 769,
				settings: {
					slidesToShow: 2
				}
			}, 
			{
				breakpoint: 540,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});
});
/* --- / CERTIFICATES SLIDER --- */


/* --- CERTIFICATES GALLERY --- */
$(function(){
	Fancybox.bind('[data-fancybox="gallery"]', {
		Slideshow: {
			progressParentEl: (slideshow) => {
				return slideshow.instance.container;
			}
		}
	});
	
	/* cloned fix */
//	setTimeout(function() {
		$(".slick-cloned ").each(function() {
			let attr = $(this).attr("data-fancybox");
			$(this).removeAttr("data-fancybox").attr("data-fancybox-trigger",attr);
		});
//	}, 300);
	
	/* window resize cloned fix */
	window.addEventListener("resize", function() {
		$(".slick-cloned ").each(function() {
			let attr = $(this).attr("data-fancybox");
			$(this).removeAttr("data-fancybox").attr("data-fancybox-trigger",attr);
		});
	});
});
/* --- / CERTIFICATES GALLERY --- */



/* --- CERTIFICATES POP-UP VIDEO --- */

document.addEventListener('DOMContentLoaded', function() {
	Fancybox.bind('[data-fancybox="video"]', {
		loop: true,
		buttons: ['close'],
		transitionEffect: 'fade',
		protect: false
	});
});
/* */