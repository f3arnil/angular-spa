/**
 * Module dependencies.
 */

var env_dev = 'Development';
var env_prod = 'Production';

var node_env = process.env.NODE_ENV || env_dev;

var express = require('express')
var app = express();
var mongoose = require('mongoose');
var port = 3000;

// Init mongoose
mongoose.connect('mongodb://admin:admin@ds047504.mongolab.com:47504/sandbox');

// Load entities
var Book = require('./rest-modules/book/')(app, mongoose);
var User = require('./rest-modules/user/')(app, mongoose);
var Index = require('./rest-modules/index/')(app);
var Admin = require('./rest-modules/admin/')(app);

// Configuration
app.configure(function () {
  app.set('views', __dirname + '/views-global');
  app.set('view engine', 'jade');
  app.set('view options', {
    layout: false
  });
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function () {
  app.use(express.errorHandler( {dumpExceptions: true, showStack: true} ));
});

app.configure('production', function () {
  app.use(express.errorHandler());
});

app.listen(port, function () {
  console.log("Express server listening on port %d in %s mode", port, app.settings.env);
});
