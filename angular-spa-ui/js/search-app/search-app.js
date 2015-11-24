"use strict";

var angular = require('angular');
var uiRouter = require('angular-ui-router');
var uiBs = require('angular-ui-bootstrap');

var searchApp = angular.module('searchApp', [
    uiRouter, 
    uiBs, 
    'searchApp.Search', 
    'searchApp.Cart', 
    'searchApp.Tags'
]);

require('./bootstrap')(searchApp);
require('./cart-module')(angular);
require('./search-module')(angular);
require('./tags-module')(angular);

searchApp
    .config(configCb)
    .run();

angular.bootstrap(document, [searchApp.name]);

function configCb($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
        .otherwise('search/simple');
};




// var angular = require('angular');
// var uiRouter = require('angular-ui-router');
// var uibs = require('angular-ui-bootstrap');
// var cartModule = require('./cart-module');
// var searchModule = require('./search-module');
// var tagsModule = require('./tags-module');

// var searchApp = angular.module('searchApp', [
//     uiRouter,
//     uibs,
//     'searchApp.Search',
//     'searchApp.Cart',
//     'searchApp.Tags'
// ]);

// cartModule(angular);
// searchModule(angular);
// tagsModule(angular);

// searchApp
//     .config(configCb)
//     .run();

// angular.bootstrap(document, [searchApp.name]);

// function configCb($stateProvider, $urlRouterProvider) {
//     $urlRouterProvider
//         .otherwise('search/simple');
// };
