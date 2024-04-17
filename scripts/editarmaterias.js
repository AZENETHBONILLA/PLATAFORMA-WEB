
var selectCarrera = document.getElementById("Carrera");
var selectMateria = document.getElementById("Materia");
var infoObjetivo = document.getElementById("infoObjetivo");

      
// Realizar la solicitud AJAX para obtener el JSON de carreras desde el servidor PHP
fetch('https://busc-int-upt-0f93f68ff11c.herokuapp.com/filtrocA.php')
    .then(response => response.json())
    .then(data => {
        // Recorrer el array y agregar opciones al primer select
        data.forEach(function (carrera) {
            var option = document.createElement("option");
            option.value = carrera.ID_Carrera;
            option.text = carrera.nombre;
            selectCarrera.add(option);

        });

        // Agregar un evento de cambio al primer select
        selectCarrera.addEventListener("change", function () {
            // Limpiar opciones anteriores del segundo select
            selectMateria.innerHTML = '<option value="0">Elige una opción</option>';
            infoObjetivo.innerHTML = ''; // Limpiar la información de la materia al cambiar de carrera

            // Obtener el idCarrera seleccionado
            var selectedCarreraId = this.value;
            console.log (selectedCarreraId);

            // Realizar la solicitud AJAX para obtener el JSON de materias desde el servidor PHP basado en la carrera seleccionada
            fetch('https://busc-int-upt-0f93f68ff11c.herokuapp.com/filtromA.php?idCarrera=' + selectedCarreraId)
                .then(response => response.json())
                .then(responseData => {
                    // Verificar si la respuesta contiene un error
                    if (responseData.error && responseData.error === "No hay materias registradas para el idCarrera proporcionado") {
                        alert('No hay materias registradas para la Carrera proporcionada.');
                    } else {
                        // Agregar las opciones al segundo select solo si no hay error
                        responseData.forEach(function (materia) {
                            var option = document.createElement("option");
                            option.text = materia.nombre;
                            option.value = materia.idMateria;
                            selectMateria.add(option);
                        });
                    }
                })
                .catch(error => console.error('Error al obtener los datos de materias:', error));
        });
    })
    .catch(error => console.error('Error al obtener los datos de carreras:', error));

// Agregar un evento de clic al botón "Mostrar"
document.querySelector('.contenedor.izquierda.margen .btn.btn-cta').addEventListener('click', function () {
    // Obtener el idMateria seleccionado
    var selectedMateriaId = selectMateria.value;
    console.log(selectedMateriaId);


// Realizar la solicitud AJAX para obtener la información de la materia desde el servidor PHP
fetch('https://busc-int-upt-0f93f68ff11c.herokuapp.com/obtenerObjetivoA.php?idMateria=' + selectedMateriaId)
    .then(response => response.json())
    .then(responseData => {
        // Verificar si la respuesta contiene un error
        if (responseData.error) {
            alert('Error al obtener la información de la materia: ' + responseData.error);
        } else if (responseData.length > 0) { // Verificar si hay datos en la respuesta
            // Limpiar el contenido anterior del div
            var infoObjetivoDiv = document.getElementById("infoObjetivo");
            infoObjetivoDiv.innerHTML = '';

            // Crear un div para el texto del objetivo
            var textoObjetivoDiv = document.createElement('div');
            textoObjetivoDiv.classList.add('texto__objetivo');

            // Acceder al objetivo en el primer objeto del arreglo
            var objetivo = responseData[0].objetivo;

            // Crear un párrafo para mostrar el objetivo
            var objetivoParrafo = document.createElement('p');
            objetivoParrafo.textContent = 'Objetivo: ' + objetivo;

            // Agregar el párrafo al div texto__objetivo
            textoObjetivoDiv.appendChild(objetivoParrafo);

            // Agregar el div texto__objetivo al div contenedor__objetivo
            infoObjetivoDiv.appendChild(textoObjetivoDiv);
        } else {
            alert('No se encontró información de objetivo para la materia seleccionada.');
        }
    })
    .catch(error => console.error('Error al obtener la información de la materia:', error));

});



document.getElementById("guardarBtn").addEventListener("click", function() {
    var carrera = document.getElementById("Carrerados").value;
    var materia = document.getElementById("materiainput").value;
    var objetivo = document.getElementById("objetivoinput").value;
    
    // Mapear el valor del select a su respectivo idCarrera
    var idCarrera;
    switch (carrera) {
        case "1":
            idCarrera = 1; // Sistemas Computacionales
            break;
        case "2":
            idCarrera = 2; // Civil
            break;
        case "3":
            idCarrera = 3; // Industrial
            break;
        case "4":
            idCarrera = 4; // Telecomunicaciones
            break;
        case "5":
            idCarrera = 5; // Robotica
            break;
        default:
            idCarrera = 0; // Valor predeterminado
            break;
    }

    var data = {
        Nombre: materia,
        objetivo: objetivo,
        idCarrera: idCarrera
    };

    console.log(data);

    fetch('https://busc-int-upt-0f93f68ff11c.herokuapp.com/agregarmateriaA.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        // Manejar la respuesta de la API
        console.log(data);
        alert(data.mensaje);

                // Limpiar los campos del formulario después de recibir una respuesta exitosa
        document.getElementById("materiainput").value = "";
        document.getElementById("objetivoinput").value = "";
    })
    .catch(error => {
        console.error('Error al enviar datos:', error);
        alert('Error al enviar datos');
    });
});


document.getElementById("guardarBtndos").addEventListener("click", function() {
    var idMateria = document.getElementById("idMateria").value; // Obtener el idMateria del formulario
    var carrera = document.getElementById("carreratres").value;
    var materia = document.getElementById("inputmateria").value;
    var objetivo = document.getElementById("inputobjetivo").value;
    
    // Mapear el valor del select a su respectivo idCarrera
    var idCarrera;
    switch (carrera) {
        case "1":
            idCarrera = 1; // Sistemas Computacionales
            break;
        case "2":
            idCarrera = 2; // Civil
            break;
        case "3":
            idCarrera = 3; // Industrial
            break;
        case "4":
            idCarrera = 4; // Telecomunicaciones
            break;
        case "5":
            idCarrera = 5; // Robotica
            break;
        default:
            idCarrera = 0; // Valor predeterminado
            break;
    }

    var data = {
        idMateria: idMateria,
        Nombre: materia,
        objetivo: objetivo,
        idCarrera: idCarrera
    };

    fetch('https://busc-int-upt-0f93f68ff11c.herokuapp.com/actualizarmateriaA.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        // Manejar la respuesta de la API
        console.log(data);
        alert(data.mensaje);

        // Limpiar los campos del formulario después de recibir una respuesta exitosa
        document.getElementById("inputmateria").value = "";
        document.getElementById("inputobjetivo").value = "";
        document.getElementById("idMateria").value = "";
    })
    .catch(error => {
        console.error('Error al enviar datos:', error);
        alert('Error al enviar datos');
    });
});
