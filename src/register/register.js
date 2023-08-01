import { POST } from "../modules/httpRequests";

function register() {
    // Obtener los valores de usuario, contraseña y confirmar contraseña
    const usuario = document.getElementById("user").value;
    const contraseña = document.getElementById("password").value;
    const confirmarContraseña = document.getElementById("password_confirm").value;

    // Verificar que las contraseñas coincidan
    if (contraseña !== confirmarContraseña) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    // Crear un objeto para almacenar los datos del usuario
    const datosUsuario = {
      usuario: usuario,
      contraseña: contraseña,
    };

    // Realizar la solicitud POST al servidor
    POST("http://localhost:8080/register", datosUsuario);
  }