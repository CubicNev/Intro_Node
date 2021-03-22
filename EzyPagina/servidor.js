/* ------------------------ Importaciones ------------------------ */ 
var express = require("express"); //Para el middleware 
var bodyParser = require("body-parser"); //Para leer los parametros del json
var mongoose = require("mongoose"); //Para conectarse con Mongo
var session = require("express-session");

/* ------------------------ Datos para MongoDB ------------------------ */
var User = require("./modelo/User").User;

/* ------------------------ Definiciones del servidor ------------------------ */
var servidor = express(); 

//Para extrar los parametros
servidor.use(bodyParser.json());
servidor.use(bodyParser.urlencoded({extended: true}));

//Para el render
servidor.use(express.static('public')); //De aqui se extraen los recursos ajenos al codigo que no cambian
servidor.set("view engine", "jade"); //Para el Motor de vistas, en este caso se usa Jade

//Para la sesión platano
servidor.use(session({secret: "1a260cc8ab8ab2988bd175ea21a61020"}));

/* ------------------------ Métodos del servidor ------------------------ */


/* ------------------------ Métodos para renderización ------------------------ */
servidor.get("/", function(req, res){ //Renderizacion para pagina principal
    
    if(String(req.session.user_id) == "undefined"){

        res.render("index", { pagina: "index" });

    } else {

        res.redirect("/inicio");

    }
    
});


servidor.get("/uwu", function(req, res){ 

        res.render("uwu");

});

servidor.get("/registro", function(req, res){ //Para renderizar el registro
    res.render("registro", { pagina: "registro" } );
});

servidor.get("/login", function(req, res){ //Para renderizar login
    res.render("login", { pagina: "login" } );
});

servidor.get("/datos", function(req, res){ //Renderiza la pagina de datos
    res.render("datos", { pagina: "datos" } );
});

servidor.get("/inicio", function(req, res){
    res.render("inicio", { pagina: "inicio" });
});

/* ------------------------ Funcionalidad ------------------------ */

servidor.get("/404", function(req, res){
    res.render("404", { pagina: "404" });
});

servidor.get("/error", function(req, res){
    res.render("error", { pagina: "error" });
});

//Para el registro de usuarios
servidor.post("/register", function(req, res){ 

    var user = new User({ //Trae los datos del formulario para la bd
        Nombre: req.body.Nombre,
        Password: req.body.Password,
        Sexo: req.body.Sexo,
        Email: req.body.Email
    });

    /*console.log("Nom: " + String(req.body.Nombre));
    console.log("Pass: " + String(req.body.Password));
    console.log("sex: " + String(req.body.Sexo));
    console.log("ema: " + String(req.body.Email));*/

    user.save(function(err, obj){ //Guardar en el bd
        if(err != null) { //Si hay un error
            console.log(String(err));
            res.redirect('/registro');
        } else {
            console.log("Un usuario se ha registro");
            console.log(obj);
            res.redirect("/");
        }
    });

});

//Para el login de usuarios
servidor.post("/sign", function(req, res){

    console.log(" Verificando entrada...");
    
    User.find({Nombre: req.body.Nombre, Password: req.body.Password}, function(err,doc){

        if(Object.entries(doc).length === 0){
            console.log(" Ingreso invalido.");
            res.redirect("/error");
        } else {
            console.log(" Ingreso autorizado. Usuario: " + doc[0].Nombre);
            req.session.user_id = doc[0]._id;
            console.log(" Sesion creada: " + req.session.user_id);
            res.redirect("/inicio");
        }
    });
});

//Para verificar sesion
servidor.get("/inicio", function(req, res){
    if(String(req.session.user_id) == "undefined"){
        console.log("Error en la sesión");
        res.redirect("/error")
    } else {
        console.log(" Sesión verificada con id: " + req.session.user_id);
        res.render("inicio", { pagina: "inicio" });
    }
});

servidor.get("/logout", function(req, res){
    req.session.destroy();
    console.log(" Sesion cerrada");
    res.redirect("/");
});

servidor.listen(8080);