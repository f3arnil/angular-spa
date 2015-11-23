"use strict";

module.exports = function(angular) {

    require('./advanced-search')(angular);
        
    var search = angular.module('searchApp.Search', ['searchApp.Search.advanced'])
    var searchCtrl = require('./search-ctrl')(search);
    
    search.config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('search', {
                abstract: true,
                url: '/search',
                views:{
                        "module-content": {
                            template: '<div ui-view="content"></div>'
                        }
                    }
            })
            .state('search.simple', {
                url: '/simple',
                views:{
                    "content": {
                        templateUrl: '/search.html',
                        controller : 'searchCtrl'
                    }
                }
            })
        });

}
