/* --- FOOTER TABS --- */

document.addEventListener("DOMContentLoaded", function () {
	const tabs = document.querySelectorAll(".footer .tab");
	const contents = document.querySelectorAll(".footer .tab-content");

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

/* --- / FOOTER TABS --- */



/* --- HEADER SCROLL --- */

document.addEventListener("DOMContentLoaded", () => {
//    const header = document.querySelector(".header");
    const header = document.querySelector(".header__bottom");

    window.addEventListener("scroll", () => {
        const headerHeight = header.getBoundingClientRect().height;
        const scrollY = window.scrollY;

        if (scrollY >= headerHeight) {
            header.classList.add("scroll");
        } else {
            header.classList.remove("scroll");
        }
    });
});

/* --- / HEADER SCROLL --- */



/* --- HEADER SCROLL TO FOOTER --- */

//document.addEventListener('DOMContentLoaded', () => {
//    const header = document.querySelector('.header');
//    const footer = document.querySelector('.footer');
//
//    window.addEventListener('scroll', () => {
//        const headerRect = header.getBoundingClientRect();
//        const footerRect = footer.getBoundingClientRect();
//
//        // Проверяем, соприкасается ли нижний край header с верхним краем footer
//        if (headerRect.bottom >= footerRect.top) {
//            console.log('Нижний край .header соприкоснулся с верхним краем .footer');
//            header.classList.remove("scroll");
//        }
//    });
//});

/* --- / HEADER SCROLL TO FOOTER --- */



/* --- BUTTONS SHOW MORE / LESS MOUSE ENTER - TITLE --- */

function getButtonsShowMoreLess() {
    return document.querySelectorAll('.button.show-more, .button.show-less');
}

function setTitleOnHover(button) {
    button.addEventListener('mouseenter', function() {
        const textElement = this.querySelector('.show-more__text');
        if (textElement) {
            this.title = textElement.textContent.trim();
        }
    });
}

function initializeButtons() {
    const buttons = getButtonsShowMoreLess();
    for (let button of buttons) {
        setTitleOnHover(button);
    }
}

initializeButtons();

/* --- / BUTTONS SHOW MORE / LESS MOUSE ENTER - TITLE --- */



/* --- DROPDOWN MENU --- */

/* v3 MOUSE ENTER/LEAVE */
document.querySelectorAll(".header__bottom-navigation-list-item").forEach(function(item) {
    const dropdown = item.querySelector(".dropdown-list");
    const link = item.querySelector(".header__bottom-navigation-link");

    item.addEventListener("mouseenter", function() {
        if (dropdown) {
            dropdown.classList.add("visible");
            dropdown.classList.remove("visually-hidden");
            link.classList.add("active");
        }
    });

    item.addEventListener("mouseleave", function() {
        if (dropdown) {
            dropdown.classList.remove("visible");
            dropdown.classList.add("visually-hidden");
            link.classList.remove("active");
        }
    });

    // Обработчики для выпадающего меню
    if (dropdown) {
        dropdown.addEventListener("mouseenter", function() {
            dropdown.classList.add("visible");
            dropdown.classList.remove("visually-hidden");
            link.classList.add("active"); // Добавляем класс active
        });

        dropdown.addEventListener("mouseleave", function() {
            dropdown.classList.remove("visible");
            dropdown.classList.add("visually-hidden");
            link.classList.remove("active"); // Удаляем класс active
        });
    }
});


/* --- / DROPDOWN MENU --- */



/* --- DROPDOWN MENU - LINK TITLES --- */

function updateDropdownTitles() {
    const dropdowns = document.querySelectorAll('.dropdown-list');

    dropdowns.forEach(dropdown => {
        const links = dropdown.querySelectorAll('.dropdown-link');

        links.forEach(link => {
            const linkText = link.textContent.trim();
            link.setAttribute('title', linkText);
        });
    });
}

document.addEventListener('DOMContentLoaded', updateDropdownTitles);


/* --- / DROPDOWN MENU - LINK TITLES --- */



/* --- ANCHORS SCROLL --- */

//document.querySelectorAll('a').forEach(anchor => {
//    anchor.addEventListener('click', function (e) {
//        const targetId = this.getAttribute('href');
//
//        // Проверка, является ли href якорем
//        if (targetId && targetId.startsWith('#')) {
//            e.preventDefault();
//
//            // Проверка на валидность идентификатора
//            const isValidId = /^[a-zA-Z_][\w-]*$/.test(targetId.slice(1)); // Проверка без "#"
//
//            if (isValidId) {
//                const target = document.querySelector(targetId);
//                if (target) {
//                    const header = document.querySelector('.header');
//                    const headerOffset = header.offsetHeight;
//
//                    const elementPosition = target.getBoundingClientRect().top;
//                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
//
//                    window.scrollTo({
//                        top: offsetPosition,
//                        behavior: "smooth"
//                    });
//                } else {
//                    console.warn('Invalid anchor link:', targetId);
//                }
//            } else {
//                console.warn('Invalid ID format:', targetId);
//            }
//        } else {
//            console.warn('Non-anchor link clicked or invalid target:', targetId);
//        }
//    });
//});

/* */