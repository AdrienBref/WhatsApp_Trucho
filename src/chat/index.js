// = MAIN ================================================================================
import { send_message, print_message, POST, toJson, GET,  print_received_message, createElement } from './modules/messages.js';

console.log("Entra al main");

// Imprime el identificador único generado
// const { v4: uuidv4 } = require("uuid");
// const uuid = uuidv4();
// console.log(uuid);


// Ejecuto mi función send_message() cuando se clican el botón de enviar
document.getElementById("conversation__submit-button").addEventListener("click", send_message);

// Es una función que ejecuta una función (primer parámetro), cada tantos milisegundos (segundo parámetro)
// En este caso ejecuta GET cada 500 milisegundos
setInterval(GET, 500);









