document.addEventListener("DOMContentLoaded", function () {
	const items = document.querySelectorAll(".section--banner-content-page .reasons__item");
	const itemCount = items.length / 2; /* с учётом элементов в .reasons__items.hidden */

	document.querySelector(".section--banner-content-page").style.setProperty("--items-count", itemCount);
});