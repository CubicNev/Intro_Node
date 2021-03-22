
var http = require ("http"), /*Llama a la libreria de HTTP*/
fs = require("fs"); /* libreria de manejo de archivos*/

http.createServer(function(req, res){

fs.readFile("./index.html", function(err, html){
    res.write(html);
    res.end();
}) /* err para manejar errores, html para ecribir*/

}).listen(8080);



/*
Headers.- Bloque de codigo donde se especifica la informacion de cualquier elemento.

 - Codigo de indentificación (100,200,300,400,500)
    *familia 200 exitos
    *familia 400 no se encuentra
    *familia 300 se movio
    *familia 500 error de servidor
- Content-Type
    *img
    *text/plain
    *JSON
- Funciones (responder peticion, servidor lo indica,etc.)

Sirve para estatus de trabajo, manejo de errores, 