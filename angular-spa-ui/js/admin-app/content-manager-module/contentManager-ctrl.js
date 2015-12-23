"use strict";

module.exports = function ($scope, $state, promises, $stateParams, cmService, configService, contentStorage, rlService) {

    $scope.$on('goToPage', function (event, data) {
        data = data * contentStorage.params.limit - contentStorage.params.limit;
        $scope.updateFilter('offset', data);
    });

    $scope.$on('setSortBy', function (event, data) {
        $scope.updateFilter('sortBy', data);
    });

    $scope.$on('setLimit', function (event, data) {
        $scope.updateFilter('limit', data);
    });

    $scope.$on('goToDetails', function (event, data) {
        console.log('Lets go to the details!', data);
    })

    // Set active tab
    $scope.isActive = function (tabs) {
        return cmService.isActiveTab(tabs, contentStorage.params.searchIn);
    };

    // Tab click go to state
    $scope.changeTab = function (place) {
        if (contentStorage.params.searchIn == place)
            return false;

        $state.go(
            'content', {
                searchIn: place
            }, {
                reload: true,
                inherit: false
            }
        );

    };

    // to update sortBy, limit and currentPage
    $scope.updateFilter = function (param, value) {
        contentStorage.params[param] = value;
        contentStorage.data = {};
        $state.go(
            'content',
            contentStorage.params, {
                reload: true
            }
        );
    };

    $scope.setData = function (data, section) {
        data.perPage = contentStorage.params.limit;
        contentStorage.data = data;
        contentStorage.data.searchIn = contentStorage.params.searchIn;
        $scope.headerConfig = rlService.setHeaderConfig(data, recordsListHeaderConfig, $stateParams);
        $scope.itemConfig = recordsListItemConfig;
        $scope.itemsList = data.items;
    };

    var sections = configService.getData('contentManagerConfig', 'sections');
    var simpleSearchPath = configService.getData('appConfig', 'paths.simpleSearchPath');
    var recordsListHeaderConfig = configService.getData('recordsListConfig', 'header');
    var recordsListItemConfig = configService.getData('recordsListConfig', 'itemConfig');

    if (_.isEmpty(contentStorage.params) || !_.isEqual(contentStorage.params, $stateParams)) {
        contentStorage.params = $stateParams;
    }

    $scope.currentSection = contentStorage.params.searchIn;
    $scope.tabs = $scope.isActive(sections);

    var url = cmService.generateQueryParams(simpleSearchPath, contentStorage.params);

    if (!_.isEmpty(contentStorage.data) && contentStorage.params.searchIn === contentStorage.data.searchIn) {
        $scope.setData(contentStorage.data, $scope.currentSection);
    } else {
        promises.getAsyncData('GET', url)
            .then(
                function (responce) {
                    $scope.setData(responce.data[$scope.currentSection], $scope.currentSection);
                }
            )
    }


};
