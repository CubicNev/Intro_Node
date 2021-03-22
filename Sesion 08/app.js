/*----------------------Librerias de Frameworks----------------------*/
var express = require("express"); //Importamos la libreria Express
var bodyParser = require("body-parser"); //Importamos la libreria Body Parser para leer parametros
var mongoose = require("mongoose"); //Moongose, conexión a base de datos

/*-----------------------Datos de MongoDB----------------------------*/
var User = require("./model/user").User;

/*-----------------------Definiciones del servidor--------------------*/
var app = express(); //Declaramos nuestra app principal como express
//Se declara que la App podra extraer parametros
app.use(bodyParser.json()) //Formato JSON
app.use(bodyParser.urlencoded({extended: true}))//Encoded
app.use(express.static('public')); //Se definen los recursos estaticos (Recursos externos al código)
app.set("view engine", "jade"); //Declaramos que sea un motor de vistas y que usaremos JADE


/*----------------------Métodos del servidor----------------------------*/

/*----------------------Métodos que renderizan--------------------------*/
app.get("/", function(req,res){ //Metodo GET, la diagonal invertida representa la página principal

    res.render("index");

});

app.get("/login", function(req,res){ //Metodo GET que se invocara cuando entre la directiva Login
   
    res.render("login");

});

app.get("/new_user", function(req,res){ //Metodo GET que se invocara cuando entre la directiva Login
   
    res.render("new_user");

});

/*----------------------Métodos de funcionalidad(HTTP)------------------------*/
//separamos los metodos que pintan de las funcionalidades 
//Registro de usuarios
app.post("/register", function(req,res){ //Metodo POST para parametros que se invocara con la directiva users
    
    var user = new User({
        Nombre: req.body.Nombre, 
        Password: req.body.Password
    });

    //function(error,obj,numero)
    user.save(function(err,obj){
        //lo que esta dentro del save es lo que se ejecutara inmediatamente despues de save().
        //si no se ejecuta correctamente err no sera null
        //obj es lo que ingresa el usuario (BSON)
        if(err != null){     
            console.log(String(err));
            res.redirect('/new_user');     
        }else{
            console.log("Usuario se a registrado");
            console.log(obj);
            res.redirect('/'); //Redirecciona como HTTP
        }
    });

});

//Login de usuarios
app.post("/sign", function(req,res){  //Metodo Para desplegar la base

    //Query, Fields, Callback
    //busca en el BSON
    //query que vas a buscar {Nombre(1): req.body.Nombre(2)} (1)Campo del BSON que analiza (2)lo que queremos buscar
    //Fields Lo que quiero mostrar
    //Callback funcion que hace algo, lo que se ejecuta inmediatamnete del find() 
    User.find({Nombre: req.body.Nombre},"Nombre",function(err,doc){
        if(Object.entries(doc).lenght === 0){
            console.log("El usuario que intento ingresar no estaba registrado");
        }else{
            console.log("Intento de ingresar un usuario registrado");
            console.log(doc);
            res.redirect("/");
        }


    }); //Devuelve una arreglo de documentos

    /*User.findOne()
    User.findById()*/

});

app.listen(8080); //Puerto de escucha