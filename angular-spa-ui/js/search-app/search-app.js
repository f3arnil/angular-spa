"use strict";

// Dependency
var angular = require('angular');
var uiRouter = require('angular-ui-router');
var app = angular.module('searchApp', [uiRouter]);
var bootstraping = require('./bootstrap');
var cartModule = require('./cart-module');
var searchModule = require('./search-module');
var tagsModule = require('./tags-module');

// Implementation
bootstraping(app);
cartModule(app);
searchModule(app);
tagsModule(app);

app
    .config(configCb)
    .run();

angular.bootstrap(document, [app.name]);

// List functions
function configCb($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
        .otherwise('search.simple');
};
