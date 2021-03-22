var express = require("express"); 

var router = express.Router(); //Redirecciona rutas

//Vamos a agrupar todas las rutas
//localhost:8080/users/[RUTAS DE USERS]
router.get("/"/*Es lo que sigue despues de users*/,function(req,res){ //Metodo principal

    res.render("users/home");

});

module.exports = router;