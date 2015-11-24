"use strict";

module.exports = function (angular) {

    var advancedSearch = angular.module('app.search.advanced',[]);
    
    advancedSearch.config(configCb);
    
    function configCb($stateProvider) {
        $stateProvider
            .state('search.advanced', {
                url: '/advanced',
                views:{
                    "content": {
                        templateUrl: '/search.html',
                        controller : function ($scope) {
                            $scope.greeting = 'Hello world from search advanced!';
                        }
                    }
                }
        });
    };

}
