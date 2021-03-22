var http = require("http"),
    fs = require("fs");    

http.createServer(function(req,res){

    fs.readFile("./index.html", function(err,html){

        //res.writeHead(404,{"Content-Type":"application/json"})
        res.writeHead(404,{"Content-Type":"text/html"}) //200- Todo Bien
                                                        //400- No se encontro
                                                        //300- Ya se movio
                                                        //500- Error
        res.write(html);
        //res.write(JSON.stringify({nombre:"Oscar", username:"STK"}));
        res.end();
    });

}).listen(8080);