/*Ejemplo de Servidor*/

var http = require ("http"); /*Llamada a librería HTTP*/

/*Función del server*/
var manejador = function(solicitud, respuesta){ 

    console.log("Recibimos Petición");
    respuesta.end("Peticion aceptada");

};

/*Creación del servidor*/
var servidor = http.createServer(manejador);

/*Escucha*/
servidor.listen(8080);