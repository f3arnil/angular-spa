"use strict";
var searchControllers = angular.module('searchControllers', []);

searchControllers.controller('searchMainPage', ['$scope',
    function ($scope) {
        $scope.greeting = 'Hello from search main page';
    }]);

searchControllers.controller('searchQuery', ['$scope',
    function ($scope) {
        $scope.greeting = 'Hello from search query page';
    }]);

searchControllers.controller('advancedSearch', ['$scope',
    function ($scope) {
        $scope.greeting = 'Hello from advanced Search page';
    }]);
