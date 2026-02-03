/* --- MAIN - PROJECTS FILTER - MOBILE --- */

function checkWidth() {
    if (window.innerWidth < 768) {
		const checkboxes = document.querySelectorAll('.mobile .projects-filter .form-input[type="checkbox"]');
		const selectedCounts = document.querySelectorAll('.section--projects .filter-counter .digit'); // Все счётчики
//		const iosCheckbox = document.querySelector('#ios-checkbox');
		const iosCheckboxes = document.querySelectorAll('.section--projects .ios-checkbox');
		const duplicateCheckboxesContainer = document.querySelector('.section--projects .duplicate-checkboxes');
		const filterPopup = document.querySelector('.section--projects .projects-filter-popup');

		function updateSelectedCount() {
			const count = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;

			// Обновляем все счётчики
			selectedCounts.forEach(countElement => {
				countElement.textContent = count;
			});

			// Обновляем состояние чекбокса iOS
			/**
			iosCheckbox.checked = count > 0;
			*/
			iosCheckboxes.forEach(checkbox => {
				checkbox.checked = count > 0; // Устанавливаем состояние для всех чекбоксов
			});
		}

		function createDuplicateCheckbox(checkbox) {
			const duplicateCheckbox = checkbox.closest('label').cloneNode(true); // Клонируем родительский label
			duplicateCheckboxesContainer.appendChild(duplicateCheckbox);
			duplicateCheckboxesContainer.classList.add("active"); // Добавление active
		}

		function removeDuplicateCheckbox(checkbox) {
			const duplicate = Array.from(duplicateCheckboxesContainer.children).find(dup => {
				return dup.querySelector('input').name === checkbox.name;
			});

			if (duplicate) {
				duplicateCheckboxesContainer.removeChild(duplicate);
			}

			// Проверка оставшихся дублирующих чекбоксов
			if (duplicateCheckboxesContainer.children.length === 0) {
				duplicateCheckboxesContainer.classList.remove("active"); // Удаление active, если дубликатов больше нет
			}
		}

		checkboxes.forEach(checkbox => {
			checkbox.addEventListener('change', () => {
				if (checkbox.checked) {
					createDuplicateCheckbox(checkbox);
				} else {
					removeDuplicateCheckbox(checkbox);
				}

				updateSelectedCount();
			});
		});

		// Обработка клика по дубликату
		duplicateCheckboxesContainer.addEventListener('change', (event) => {
			if (event.target.matches('.form-input[type="checkbox"]')) {
				const originalCheckbox = Array.from(checkboxes).find(checkbox => checkbox.name === event.target.name);
				if (originalCheckbox) {
					originalCheckbox.checked = !originalCheckbox.checked; // Переключаем состояние оригинального чекбокса

					if (originalCheckbox.checked) {
						createDuplicateCheckbox(originalCheckbox);
					} else {
						removeDuplicateCheckbox(originalCheckbox);
					}

					updateSelectedCount();
				}
			}
		});

		// Обработка чекбокса iOS
//		iosCheckbox.addEventListener('change', () => {
//			if (iosCheckbox.checked) {
//				checkboxes.forEach(checkbox => {
//					checkbox.checked = true; // Отмечаем все чекбоксы
//					createDuplicateCheckbox(checkbox); // Создаем дубликаты
//				});
//			} else {
//				checkboxes.forEach(checkbox => {
//					checkbox.checked = false; // Снимаем все чекбоксы
//					removeDuplicateCheckbox(checkbox); // Удаляем дубликаты
//				});
//			}
//
//			updateSelectedCount();
//		});
		
		iosCheckboxes.forEach(iosCheckbox => {
			iosCheckbox.addEventListener('change', () => {
				if (iosCheckbox.checked) {
					checkboxes.forEach(checkbox => {
						checkbox.checked = true; // Отмечает все чекбоксы
						createDuplicateCheckbox(checkbox); // Создаёт все дубликаты
					});
				} else {
					checkboxes.forEach(checkbox => {
						checkbox.checked = false; // Снимает все чекбоксы
						removeDuplicateCheckbox(checkbox); // Удаляет все дубликаты
					});
				}

				updateSelectedCount();
			});
		});


		// Инициализация счетчика
		updateSelectedCount();

		// BUTTON SHOW ALL FILTERS
		const allButton = document.querySelector('.section--projects .filter-button-box .button');
		
		allButton.addEventListener('click', () => {
			const scrollPosition = window.scrollY;
			document.body.classList.add('no-scroll');
			document.body.style.top = `-${scrollPosition}px`;
			filterPopup.classList.add('active');
		});

		// CLOSE
		const closeButton = document.querySelector('.section--projects .projects-filter-popup .button-close');
		
		closeButton.addEventListener('click', () => {
			document.body.classList.remove('no-scroll');
			const scrollPosition = document.body.style.top;
			document.body.style.top = '';
			window.scrollTo(0, parseInt(scrollPosition || '0') * -1);
			filterPopup.classList.remove('active');
		});

//        console.log("MOBILE");
    }
}

checkWidth();

window.addEventListener("resize", checkWidth);

/* --- / MAIN - PROJECTS FILTER - MOBILE --- */