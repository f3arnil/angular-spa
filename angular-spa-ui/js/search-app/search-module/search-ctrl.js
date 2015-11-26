"use strict";

module.exports = function (search) {

    search.controller('searchCtrl', function ($scope, $http, appConfig, $uibModal, $stateParams, $state, promises) {
        
        var config = appConfig.config;
        $scope.queryResult = '';
        $scope.showResults = false;
        $scope.queryParams = $stateParams;
        var countParams = Object.keys($scope.queryParams).length;
        if (countParams === 0) {
            $scope.queryParams = null;
        } else {
            var params = $scope.queryParams,
                queryUrl = '/service/search/?query='+params.query
                        +'&offset='+params.offset+'&limit='
                        +params.limit+'&sortBy='+params.sortBy+'&orderBy='+params.orderBy+'&test='+params.test;
            $scope.query = params.query;
            promises.getAsyncData(config.methods.GET, queryUrl)
            .then(function (data) {
                $scope.queryResult = data.data.publication.items;
                $scope.showResults = true;
            })
            .catch(function (err) {
                console.log('Error - cant get data!' + err);
            })
        }
        $scope.modal = function () {
            $state.go('search.advanced');
        }
        $scope.find = function () {
            $scope.showResults = false;
            $stateParams = {};
            $state.go('search.simpleQuery', { query: $scope.query }, { inherit : false });
        };
    });
    
};
