export {socket};
import {
  send_message,
  print_message,
  toJson,
  print_received_message,
  createElement,
} from "../modules/messages";

console.log("Entra al main");

// Ejecuto mi función send_message() cuando se clican el botón de enviar
document.getElementById("conversation__submit-button").addEventListener("click", send_message);


//crea el websocket
const serverUrl = "ws://localhost:8081"; 
const socket = new WebSocket(serverUrl);

// Escuchar eventos del WebSocket
//El websocket se abre, se establece conexión con el servidor
socket.addEventListener("open", (event) => {
  console.log("Conexión establecida.");
});

//El websocket recibe un mensaje
socket.addEventListener("message", (event) => {
    print_received_message(toJson(event.data))
});

//El websocket se cierra
socket.addEventListener("close", (event) => {
  console.log("Conexión cerrada.");
});
