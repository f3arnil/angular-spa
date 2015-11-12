"use strict";

require('angular-ui-router');

var search = angular.module('search', ['ui.router']);

search.config(function ($stateProvider) {
    $stateProvider
        .state('search', {
          url: '/search',
          template: 'Hello world from search module',
        })
  });

module.exports = search;
