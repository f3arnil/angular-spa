"use strict";

module.exports = function(angular) {

    var advancedSearch = angular.module('searchApp.Search.advanced',[]);
    
    advancedSearch.config(function ($stateProvider) {
            $stateProvider
                .state('search.advanced', {
                    url: '/advanced',
                    views:{
                    "content": {
                        templateUrl: '/search.html',
                        controller : function($scope){
                            $scope.greeting = 'Hello world from search advanced!';
                        }
                    }
                }
            });
        });

}
