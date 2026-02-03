document.addEventListener("DOMContentLoaded", function () {

  const tabContents = document.querySelectorAll(".articles__tabs .tab-content");

  // Состояние пагинации для каждой вкладки: { currentPage: 1, itemsPerPage: N, totalItems: M }
  const tabData = {};

  // Функция для определения itemsPerPage по ширине окна
  function getItemsPerPage() {
    if (window.innerWidth >= 1181) {
      return 9;
    } else if (window.innerWidth >= 768) {
      return 6;
    } else {
      return 3;
    }
  }

  // Инициализация данных по каждой вкладке
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

  // Функция отрисовки страницы и пагинации для вкладки
  function renderPage(tabId, page) {
    const data = tabData[tabId];
    if (!data) return;

    const { items, totalItems } = data;
    const itemsPerPage = data.itemsPerPage;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;

    data.currentPage = page;

    // Показываем/скрываем элементы
    items.forEach((item, idx) => {
      if (idx >= (page - 1) * itemsPerPage && idx < page * itemsPerPage) {
        item.classList.add("visible");
      } else {
        item.classList.remove("visible");
      }
    });

    // Отрисовка пагинации
    renderPagination(tabId, totalPages, page);
  }

  // Функция создания пагинации (кнопок)
  function renderPagination(tabId, totalPages, currentPage) {
    const content = document.getElementById(tabId);

    // Ищем контейнер пагинации, либо создаём, если нет
    let pagination = content.querySelector(".pagination");
    if (!pagination) {
      pagination = document.createElement("div");
      pagination.className = "pagination";
      content.appendChild(pagination);
    }
    pagination.innerHTML = ""; // очистка

    // Создаём кнопку
    function createButton(text, page) {
      const btn = document.createElement("button");
      btn.textContent = text;
      btn.classList.add("button");
      if (page === currentPage) {
        btn.disabled = true;
        btn.classList.add("active");
      }
      btn.addEventListener("click", () => {
        renderPage(tabId, page);
      });
      return btn;
    }

    // Кнопка "Назад"
    if (currentPage > 1) {
      pagination.appendChild(createButton("Назад", currentPage - 1));
    }

    // Кнопки с номерами страниц
    for (let i = 1; i <= totalPages; i++) {
      pagination.appendChild(createButton(i, i));
    }

    // Кнопка "Вперёд"
    if (currentPage < totalPages) {
      pagination.appendChild(createButton("Вперёд", currentPage + 1));
    }
  }

  // Отслеживаем переключение вкладок — сбрасываем пагинацию на сохранённую страницу
  const tabs = document.querySelectorAll(".articles__tabs .tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const target = tab.getAttribute("data-tab");
      renderPage(target, tabData[target].currentPage || 1);
    });
  });

  // Отслеживаем изменение размера окна — пересчитываем itemsPerPage и обновляем пагинацию
  window.addEventListener("resize", () => {
    const newItemsPerPage = getItemsPerPage();
    Object.keys(tabData).forEach(tabId => {
      if (tabData[tabId].itemsPerPage !== newItemsPerPage) {
        tabData[tabId].itemsPerPage = newItemsPerPage;

        // При изменении itemsPerPage сбрасываем текущую страницу на 1
        tabData[tabId].currentPage = 1;

        // Если вкладка активна, обновляем её отображение
        const activeTab = document.querySelector(".articles__tabs .tab.active");
        if (activeTab && activeTab.getAttribute("data-tab") === tabId) {
          renderPage(tabId, 1);
        }
      }
    });
  });

  // Инициализация для активной вкладки при загрузке страницы
  const activeTab = document.querySelector(".articles__tabs .tab.active");
  if (activeTab) {
    const tabId = activeTab.getAttribute("data-tab");
    renderPage(tabId, 1);
  }
});
