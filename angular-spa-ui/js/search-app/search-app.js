"use strict";

var angular = require('angular');
var uiRouter = require('angular-ui-router');

var app = angular.module('searchApp', [uiRouter]);

require('./bootstrap')(app);
require('./cart-module')(app);
require('./search-module')(app);
require('./search-module/advanced-search')(app);
require('./tags-module')(app);

app
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('search.simple');
    })
    .run(function () {

    });

angular.bootstrap(document, ['searchApp']);
