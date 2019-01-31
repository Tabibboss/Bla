// Express is the Web Framework (allows you to create a web server to receive and send data on the web)
var express = require('express');
var app = express();
// body-parser is a middleware for Express that is used to interpret the data that the service will receive in different formats (JSON objects, files, etc.)
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// Habilitar CORS (Cross-Origin Requests)
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE');
  // res.header('Access-Control-Allow-Headers', 'Content-Type');
  // res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});



var execPHP = require('./execphp.js')();

execPHP.phpFolder = __dirname + '/../back-end/php';

app.use('*.php',function(request,response,next) {
  execPHP.parseFile(request.originalUrl,function(phpResult) {
    response.write(phpResult);
    response.end();
  });
});






// Sequelize is in the ORM Framework for Databases relations (allows to manipulate the tables of a database as objects in the application)
var Sequelize = require('sequelize');
// var myDatabase = new Sequelize('rami', 'root', '12345678'); // database, user, password

var myDatabase = new Sequelize("rami", 'root', '12345678', {
    host: "localhost",
    dialect: "mysql",
    logging: function () {},
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },

    define: {
        paranoid: true
    }
});



// Create Models (Tables) and routes (endpoints)
require('./models/usuario')(app, myDatabase);



// Provide the front-end files WHEN THEY ARE COMPILED
app.use('/', express.static(__dirname + '/../front-end/release'));


// Start the server
var puerto = 4000;
app.listen(puerto, function() {
	console.log("Run In Port: " + puerto);
});
