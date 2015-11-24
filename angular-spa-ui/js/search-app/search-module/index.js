"use strict";

module.exports = function (angular) {

    require('./advanced-search')(angular);
        
    var search = angular.module('app.Search', ['app.Search.advanced'])
    var searchCtrl = require('./search-ctrl')(search);
    
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
    };

};
