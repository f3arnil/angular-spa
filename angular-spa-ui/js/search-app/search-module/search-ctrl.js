"use strict";

module.exports = function (search) {

    search.controller('searchCtrl', function ($scope, $http, appConfig, $uibModal) {
        $scope.query = '';
        $scope.queryOffset = 0;
        $scope.queryLimit = 15;
        $scope.querySortBy = 'DESC';
        $scope.searchPlace = 'Publications';
        $scope.queryResult = '';
        $scope.showResults = false;
        $scope.greeting = 'Hello world from search simple!';
        var config = appConfig.config;

        $scope.find = function () {
            $scope.showResults = false;
            var query = $scope.query,
                offset = $scope.queryOffset,
                limit = $scope.queryLimit,
                sortBy = $scope.querySortBy;
            
            $http({ method : config.methods.GET, url : '/service/search/?query='+query+'&offset='+offset+'&limit='+limit+'&sortBy='+sortBy})
                .success(function (data) {
                    $scope.queryResult = data.data.publication.items;
                    $scope.showResults = true;
                });
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
