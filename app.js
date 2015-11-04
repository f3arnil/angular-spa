/**
 * Module dependencies.
 */

const ENV_DEV = 'Development';
const ENV_PROD = 'Production';
var applicationArguments = require('./common/application-arguments')();
const ENVIRONMENT = applicationArguments.environment || ENV_DEV;

var express = require('express')
var app = express();
var mongoose = require('mongoose');
var port = 3000;
console.log(ENVIRONMENT);
// Init mongoose
//mongoose.connect('mongodb://admin:admin@ds047504.mongolab.com:47504/sandbox');

// Load modules
var indexModule = require('./rest-modules/index/')(app);
var adminModule = require('./rest-modules/admin/')(app);

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
