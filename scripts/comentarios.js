// Obtener el formulario
var formulario = document.getElementById("formulario");

// Agregar un evento de clic al botón "Mostrar"
formulario.addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe

    // Obtener el valor seleccionado (rol)
    var selectedRol = document.getElementById("rol").value;
    
    // Imprimir el valor seleccionado en la consola
    console.log("Rol seleccionado:", selectedRol);

    // Realizar la solicitud a la API PHP con el rol seleccionado
    fetch('https://busc-int-upt-0f93f68ff11c.herokuapp.com/comentariosA.php?rol=' + selectedRol)
        .then(response => response.json())
        .then(data => {
            // Verificar si la respuesta contiene un error
            if (data.error) {
                alert('Error: ' + data.error);
            } else {
                // Obtener el div donde se mostrarán los datos de los usuarios
                var perfilesDiv = document.querySelector(".contenedor__perfiles");
                
                // Limpiar contenido anterior
                perfilesDiv.innerHTML = '';

                // Crear divs para cada usuario y mostrarlos dentro del div contenedor__perfiles
                data.forEach(function (usuario) {
                    var perfilDiv = document.createElement("div");
                    perfilDiv.classList.add("comentarios__perfilesdos");
                    perfilDiv.innerHTML = `
                        <img src="../../img/new/chica.png" width="80%" class="perfil">
                        <div>
                            <p>NOMBRE: ${usuario.Usuario}</p>
                            <p>EMAIL: ${usuario.Email}</p>
                            <p>COMENTARIO: ${usuario.Mensaje}</p>
                        </div>
                    `;
                    perfilesDiv.appendChild(perfilDiv);
                });
            }
        })
        .catch(error => console.error('Error al obtener los datos de usuarios:', error));
});
