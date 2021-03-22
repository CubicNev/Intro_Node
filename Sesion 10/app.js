/*----------------------Librerias de Frameworks----------------------*/
var express = require("express"); //Importamos la libreria Express
var bodyParser = require("body-parser"); //Importamos la libreria Body Parser para leer parametros
var session = require("express-session"); //Librería que nos permite el uso de sesiones
var router_users = require("./routes"); //Rutas de un usuario logeado
var validation_middleware = require("./middlewares/session"); //Middleware que valida
var router =  require("./router");

/*-----------------------Datos de MongoDB----------------------------*/
var User = require("./model/user").User;


/*-----------------------Definiciones del servidor--------------------*/
var app = express(); //Declaramos nuestra app principal como express
//Se declara que la App podra extraer parametros
app.use(bodyParser.json()) //Formato JSON/
app.use(bodyParser.urlencoded({extended: true}))//Encoded
app.use(express.static('public')); //Se definen los recursos estaticos (Recursos externos al código)
app.set("view engine", "jade"); //Declaramos que sea un motor de vistas y que usaremos JADE
app.use(session({secret: "f156e7995d521f30e6c59a3d6c75e1e5"})); //Palabra secreta para sesiones
//Oscar en MD5 = f156e7995d521f30e6c59a3d6c75e1e5


/*----------------------Métodos del servidor----------------------------*/


/*----------------------Métodos que renderizan--------------------------*/
app.get("/", function(req,res){ //Metodo GET, la diagonal invertida representa la página principal

    if(String(req.session.user_id) == "undefined"){

        res.render("index");

    } else{

        res.redirect("/users/");
    }
    
});

app.get("/login", function(req,res){ //Metodo GET que se invocara cuando entre la directiva Login
   
    res.render("login");

});

app.get("/new_user", function(req,res){ //Metodo GET que se invocara cuando entre la directiva Login
   
    res.render("new_user");

});


/*----------------------Métodos de funcionalidad (HTTP)------------------------*/

//Registro de usuarios
app.post("/register", function(req,res){ //Metodo POST para parametros que se invocara con la directiva users
    
    var user = new User({
        Nombre: req.body.Nombre, 
        Password: req.body.Password,
        Email: req.body.Email
    });

    //function(error,obj,numero)
    user.save(function(err,obj){
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

    console.log("Verificando Entrada de Usuario");
    //Query, Fields, Callback
    User.find({Email: req.body.Email, Password: req.body.Password},function(err,doc){

        if(Object.entries(doc).length === 0){

            console.log("El usuario que intento ingresar no estaba registrado");
            res.redirect("/login");

        } else{
            console.log("Ingreso al sistema el usuario: " + doc[0].Email);
            console.log("Creando sesión");
            req.session.user_id = doc[0]._id; 
            console.log("Sesión creada:"+req.session.user_id);
            res.redirect("/users/"); //Redireccionamos al modulo que le pertenece al usuario
        }
    }); //Devuelve una arreglo de documentos
});

//Verificación de sesión
app.get("/logout", function(req,res){

    req.session.destroy();
    res.redirect("/");
});

/*---------------------Rutas y Middlewares-----------------------------------------*/

app.use("/users", validation_middleware); //Middlewares (Solo se usara bajo la directiva usuarios)
app.use("/users", router_users); //Rutas (Solo se usara bajo la directiva usuarios)
app.use("/**",router);

app.listen(8080); //Puerto de escucha


/**
    RUTAS
        Especificacion de pantallas o recursos para usuarios especificos. Hay que agrupar vistas por usuarios.

    Nosotros podemos crear un middleware, los ponemos como puentes.

 */