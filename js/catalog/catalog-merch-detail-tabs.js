document.addEventListener("DOMContentLoaded", function () {
	const tabs = document.querySelectorAll(".section-merch-detail-tabs .tab");
	const contents = document.querySelectorAll(".section-merch-detail-tabs .tab-content");

	tabs.forEach(tab => {
		tab.addEventListener("click", () => {
			const target = tab.getAttribute("data-tab");

			tabs.forEach(t => t.classList.remove("active"));
			contents.forEach(c => c.classList.remove("active"));

			tab.classList.add("active");
			document.getElementById(target).classList.add("active");
		});
	});
});