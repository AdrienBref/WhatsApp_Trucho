const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();
const url = 'http://localhost:8080'; //This parameter must be entered through a project configuration file (Most likely  as a Json file) 

let i = 0;
let send = document.getElementById('send');

send.addEventListener('click', () => {
  toJson();
});

let GET = () => {
    fetch(url)
    .then(response => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error("Error in the request. Status code: " + response.status);
      }
    })
    .then(responseText => {
      console.log("Server Response: " + responseText);
      i++;
      console.log(i);
    })
    .catch(error => {
      console.log("Error in the request: " + error.message);
    });
  
  }

  let POST = (data) => {
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data) 
    })
    .then(response => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error("Error in the request. Status code: " + response.status);
      }
    })
    .then(responseText => {
      console.log("Server Response: : " + responseText);
    })
    .catch(error => {
      console.log("Error in the request: " + error.message);
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