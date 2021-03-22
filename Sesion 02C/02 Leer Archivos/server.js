/*Programación Asíncrona*/

var http = require("http"), /*Bibliotecas de Node JS*/
    fs = require("fs");     /*HTTP, FS*/ 

http.createServer(function(req,res){
    
    fs.readFile("./index.html",function(err,html){
        res.write(html);
        res.end();
    })
    
}).listen(8080);