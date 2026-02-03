document.querySelectorAll(".tab-button").forEach(function(button) {
    button.addEventListener("click", function() {
        const section = button.closest(".section");
        const activeTab = section.querySelector(".tab.active");
        const newTabId = button.getAttribute("data-tab");
        const newTab = section.querySelector(`#${newTabId}`);

        // Проверка на существование таба
        if (!newTab) {
            console.error(`Tab with ID ${newTabId} not found.`);
            return;
        }

        activeTab.classList.remove("active");
        activeTab.style.opacity = 0;

        section.querySelector(".tab-button.active").classList.remove("active");

        // Завершение анимации перед переключением
        setTimeout(function() {
            activeTab.style.display = "none";

            newTab.style.display = "block";
            setTimeout(function() {
                newTab.classList.add("active");
                newTab.style.opacity = 1;
            }, 20); // Задержка для корректного отображения
        }, 400);

        button.classList.add("active");
    });
});

// Инициализация первого таба для каждой секции
document.querySelectorAll(".section").forEach(function(section) {
    const activeTab = section.querySelector(".tab.active");
	
    if (activeTab) {
        activeTab.style.display = "block";
    }
});
