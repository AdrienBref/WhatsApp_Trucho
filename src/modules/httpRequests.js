export { POST };

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
function POST(url, json) {
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
   * Función GET
   * Usa el objeto fetch, para coger un elemento que hay en una URL
   * Una vez que lo coge, se realiza el método then(), un método del objeto fetch. Este método, pide por parámetro una función (que creamos nosotros), en la que se usa como parámetro el elemento que ha cogido fetch
   * Si hay varios .then() uno después de otro, cada then() se ejecuta después del anterior, y toma como parámetro una función, que tiene por parámetro el elemento que ha retornado el anterior then()
   * En este caso, fetch coge un elemento de una URL (la respuesta del otro usuario)
   * Luego el primer then() hace una función, en la cual, si la respuesta es correcta, la retorna, pero si es incorrecta, va a lanzar un Error, y la ejecución del código saltará directamente al catch().
   * La respuesta es pasada a otro then(), que imprime la respuesta por consola
   * Finalmente está el catch, si cualquiera de los then() lanza un Error, la ejecución del código pasa directamente al catch(), que lo va a atrapar
   */
  // function GET() {
  //   fetch(url)
  //     .then((response) => {
  //       if (response.ok) {
  //       //   return response.text();
  //       print_received_message(response.text)
  //       } else {
  //         throw new Error(
  //           "Error en la solicitud. Código de estado: " + response.status
  //         );
  //       }
  //     })
  //     .then((responseText) => {
  //       console.log("Respuesta del servidor: " + responseText);
  //     })
  //     .catch((error) => {
  //       console.log("Error en la solicitud: " + error.message);
  //     });
  // }
  