"use strict";

module.exports = function (cm) {

    cm.controller('cmCtrl', function ($scope, cmConfig, appConfig, $state, promises, $stateParams, recodrsListConfig, cmService) {

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
            return service.isActiveTab(tabs, $scope.currentSection);
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
        var service = cmService;

        $scope.currentSection = $stateParams.searchIn;
        $scope.tabs = $scope.isActive(config.sections);
        var url = service.generateQueryParams(appConfig.paths.simpleSearchPath, $stateParams);
        promises.getAsyncData('GET', url)
            .then(
                function (responce) {
                    console.log(responce)
                    $scope.headerConfig = service.setHeaderConfig(responce.data[$scope.currentSection], recodrsListConfig.headerConfig, $stateParams);
                    $scope.headerConfig.visibility = true;
                    $scope.itemConfig = recodrsListConfig.itemConfig;
                    $scope.itemsList = responce.data[$scope.currentSection].items;
                }
            )

    });

}
