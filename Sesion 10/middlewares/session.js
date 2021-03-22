var User = require("../model/user").User;

module.exports = function(req,res,next){ //Exporto el modulo para usarla en otro lado

    if(!req.session.user_id){

        res.redirect("/login");

    } else{

        User.findById(req.session.user_id, function(err, user){

            if(err){

                console.log(err);
                res.redirect("/login");
            
            }else{

                res.locals = {user: user}//Con el metodo locals le mandamos cosas al front
                next();//Sentencia para que siga el flujo, se parece un poco a un break. Se mueve entre archivos hasta que se acaben.
                //Le estas diciendo que se pase al siguiente midleware.

            }
        });

    
    }
}