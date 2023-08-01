export { send_message, print_message, toJson, print_received_message, createElement };
import {GET, POST, socket} from './modules/httpRequest.js';

//variables para uso de las funciones
var message_mine_counter = 0;
var message_friend_counter = 0;


// = ENVÍO ================================================================================

/**
 * FUNCIÓN SEND_MESSAGE
 * Se ejecuta cuando el usuario hace click en el botón de enviar
 * Verifica si el usuario ha escrito un mensaje en la caja de texto, si lo ha hecho, ejecuta las funciones para mostrar el mensaje en el cuadro de conversación y para convertir el mensaje en un JSON y enviarlo al servidor con websocket
 */

function send_message() {
    console.log("entra a send_message");
    let message = document.getElementById("conversation__textbox").value;
    console.log(message);
  
    if (!(message === "")) {
      print_message(message);
      socket.send(toJson(message));
    }
  };
  
  /**
   * FUNCIÓN PRINT_MESSAGE
   * Función para imprimir el mensaje que envía el usuario en el cuadro de mensajes. Mete el mensaje en texto en un span y un div, para respetar el diseño.
   */
  function print_message(message) {
    console.log("entra a print_message");
  
    // borra la caja de texto
    document.getElementById("conversation__textbox").value = "";
  
    // Creo el div
    let div_message = createElement(
      "div",
      "class",
      "conversation__message-box conversation__message-box--mine",
      "id",
      "conversation__message-box--mine" + message_mine_counter
    );
  
    // Creo el span
    let span_message = createElement(
      "span",
      "class",
      "conversation__message-span conversation__message-span--mine",
      "id",
      "conversation__message-span--mine" + message_mine_counter
    );
  
    // Creo el texto del mensaje
    let p_message = createElement(
      "p",
      "class",
      "conversation__message-text conversation__message-text--mine",
      "id",
      " conversation__message-text--mine" + message_mine_counter
    );
  
    // Le doy al mensaje el valor que he guardado en la variable message (el mensaje del usuario)
    p_message.textContent = message;
  
    // Pego el div dentro de la caja de chats, luego pego el span dentro del div y luego pego el p dentro del span
    document.getElementById("conversation__chat").appendChild(div_message);
    document
      .getElementById("conversation__message-box--mine" + message_mine_counter)
      .appendChild(span_message);
    document
      .getElementById("conversation__message-span--mine" + message_mine_counter)
      .appendChild(p_message);
  
    // Cuando he terminado todo, sumo +1 al contador para que el siguiente mensaje enviado tenga la misma id pero +1
    message_mine_counter++;
    console.log("message_mine_counter:" + message_mine_counter);
  }
  
  
  
 
  
  
  
  // = RECEPCIÓN ================================================================================
  
  
  /**
   * FUNCIÓN PRINT_RECEIVED_MESSAGE
   * Función que parsea el JSON que ha recibido en formato string, lo convierte en un objeto de javascript y le extrae el mensaje y la hora, para imprimirlos.
   * Después los mete en un div y un span para imprimirlos
   */
  function print_received_message(jsonString) {
    console.log("entra a print_received_message");
    
    // JSON de prueba, borrar luego (!!!)
    // let jsonString = '{"key1": "uuid(arreglar)", "key2": "nombre usuario (arreglar)", "key3": "mensaje enviado 1", "key4": "hora(arreglar)"}';
  
    // parsea el json para convertirlo en un objeto de javascript
    let received_json = JSON.parse(jsonString);
  
    console.log(received_json.key1);
    console.log(received_json.key2);
    console.log(received_json.key3);
    console.log(received_json.key4);
  
  
    // Meto en la variable message el texto del mensaje del JSON
    let message = received_json.key3;
  
    // Creo el div
    let div_message = createElement(
      "div",
      "class",
      "conversation__message-box conversation__message-box--friend",
      "id",
      "conversation__message-box--friend" + message_friend_counter
    );
  
    // Creo el span
    let span_message = createElement(
      "span",
      "class",
      "conversation__message-span conversation__message-span--friend",
      "id",
      "conversation__message-span--friend" + message_friend_counter
    );
  
    // Creo el texto del mensaje
    let p_message = createElement(
      "p",
      "class",
      "conversation__message-text conversation__message-text--friend",
      "id",
      " conversation__message-text--friend" + message_friend_counter
    );
  
    // Le doy al mensaje el valor que he guardado en la variable message (el mensaje recibido)
    p_message.textContent = message;
  
    // Pego el div dentro de la caja de chats, luego pego el span dentro del div y luego pego el p dentro del span
    document.getElementById("conversation__chat").appendChild(div_message);
    document
      .getElementById("conversation__message-box--friend" + message_friend_counter)
      .appendChild(span_message);
    document
      .getElementById("conversation__message-span--friend" + message_friend_counter)
      .appendChild(p_message);
  
    // Cuando he terminado todo, sumo +1 al contador para que el siguiente mensaje recibido tenga la misma id pero +1
    message_friend_counter++;
    console.log("message_friend_counter:" + message_friend_counter);
  
  }

  // = OTRAS FUNCIONES ================================================================================
/**
 * FUNCIÓN CREATEELEMENT
 * Función para crear elementos HTML con dos atributos
 */
function createElement(element, attribute1, value1, attribute2, value2) {
    let el = document.createElement(element);
    let att1 = document.createAttribute(attribute1);
    att1.value = value1;
    el.setAttributeNode(att1);
  
    let att2 = document.createAttribute(attribute2);
    att2.value = value2;
    el.setAttributeNode(att2);
  
    return el;
  }

   /**
   * FUNCIÓN TOJSON
   * Crea un JSON con la uuid, el nombre, el mensaje y la hora, y lo retorna
   */
 function toJson(message) {
  console.log("entra a toJson");
  let key1 = "uuid(arreglar)";
  let key2 = "nombre usuario (arreglar)";
  let key3 = message;
  let key4 = "hora(arreglar)";

  let jsonMessage = {
    value1: key1,
    value2: key2,
    value3: key3,
    value4: key4,
  };

  return jsonMessage;
  console.log(jsonMessage);
}

  

  