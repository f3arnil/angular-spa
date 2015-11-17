"use strict";

require('angular-ui-router');

var advancedSearch = angular.module('advancedSearch', ['ui.router']);

advancedSearch
    .config(function ($stateProvider) {
        $stateProvider
            .state('search.advanced', {
                url: '.advanced',
                template: "Hello world advanced search"
        });
    });

module.exports = advancedSearch;
