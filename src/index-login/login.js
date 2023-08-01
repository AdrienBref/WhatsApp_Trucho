/** 
 * Función para logearse desde login.html
 * - Va a enviar los datos al servidor para que el usuario pueda logearse
 */

import { POST } from "../modules/httpRequests";

 function enviarDatos() {
        // Obtener los valores de usuario y contraseña
        const usuario = document.getElementById("user").value;
        const contraseña = document.getElementById("password").value;

        // Crear un objeto para almacenar los datos
        const datos = {
          usuario: usuario,
          contraseña: contraseña,
        };

        //Envía los datos mediante POST, a esa url
        POST("http://localhost:8080/login", datos);
      }





