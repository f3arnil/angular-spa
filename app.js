/**
 * Module dependencies.
 */

var express = require('express')
var routes = require('./routes');
var app = express();
var mongoose = require('mongoose');
var port = 3000;

//mongoose.connect('mongodb://admin:admin@ds047504.mongolab.com:47504/sandbox');

// Configuration

app.configure(function () {
  app.set('views', __dirname + '/views');
  //app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function () {
  app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
});

app.configure('production', function () {
  app.use(express.errorHandler());
});

// Routes

//app.get('/', routes.index);
app.get('/', function (request, response) {
  response.send('GET');
});

app.post('/', function (request, response) {
  response.send('POST');
});

app.put('/', function (request, response) {
  response.send('PUT');
});

app.delete('/', function (request, response) {
  response.send('DELETE');
});

app.listen(port, function () {
  console.log("Express server listening on port %d in %s mode", port, app.settings.env);
});
