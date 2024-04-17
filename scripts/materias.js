
var selectCarrera = document.getElementById("Carrerados");
var inputMateria = document.getElementById("materiainput");
var inputObjetivo = document.getElementById("objetivoinput");

    
// Realizar la solicitud AJAX para obtener el JSON de carreras desde el servidor PHP
fetch('http://localhost/eduxplora/filtroc.php')
    .then(response => response.json())
    .then(data => {
        // Recorrer el array y agregar opciones al primer select
        data.forEach(function (carrera) {
            var option = document.createElement("option");
            option.value = carrera.ID_Carrera;
            option.text = carrera.nombre;
            selectCarrera.add(option);
        });

            // Obtener el idCarrera seleccionado
        var selectedCarreraId = this.value;
        console.log (selectedCarreraId);

    });
  