var mongoose = require("mongoose");
var Schema = mongoose.Schema; //Creamos un esquema

mongoose.connect("mongodb://localhost/Project"); //Crea conexion

var Lista_Genero = ["Hombre", "Mujer", "Helicóptero", "Otro"];
//var regexCorreo = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$";

var user_Schema = new Schema({
    Nombre: {type: String, maxlength:[15, "Max15"]},
    Password: {type: String, minlength:[5 , "Min 5"]},
    Sexo: {type: String, enum: Lista_Genero, message: "GeneroOprimido"},
    Email: {type: String, required:"Correo Obligatorio"}
});

var User = mongoose.model("user", user_Schema);
module.exports.User = User;