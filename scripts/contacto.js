function registrarProducto() {
    var email = document.getElementById('email').value;
    var mensaje = document.getElementById('mensaje').value;

    // Verificar si algún campo está vacío
    if (!email || !mensaje) {
        alert('Todos los campos son obligatorios');
        return;
    }

    // Construir la URL de la solicitud
    var url = "https://busc-int-upt-0f93f68ff11c.herokuapp.com/contactoA.php?&Email=" + email + "&Mensaje=" + mensaje;

    // Realizar la solicitud HTTP utilizando fetch
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error en la solicitud");
            }
            return response.json(); // Puedes cambiar esto según el formato de respuesta esperado
        })
        .then(data => {
            // Manejar la respuesta exitosa
            alert("MENSAJE REGISTRADO EXITOSAMENTE");
            // Limpiar los campos después del registro
            document.getElementById('email').value = "";
            document.getElementById('mensaje').value = "";
        })
        .catch(error => {
            // Manejar errores
            mostrarError("INTENTE DE NUEVO: " + error.message);
        });
}

