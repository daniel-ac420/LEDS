document.addEventListener('DOMContentLoaded', function() {
    const consultBox = document.querySelector('.consult-box');
    const consultMapSection = document.querySelector('.section--form-consult_map');
    const closeButton = document.querySelector('.section--form-consult_map .button-close');

    consultBox.addEventListener('click', function() {
        if (consultBox.classList.contains('active')) {
            consultMapSection.classList.remove('active');
            consultBox.classList.remove('active');
        } else {
            consultMapSection.classList.add('active');
            consultBox.classList.add('active');
        }
    });

    closeButton.addEventListener('click', function() {
        consultMapSection.classList.remove('active');
        consultBox.classList.remove('active');
    });

    document.addEventListener('click', function(event) {
        const isClickInsideForm = consultMapSection.contains(event.target);
        const isClickOnConsultBox = consultBox.contains(event.target);

        if (!isClickInsideForm && !isClickOnConsultBox && consultMapSection.classList.contains('active')) {
            consultMapSection.classList.remove('active');
            consultBox.classList.remove('active');
        }
    });
});