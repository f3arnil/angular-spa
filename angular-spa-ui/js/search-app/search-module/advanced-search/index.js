"use strict";

require('angular-ui-router');

var advancedSearch = angular.module('advancedSearch', ['ui.router']);

advancedSearch
    .config(function ($stateProvider) {
        //console.log($stateProvider);
        $stateProvider
            .state('search.advanced', {
                url: '.advanced',
                // parent: 'search',
                // url: '^/search.advanced',
                // name: 'main',
                // views: {
                //     template: 'Hello!'
                // }
                template: "fhkjsdhgfkjdsghfdsg"
        });
    });

module.exports = advancedSearch;
