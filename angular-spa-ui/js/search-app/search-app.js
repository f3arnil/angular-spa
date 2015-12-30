"use strict";

// Dependency
var angular = require('angular');
var uiRouter = require('angular-ui-router');
var uiBs = require('angular-ui-bootstrap');

var common = require('../common');
var searchAppSrv = require('./search-app-srv');

var cartModule = require('./cart-module');
var searchModule = require('./search-module');
var tagsModule = require('./tags-module');
var accountModule = require('./manage-account-module');

var searchApp = angular.module('app', [
    uiRouter
    , uiBs
    , 'app.search'
    , 'app.cart'
    , 'app.tags'
    , 'app.account'
]);

common(searchApp);
searchAppSrv(searchApp);

cartModule(angular);
searchModule(angular);
tagsModule(angular);
accountModule(angular);

searchApp
    .config(configCb)
    .run();

angular.bootstrap(document, [searchApp.name]);

function configCb($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
        .otherwise('search/simple');
};
