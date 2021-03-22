var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/Site"); //Si no existe, se crea

var user_Schema = new Schema({

    Nombre: {type: String, maxlength:[10,"Máximo 10 caracteres"]},
    Password: {type: String, minlength:[5,"Mínimo 5 caracteres"]},
    Email: {type: String, required:"Correo Obligatorio"}
});

var User = mongoose.model("User",user_Schema);

module.exports.User = User;