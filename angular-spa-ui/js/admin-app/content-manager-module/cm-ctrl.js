"use strict";

module.exports = function (cm) {

    cm.controller('cmCtrl', function ($scope, $state, promises, $stateParams, cmService, configService, contentStorage, appStorage, rlService) {

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
        };

        var sections = configService.getData('contentManagerConfig', 'sections'),
            simpleSearchPath = configService.getData('appConfig', 'paths.simpleSearchPath'),
            recordsListHeaderConfig = configService.getData('recordsListConfig', 'header'),
            recordsListItemConfig = configService.getData('recordsListConfig', 'itemConfig');

        $scope.currentSection = $stateParams.searchIn;
        $scope.tabs = $scope.isActive(sections);
        var url = cmService.generateQueryParams(simpleSearchPath, $stateParams);
        promises.getAsyncData('GET', url)
            .then(
                function (responce) {
                    console.log(responce);
                    $scope.headerConfig = rlService.setHeaderConfig(responce.data[$scope.currentSection], recordsListHeaderConfig, $stateParams);
                    $scope.itemConfig = recordsListItemConfig;
                    $scope.itemsList = responce.data[$scope.currentSection].items;
                }
            )

    });

}
