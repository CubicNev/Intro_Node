/* 
    ---Conceptos---

        -Renderizar : proceso de construir o generar imagenes.
        -Motor de vistas: herramienta que sirve para generar las estructuras de cualquier HTML.

    ---JADE INSTALL---
        npm install jade --save (--save instala en el directorio en el que estamos, -g instalacion global: NO RECOMENDADO)

*/
var express = require("express") //importaciones

var app = express();

//Motor de vistas para front
app.set("view engine", "jade") //POMNTE A HACER UN MOTOR DE VISTA CON JADE

app.get("/"/*Directorio de raiz*/,function(req, res){

    res.render("index");//Para renderizar vistas, nos marca error si no ponemos una carpeta llamada "views" con todos los .jade
});

app.listen(8080); //de ley, siempre escuchamos un puerto

/*

Jade es casi igual a html, no hay etiquetas ni cierres, pero lo que importa es la identacion, usar una de dos tabs o espacios

    -regex para datos sensibles
    -M.V. para casos mas generales

    ---Express--- usa peticiones HTTP
    Metodos de peticion de datos
        -Get.- Solicita un recurso en especifico, se utiliza para pedir datos ligeros.
        -OPTIONS.- Solicita informacion de los medios de comunicacion del recurso
        -POST.- Envia un recurso en especifico, algo que repercute o modifica algo en el servidor (Envia el JSON cifrado)
        -HEAD.- mismo metodo que GET pero sin el cuerpo.
        -DELETE.- Se elimina un recurso del servidor para el usuario (Por ejemplo un ban; se elimina un recurso para el usuario para que ya no sea accedible)
        -PUT.- El usuario puede insertarse o actualizar a si mismo un recurso (Estara en el middle, aloja un recurso externo a nuestro servidor a traves de una peticion y es individual).
        -CONNECT.- Establece comunicación de un recurso (como un tunel).
        -TRACE.- Pruebas donde por medio de un bucle, se envian a un recurso.
*/