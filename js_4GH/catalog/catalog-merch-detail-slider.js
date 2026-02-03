$(".slider_desktop .slider-for").slick({
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: false,
	infinite: true,
	speed: 250,
	fade: false,
	centerMode: false,
	asNavFor: ".slider_desktop .slider-nav"
});


$(".slider_desktop .slider-nav").slick({
	slidesToShow: 4,
	slidesToScroll: 1,
	asNavFor: ".slider_desktop .slider-for",
	dots: false,
	infinite: true,
	focusOnSelect: true,
	vertical: true,
	responsive: [
		{
			breakpoint: 1367,
			settings: {
				slidesToShow: 3
			}
		}, 
		{
			breakpoint: 1181,
			settings: {
				vertical: false,
				slidesToShow: 5
			}
		}, 
		{
			breakpoint: 820,
			settings: {
				vertical: false,
				slidesToShow: 4
			}
		}, 
		{
			breakpoint: 540,
			settings: {
				vertical: false,
				slidesToShow: 2
			}
		},
		{
			breakpoint: 321,
			settings: {
				vertical: false,
				slidesToShow: 1
			}
		}
	]
});