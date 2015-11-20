"use strict";

require('angular');

var uiRouter = require('angular-ui-router');

var app = angular.module('searchApp', [uiRouter]);

require('./bootstrap')(app);
require('./cart-module')(app);
require('./search-module')(app);
require('./tags-module')(app);

function configCb($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
        .otherwise('search.simple');
};

app
    .config(configCb)
    .run();

angular.bootstrap(document, [app.name]);
