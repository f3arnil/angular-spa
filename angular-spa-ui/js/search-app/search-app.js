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
