"use strict";

module.exports = function (angular) {

    var advancedSearch = angular.module('app.search.advanced',[]);
    
    var advancedSearchCtrl = require('./advanced-search-ctrl')(advancedSearch);
    
    advancedSearch.config(configCb);
    
    function configCb($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('search.advanced', {
                url: '/advanced',
                onEnter: showModal,
                views:{
                    "content": {
                        templateUrl: '/search.html',
                    }
                }
            })
            .state('search.advancedQuery', {
                url: '/advanced/?query&limit&searchIn&sortBy&offset&orderBy&test',
                params: {
                    searchIn : {squash: true , value: 'publication'},
                    limit : {squash: true , value: '15'},
                    sortBy : {squash: true , value: 'ASC'},
                    offset : {squash: true , value: '0'},
                    orderBy : {squash: true , value: 'title'},
                    test : {squash: true , value: 'testvalue'}
                },
                views:{
                    "content": {
                        templateUrl: '/search.html',
                        controller : 'searchCtrl'
                    }
                }
            });

    };
    
    function showModal($uibModal) {
        var modalInstance = $uibModal.open({
            templateUrl: 'modalAdvancedSearch.html',
            controller: 'advancedSearchCtrl',
        });

    };

}
