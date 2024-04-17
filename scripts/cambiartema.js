
    // Función para cambiar el estilo de la página
    function toggleGrayscale() {
        const body = document.body;
        const grayscaleValue = body.style.filter === 'grayscale(100%)' ? 'none' : 'grayscale(100%)';
        body.style.filter = grayscaleValue;
        body.style.webkitFilter = grayscaleValue; // Para navegadores basados en WebKit
        // Guardar preferencia en almacenamiento local
        localStorage.setItem('themePreference', 'grayscale');
    }

    function toggleColores() {
        const body = document.body;
        body.style.filter = 'none';
        body.style.webkitFilter = 'none'; // Para navegadores basados en WebKit
        // Guardar preferencia en almacenamiento local
        localStorage.setItem('themePreference', 'colores');
    }

    function applySavedStyle() {
        const themePreference = localStorage.getItem('themePreference');
        if (themePreference === 'grayscale') {
            toggleGrayscale();
            document.getElementById('escala_grises').checked = true;
        } else {
            toggleColores();
            document.getElementById('colores').checked = true;
        }
    }

    // Aplicar estilo guardado al cargar la página
    applySavedStyle();

