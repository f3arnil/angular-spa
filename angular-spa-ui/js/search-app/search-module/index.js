"use strict";

module.exports = function (angular) {

    require('./advanced-search')(angular);
        
    var search = angular.module('app.search', ['app.search.advanced']);
    
    var searchCtrl = require('./search-ctrl')(search);
    var searchSrv = require('./search-srv')(search);
    var searchFilter = require('./search-filter')(search);
    //var searchDir = require('./search-dir')(search);
    
    search.config(configCb);
    function configCb($stateProvider, $urlRouterProvider) {
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
                name: 'simple',
                views:{
                    "content": {
                        templateUrl: '/search.html',
                        controller : 'searchCtrl'
                    }
                }
            })
            .state('search.simpleQuery', {
                url: '/simple/?query&limit&searchIn&sortBy&offset&orderBy',
                params: {
                    searchIn : {squash: true},
                    limit : {squash: true},
                    sortBy : {squash: true},
                    offset : {squash: true },
                    orderBy : {squash: true}
                },
                views:{
                    "content": {
                        templateUrl: '/search.html',
                        controller : 'searchCtrl'
                    }
                }
            })
            .state('search.details', {
                    url: '/details/:type/:id/:backUrl',
                    views:{
                        "content": {
                            templateUrl: '/details.html',
                            controller : 'searchDetailsCtrl'
                        }
                    }
                });
    };

};
