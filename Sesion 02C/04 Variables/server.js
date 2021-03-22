var http = require("http"),
    fs = require("fs");

http.createServer(function (req, res) {

    fs.readFile("./index.html", function (err, html) { //(error, un archivo)

        var html_string = html.toString();

        var variables = html_string.match(/[^\{\}]+(?=\})/g); //Comparativa, regresa un arreglo de lo que encuentre
        var descripcion = "Mensaje x";

        for (var i = variables.length - 1; i >= 0; i--) { //Modifica todos los corchetitos

            var value = eval(variables[i]); //Pasas un string lo toma como JS

            html_string = html_string.replace("{" + variables[i] + "}", value); //Lo que en cuentre entre corchetes le tiene que poner en lo del arreglo

        }
        //El for no se pone si nomas voy a poner en lugares especificos
        res.writeHead(200, { "Content-Type": "text/html" })  //header
        res.write(html_string);
        res.end();
    });

}).listen(8080);