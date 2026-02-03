document.querySelectorAll(".tab-button").forEach(function(button) {
    button.addEventListener("click", function() {
        const activeTab = document.querySelector(".tab.active");
        const newTabId = button.getAttribute("data-tab");
        const newTab = document.getElementById(newTabId);

        activeTab.classList.remove("active");
        activeTab.style.opacity = 0;

        document.querySelector(".tab-button.active").classList.remove("active");

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

// Инициализация первого таба
document.querySelector(".tab.active").style.display = "block";