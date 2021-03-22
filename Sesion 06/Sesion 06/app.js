/*TypeScript >(compilado)< JavaScript (porque javascript es mas entendible para los navegadores)
TypeScript es un SuperSet de JS, nos añade funcionalidades de manejo de objetos y metodos estaticos y permite progracion de algo en
lineas que JS, por ello, usamos TS y compilamos para transformar a JS
*/
/*
SASS es un SuperSet de CSS
*/

var express = require("express"); //Importamos la libreria Express
var bodyParser = require("body-parser"); //Importamos la libreria Body Parser para leer parametros
var app = express(); //Declaramos nuestra app principal como express

//Se declara que la App podra extraer parametros
app.use(bodyParser.json()) //Formato JSON, bodyparser toma los parametros de la peticion
app.use(bodyParser.urlencoded({extended: true}))//Encoded

//Se definen los recursos estaticos
app.use(express.static('public'));
/* Ponemos como estatico todo ajeno al funcionamiento de la pagina
Videos, hojas de estilo, audios, etc.
Declaramos como estatico los recursos que estan en la carpeta public
*/

//Declaramos que sea un motor de vistas y que usaremos JADE
app.set("view engine", "jade");

//Metodo GET, la diagonal invertida representa la página principal
app.get("/", function(req,res){ //Metodo Principal 

    res.render("index");

});

//Metodo GET que se invocara cuando entre la directiva Login
app.get("/login", function(req,res){ //Login
   
    res.render("login");

});

//Metodo POST para parametros que se invocara con la directiva users
app.post("/users", function(req,res){ //Login
    
    console.log("Contraseña: "+ req.body.Password);
    console.log("Nombre: "+req.body.Nombre);
    res.render("index");
    
});

app.listen(8080); 