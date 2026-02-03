/* --- ARTICLES TABS --- */

document.addEventListener("DOMContentLoaded", function () {
	const tabs = document.querySelectorAll(".articles__tabs .tab");
	const contents = document.querySelectorAll(".articles__tabs .tab-content");

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

/* --- / ARTICLES TABS --- */



/* --- PAGINATION --- */

document.addEventListener("DOMContentLoaded", function () {
    const tabContents = document.querySelectorAll(".articles__tabs .tab-content");
    const tabData = {};

    function getItemsPerPage() {
        if (window.innerWidth >= 1181) return 9;
        if (window.innerWidth >= 768) return 6;
        return 3;
    }

    // Инициализация вкладок
    tabContents.forEach(content => {
        const tabId = content.id;
        const items = content.querySelectorAll(".articles__item");
        tabData[tabId] = {
            currentPage: 1,
            itemsPerPage: getItemsPerPage(),
            totalItems: items.length,
            items: items
        };
    });

    // Рендер страницы вкладки
    function renderPage(tabId, page) {
        const data = tabData[tabId];
        if (!data) return;

        const { items, totalItems } = data;
        const itemsPerPage = data.itemsPerPage;
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        // Ограничение диапазон страницы
        page = Math.max(1, Math.min(page, totalPages));
        data.currentPage = page;

        // Показ элементов из диапазона
        items.forEach((item, idx) => {
            const isVisible = idx >= (page - 1) * itemsPerPage && idx < page * itemsPerPage;
            item.classList.toggle("visible", isVisible);
            item.classList.toggle("visually-hidden", !isVisible);
        });

        // Рендер пагинации
        renderPagination(tabId, totalPages, page);
    }

    // Создание пагинации
    function createButton(text, page, isDisabled, isActive, onClick, tabId) {
        const btn = document.createElement("button");
        btn.textContent = text;
        btn.classList.add("button");
        if (isActive) btn.classList.add("active");
        btn.disabled = isDisabled;

        if (!isDisabled) {
            btn.addEventListener("click", () => {
                onClick(); // Переключение страницы

                // Скролл к пагинации текущего таба
                setTimeout(() => {
                    const pagination = document.querySelector(`#${tabId} .pagination`);
                    if (pagination) {
                        pagination.scrollIntoView({ behavior: "smooth", block: "nearest" });
                    }
                }, 50);
            });
        }

        return btn;
    }

    // Рендер кнопок пагинации
    function renderPagination(tabId, totalPages, currentPage) {
        const content = document.getElementById(tabId);

        let pagination = content.querySelector(".pagination");
        if (!pagination) {
            pagination = document.createElement("div");
            pagination.className = "pagination";
            content.appendChild(pagination);
        }

        pagination.innerHTML = "";

        // PREV
        pagination.appendChild(createButton(
            "Назад",
            currentPage - 1,
            currentPage === 1,
            false,
            () => renderPage(tabId, currentPage - 1),
            tabId
        ));

        // NUMS
        for (let i = 1; i <= totalPages; i++) {
            pagination.appendChild(createButton(
                i,
                i,
                false,
                currentPage === i,
                () => renderPage(tabId, i),
                tabId
            ));
        }

        // NEXT
        pagination.appendChild(createButton(
            "Вперёд",
            currentPage + 1,
            currentPage === totalPages,
            false,
            () => renderPage(tabId, currentPage + 1),
            tabId
        ));
    }

    // Рендер страниц при переключении вкладок
    const tabs = document.querySelectorAll(".articles__tabs .tab");
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const target = tab.getAttribute("data-tab");
            renderPage(target, tabData[target].currentPage || 1);
        });
    });

    window.addEventListener("resize", () => {
        const newItemsPerPage = getItemsPerPage();
        Object.keys(tabData).forEach(tabId => {
            const data = tabData[tabId];
            if (data.itemsPerPage !== newItemsPerPage) {
                data.itemsPerPage = newItemsPerPage;
                data.currentPage = 1; // сброс на первую страницу

                const activeTab = document.querySelector(".articles__tabs .tab.active");
                if (activeTab && activeTab.getAttribute("data-tab") === tabId) {
                    renderPage(tabId, 1);
                }
            }
        });
    });

    // Инициализация активной вкладки при загрузке
    const activeTab = document.querySelector(".articles__tabs .tab.active");
    if (activeTab) {
        const tabId = activeTab.getAttribute("data-tab");
        renderPage(tabId, 1);
    }
});

/* --- / PAGINATION --- */