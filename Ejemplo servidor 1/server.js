var http = require ("http"),
fs = require("fs");

http.createServer(function(req, res){

fs.readFile("./index.html", function(err, html){

    res.writeHead(500, {"Content-Type" : "text/html"})

    res.write(html);
    res.end();
}) 

}).listen(8080);

/*  200 -todo bien
    300 - ya se movio
    400 - No se encontro
    500 - Error
*/