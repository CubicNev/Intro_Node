var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/Node"); //Si no existe, se crea

//var Lista_Genero = ["Hombre","Mujer"];

var user_Schema = new Schema({
    //debemos validar en el front y en el servidor
    Nombre: {type: String, maxlength:[10,"Máximo 10 caracteres"]},
    Password: {type: String, minlength:[5,"Mínimo 5 caracteres"]}
    //Sexo: {type: String, enum: Lista_Genero, message: "Opcón no valida"}
    //Email: {type: String, required:"Correo Obligatorio, match:Expresion"}
    // var Expresion= ^{[a-z][A-Z][0-9]+{3-10}@{[gmail][hotmail][outlook]}.{[com]}}
});

var User = mongoose.model("User",user_Schema);

module.exports.User = User;

/*Parametros BSON

String, Number, Date, Buffer
Boolean, mixed, Object, Array*/


