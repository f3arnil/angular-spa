"use strict";

module.exports = function (angular) {

    require('./advanced-search')(angular);
        
    var search = angular.module('app.search', ['app.search.advanced']);
    
    var searchCtrl = require('./search-ctrl')(search);
    var searchSrv = require('./search-srv')(search);
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
                    searchIn : {squash: true , value: 'publication'},
                    limit : {squash: true , value: '15'},
                    sortBy : {squash: true , value: 'ASC'},
                    offset : {squash: true , value: '0'},
                    orderBy : {squash: true , value: 'title'},
                },
                views:{
                    "content": {
                        templateUrl: '/search.html',
                        controller : 'searchCtrl'
                    }
                }
            });
    };

};
