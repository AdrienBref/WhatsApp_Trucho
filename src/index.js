const { v4: uuidv4 } = require('uuid');

const uuid = uuidv4();

const url = 'http://localhost:8080';
console.log(uuid); // Imprime el identificador único generado

let i = 0;
let send = document.getElementById('send');

console.log('ADIOS MUNDO TRUCHO');

send.addEventListener('click', () => {
  toJson();
});

let GET = () => {
    fetch(url)
    .then(response => {
      if (response.ok) {
        return response.text();
      } else {
        flagConn = false;
        throw new Error("Error en la solicitud. Código de estado: " + response.status);
      }
    })
    .then(responseText => {
      console.log("Respuesta del servidor: " + responseText);
      i++;
      console.log(i);
    })
    .catch(error => {
      flagConn = false;
      console.log("Error en la solicitud: " + error.message);
    });
  
  }

  let POST = (data) => {
    console.log("hola caracola");
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data) 
    })
    .then(response => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error("Error en la solicitud. Código de estado: " + response.status);
      }
    })
    .then(responseText => {
      console.log("Respuesta del servidor: " + responseText);
    })
    .catch(error => {
      console.log("Error en la solicitud: " + error.message);
    });
  
  }

  let toJson = () => {

    let key1 = uuid;
    let key2 = "Adrián"
    let key3 = document.getElementById('message').value;
    let key4 = '18:31';
  
    let jsonMessage = {
      value1: key1,
      value2: key2,
      value3: key3,
      value4: key4,
    }
  
    POST(jsonMessage);
    document.getElementById('message').value = "";
  }

  setInterval(GET, 500);