var express = require("express")

var app = express();

app.get("/", function(req, res){

    res.send("Hola Mundo"); //Este metodo cierra

});

app.listen(8080);