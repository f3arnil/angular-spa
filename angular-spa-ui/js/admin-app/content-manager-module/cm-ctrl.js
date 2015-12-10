"use strict";

module.exports = function (cm) {

    cm.controller('cmCtrl', function ($scope, cmConfig, appConfig, $state, promises, $stateParams, $injector, cmService, recordsListConfig) {
        
        $scope.$on('goToPage', function (event, data) {
            console.log(event.name + ' Data catched!' + data);
        });

        $scope.$on('SetSortBy', function (event, data) {
            console.log(event.name + ' Data catched!' + data);
        });

        $scope.$on('SetLimit', function (event, data) {
            console.log(event.name + ' Data catched!' + data);
        });

        $scope.goToPage = function () {};

        $scope.setSortBy = function () {};

        $scope.setLimit = function () {};

        // Set active tab
        $scope.isActive = function (tabs) {
            return cmService.isActiveTab(tabs, $scope.currentSection);
        };

        // Tab click go to state
        $scope.changeTab = function (place) {
            $state.go('content', {
                searchIn: place
            });
            //$state.go('query', { limit : '20' });
        };

        var config = cmConfig.config;
        var appConfig = appConfig.config;
        

        $scope.currentSection = $stateParams.searchIn;
        $scope.tabs = $scope.isActive(config.sections);
        var url = cmService.generateQueryParams(appConfig.paths.simpleSearchPath, $stateParams);
        promises.getAsyncData('GET', url)
            .then(
                function (responce) {
                    console.log(responce);
                    var service = $injector.get('rlService');
                    $scope.headerConfig = service.setHeaderConfig(
                        responce.data[$scope.currentSection],
                        recordsListConfig.header, $stateParams);
                    console.log($scope.headerConfig);
                    //$scope.headerConfig.visibility = true;
                    $scope.itemConfig = recordsListConfig.itemConfig;
                    $scope.itemsList = responce.data[$scope.currentSection].items;
                }
            )

    });

}
