var http = require("http"),
    fs = require("fs");    

http.createServer(function(req,res){

    fs.readFile("./index.html", function(err,html){

        var html_string = html.toString();

        var variables = html_string.match(/[^\{\}]+(?=\})/g);
        var descripcion = "Cursjbhadskjdajdahdajkadsj xdxdxdxd";

        for(var i = variables.length - 1; i >= 0; i--){

            var value = eval(variables[i]); //Pasas un string lo toma como JS
            
            html_string = html_string.replace("{"+variables[i]+"}",value);

        }

        res.writeHead(200,{"Content-Type":"text/html"})  
        res.write(html_string);
        res.end();
    });

}).listen(8080);