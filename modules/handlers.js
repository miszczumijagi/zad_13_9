var fs = require('fs');
var formidable = require('formidable');

var fileName;
    //path for uploading files
    filePath = './upload/';

exports.upload = function(request, response) {
    console.log("Rozpoczynam obsługę żądania upload.");
    var form = new formidable.IncomingForm();
     if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath);
    }

    form.parse(request, function(err, fields, files) {
        
        if(files.upload === undefined) {
            console.log('No form sended!'.red);
            response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            response.write('<h2>Formularz nie został wysłany!!</h2>');
            response.write('<h2>Aby wczytać plik wejdź <a href="/">tutaj</a></h2>');
            response.end();

        } else {
            if(files.upload.size) {

            //set file name 
            fileName = fields.fileName.trim() || files.upload.name;
            //validate fileName 
            fileName = fileName.replace(/[\s]/g, '_').replace(/[\\/:*?<>|]/g, '');

        fs.readFile('templates/uploaded.html', function(err, html) { 
            response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            response.write(html);
            response.end();
        });

    } else {
            console.log('Brak pliku!'.red);
            response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            response.write('File size ZERO or no file!');
            response.end()
        }}
    });
        
     /* Część kodu z zadania (już niepotrzebna)
     var form = new formidable.IncomingForm();
    form.parse(request, function(error, fields, files) {
        fs.renameSync(files.upload.path, "test.png");
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image:<br/>");
        response.write("<img src='/show' />");
        response.end(); 

   }); */
   
} 


exports.welcome = function(request, response) {
    console.log("Rozpoczynam obsługę żądania welcome.");
    fs.readFile('templates/start.html', function(err, html) {
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        response.write(html);
        response.end();
    });
}

exports.show = function(request, response) {
    fs.readFile(filePath + fileName, 'binary', function(err, file) {
        response.writeHead(200, {'Content-Type' : 'image/png'});
        response.write(file, "binary");
        response.end();
    });
}

exports.error = function(request, response) {
    console.log("Nie wiem co robić.");
    response.writeHead(404, {'Content-Type' : 'text/html'});
    response.write("404 :(");
    response.end();
}

exports.style = function(reguest, response) {
    fs.readFile('templates/style.css', function(err, style) {
        response.writeHead(200, {'Content-Type' : "text/css"});
        response.write(style);
        response.end();
    });    
} 