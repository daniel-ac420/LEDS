let detailProductContainer = document.querySelector(".section-merch-detail-info_top");

if (typeof(detailProductContainer) != "undefined" && detailProductContainer != null) {
	Fancybox.bind('.section-merch-detail-info_top [data-fancybox="gallery"]', {
		Slideshow: {
			progressParentEl: (slideshow) => {
				return slideshow.instance.container;
			}
		}
	});

	/* cloned fix */
	$(".section-merch-detail-info_top .slick-cloned a").each(function() {
		let attr = $(this).attr("data-fancybox");
		$(this).removeAttr("data-fancybox").attr("data-fancybox-trigger",attr);
	});

	/* window resize cloned fix */
	window.addEventListener("resize", function() {
		$(".section-merch-detail-info_top .slick-cloned a").each(function() {
			let attr = $(this).attr("data-fancybox");
			$(this).removeAttr("data-fancybox").attr("data-fancybox-trigger",attr);
		});
	});
}