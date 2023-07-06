// = MAIN ================================================================================
console.log("Entra al main");

// Imprime el identificador único generado
// const { v4: uuidv4 } = require("uuid");
// const uuid = uuidv4();
// console.log(uuid);

const url = "http://localhost:8081";

var message_mine_counter = 0;
var message_friend_counter = 0;


// Ejecuto mi función send_message() cuando se clican el botón de enviar
document.getElementById("conversation__submit-button").addEventListener("click", send_message);

// Es una función que ejecuta una función (primer parámetro), cada tantos milisegundos (segundo parámetro)
// En este caso ejecuta GET cada 500 milisegundos
// setInterval(receive_message, 500);

print_received_message(/*json*/);




// = ENVÍO ================================================================================

/**
 * FUNCIÓN SEND_MESSAGE
 * Se ejecuta cuando el usuario hace click en el botón de enviar
 * Verifica si el usuario ha escrito un mensaje en la caja de texto, si lo ha hecho, ejecuta las funciones para mostrar el mensaje en el cuadro de conversación y para convertir el mensaje en un JSON y subirlo al servidor
 */
function send_message() {
  console.log("entra a send_message");
  let message = document.getElementById("conversation__textbox").value;
  console.log(message);

  if (!(message === "")) {
    print_message(message);
    POST(toJson(message));
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

/**
 * FUNCIÓN POST
 * Toma el parámetro data, que es el JSON con el que hemos rodeado el mensaje del usuario.
 * Luego creo y utilizo un objeto fetch. En este caso le introduzco dos parámetros. El primero siempre es la URL, y el segundo es un objeto llamado "options". El objeto options configura los detalles de la solicitud, como el método HTTP que uso, el cuerpo de la solicitud, su encabezado, etc. Se configuran mediante los atributos que le damos a options.
 * En este caso como method, que define el método HTTP que usamos, le decimos que use el método HTTP "POST", y luego le decimos en body, que se refiere al body de la solicitud HTTP, use la función JSON.stringify(data). Lo que hace esa función es convertir el JSON (que es en el que hemos envuelto el mensaje del usuario), en un string, para poder enviarlo (en una solicitud http solo podemos enviar cadenas de texto)
 * Después, fetch devuelve como respuesta del servidor un código, que dice si el envío ha sido exitoso o no.
 * El primer then coge esta respuesta, y evalúa si el código dice si el envío ha sido exitoso o no. Si lo es, usa response.text(). El método text() lo que hace es extraer el body de la solicitud HTTP (le quita el head), y lo retorna.
 * Si no es exitoso, lanza un Error, y la ejecución del código salta al catch()
 * Después está el segundo then() que opera sobre la respuesta del primero. Lo que hace es imprimirla por consola
 *
 */
function POST(json) {
  console.log("Entra en la función POST");
  fetch(url, {
    method: "POST",
    body: JSON.stringify(json),
  })
    .then((response) => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error(
          "Error en la solicitud. Código de estado: " + response.status
        );
      }
    })
    .then((responseText) => {
      console.log("Respuesta del servidor: " + responseText);
    })
    .catch((error) => {
      console.log("Error en la solicitud: " + error.message);
    });
}

/**
 * FUNCIÓN TOJSON
 * Crea un JSON con la uuid, el nombre, el mensaje y la hora, y lo retorna
 */
function toJson(message) {
  console.log("entra a toJson");
  let key1 = "uuid(arreglar"
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




// = RECEPCIÓN ================================================================================

/**
 * Función GET
 * Usa el objeto fetch, para coger un elemento que hay en una URL
 * Una vez que lo coge, se realiza el método then(), un método del objeto fetch. Este método, pide por parámetro una función (que creamos nosotros), en la que se usa como parámetro el elemento que ha cogido fetch
 * Si hay varios .then() uno después de otro, cada then() se ejecuta después del anterior, y toma como parámetro una función, que tiene por parámetro el elemento que ha retornado el anterior then()
 * En este caso, fetch coge un elemento de una URL (la respuesta del otro usuario)
 * Luego el primer then() hace una función, en la cual, si la respuesta es correcta, la retorna, pero si es incorrecta, va a lanzar un Error, y la ejecución del código saltará directamente al catch().
 * La respuesta es pasada a otro then(), que imprime la respuesta por consola
 * Finalmente está el catch, si cualquiera de los then() lanza un Error, la ejecución del código pasa directamente al catch(), que lo va a atrapar
 */
function GET() {
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error(
          "Error en la solicitud. Código de estado: " + response.status
        );
      }
    })
    .then((responseText) => {
      console.log("Respuesta del servidor: " + responseText);
    })
    .catch((error) => {
      console.log("Error en la solicitud: " + error.message);
    });
}

/**
 * FUNCIÓN PRINT_RECEIVED_MESSAGE
 * Función que parsea el JSON que ha recibido en formato string, lo convierte en un objeto de javascript y le extrae el mensaje y la hora, para imprimirlos.
 * Después los mete en un div y un span para imprimirlos
 */
function print_received_message(/*json*/) {
  console.log("entra a print_received_message");
  
  // JSON de prueba, borrar luego (!!!)
  let jsonString = '{"key1": "uuid(arreglar)", "key2": "nombre usuario (arreglar)", "key3": "mensaje enviado 1", "key4": "hora(arreglar)"}';

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
