"use strict";

require('angular-ui-router');
require('./advanced-search')

var search = angular.module('search', ['advancedSearch', 'ui.router']);

search.config(function ($stateProvider) {
    $stateProvider
        .state('search', {
            abstract: true,
            url: '/search',
            //template: 'Hello world from search module',
            template: '<ui-view/>'
        })
        .state('search.simple', {
            url: '.simple',
            template: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
        })
  });

module.exports = search;
