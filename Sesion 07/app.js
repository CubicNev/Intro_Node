var express = require("express"); //Importamos la libreria Express
var bodyParser = require("body-parser"); //Importamos la libreria Body Parser para leer parametros
var mongoose = require("mongoose");

var Schema = mongoose.Schema; //Creamos un esquema, lo que esta adentro es una estructura de variable de tipo esquema

//Hacemos la conexion a la base de datos
mongoose.connect("mongodb://localhost/ESCOM"); //Si no existe, se crea

var UserBSON = { //Variable CON ESRUCTURA DE BSON (json=bson)

    Username:String,
    Password:String

};

var User_Schema = new Schema(UserBSON); //Definimos un esquema, el esquema esta vacio
var User = mongoose.model("User",User_Schema); //Variable principal, va a involucrar al modelo, pude tener N esquemas

var app = express(); //Declaramos nuestra app principal como express

//Se declara que la App podra extraer parametros
app.use(bodyParser.json()) //Formato JSON
app.use(bodyParser.urlencoded({extended: true}))//Encoded

//Se definen los recursos estaticos
app.use(express.static('public'));

//Declaramos que sea un motor de vistas y que usaremos JADE
app.set("view engine", "jade");

//Metodo GET, la diagonal invertida representa la página principal
app.get("/", function(req,res){ //Metodo Principal, donde siempre llega la persona

    res.render("index");

});

//Metodo Para desplegar la base
app.get("/find", function(req,res){  
    //es como un select * from

    User.find(function(err,doc){ //Err si no viene nulo hay error
        //Me da todo el BSON (llega en el DOC), y ya de ahi me muevo, nada de consultas UwU
        console.log(doc);
        
    });

    res.redirect('http://localhost:8080/');

});

//Metodo GET que se invocara cuando entre la directiva Login
app.get("/login", function(req,res){ //Login
   
    res.render("login");
    //  RENDER solo pinta
});

//Metodo POST para parametros que se invocara con la directiva users
app.post("/users", function(req,res){ //Login
    
    var user = new User({Username: req.body.Nombre, Password: req.body.Password});
    user.save(function(){ //Guarda al usuario


        console.log("Un usuario se a registrado");
        res.redirect('http://localhost:8080/'); //  es igual a solo poner '/'
        /* 
            Estas en .../localhost:8080/users
        */

    }); 
});

app.listen(8080);

/** NOTAS QUE YA No CUPIERON: xdxdxd

Moongose (Middleware): Es un ODM que maneja relaciones entre los datos que es usado para traducir objetos en MongoDB

Alta .save
Consulta .find
Acciones:
En C:\ 
Crear una carpeta data y dentro db para que funcione Moongose 
 >npm install mongoose --save


 Iniciar la base
 > mongod
 Luego inicar pagina
 > node app.js
 [Cuidado con la depreciacion]
 */