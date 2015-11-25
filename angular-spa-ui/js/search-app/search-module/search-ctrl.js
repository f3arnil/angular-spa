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
                        +params.limit+'&sortBy='+params.sortBy+'&orderBy='+params.orderBy;
            $scope.query = params.query;
            promises.getAsyncData(config.methods.GET, queryUrl)
            .then(function (result) {
                console.log(result);
                $scope.queryResult = result.data.publication.items;
                $scope.resMetrics = {};
                $scope.resMetrics.page = result.data.publication.page;
                $scope.resMetrics.perPage = result.data.publication.perPage;
                $scope.resMetrics.count = result.data.publication.count;
                $scope.showResults = true;
            })
            .catch(function (err) {
                console.log('Error - cant get data!' + err);
            })
        }
        
        $scope.find = function () {
            $scope.showResults = false;
            $stateParams = {};
            $state.go('search.simpleQuery', { query: $scope.query }, { inherit : false, reload : true });
        };

        $scope.open = function (size) {

            var modalInstance = $uibModal.open({

                animation: $scope.animationsEnabled,
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: size,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });

            modalInstance.result.then(
                function (selectedItem) {
                    $scope.selected = selectedItem;
                    console.log($scope.selected);
                },
                function () {
                    console.log('Modal dismissed at: ' + new Date());
                });
        };
        
        $scope.items = ['item1', 'item2', 'item3'];
        $scope.animationsEnabled = true;

    });
    
};
