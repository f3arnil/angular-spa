"use strict";

var uiRouter = require('angular-ui-router');
var searchApp = angular.module('searchApp', [ uiRouter ]);

angular.element(document).ready(function() {
  searchApp.
      config(function ($stateProvider, $urlRouterProvider) {
        console.log('SearchApp module: init config');
      }).
      run(function () {
        console.log('SearchApp module: run module');
      });

  angular.bootstrap(document, ['searchApp'])
})

module.exports = searchApp;
