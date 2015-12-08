"use strict";

module.exports = function (cm) {
    
    cm.controller('cmCtrl', function ($scope, cmConfig, appConfig, $state, promises, $stateParams, recodrsListConfig) {
        
        $scope.$on('goToPage', function (event, data) {
            console.log(event.name + ' Data catched!' + data);
        });
        
        $scope.$on('SetSortBy', function (event, data) {
            console.log(event.name + ' Data catched!' + data);
        });
        
        $scope.$on('SetLimit', function (event, data) {
            console.log(event.name + ' Data catched!' + data);
        });
        
        // Set active tab
        $scope.isActive = function (tabs) {
            angular.forEach( tabs, function (tab) {
                if (tab.value === $scope.currentSection)
                    tab.active = true;
            });
            return tabs;
        };
        
        // Tab click go to state
        $scope.changeTab = function (place) {
            $state.go('content', { searchIn : place });
            //$state.go('query', { limit : '20' });
        };
        
        //Generate fount results "to" (RESULTS $from - $to )
        $scope.setResultTo = function (currentPage, pubPerPage, resultsCount) {
            var resultsTo = currentPage * pubPerPage;
            if (resultsTo > resultsCount){
                resultsTo = resultsCount;
            }
            return resultsTo;
        };
        
        $scope.setHeaderConfig = function (data, config) {
            var currentPage = data.page,
                limit = data.perPage,
                count = data.count,
                resultTo = $scope.setResultTo(data.page, data.perPage, data.count);
            /*
            $scope.resultsFrom = ($scope.currentPage * $scope.limit.value) - $scope.limit.value + 1;
            $scope.resultsCount = publications.count;
            $scope.resultsTo = setResultsTo($scope.currentPage, $scope.limit.value, $scope.resultsCount);
            */
            config.params.resultsCount.params.count = data.count;
            config.params.resultsCount.params.from = (data.page * data.perPage) - data.perPage + 1;
            config.params.resultsCount.params.to = $scope.setResultTo(data.page, data.perPage, data.count);
            config.params.resultsCount.visibility = true;
            config.params.sortBy.params.value = $stateParams.sortBy;
            config.params.sortBy.visibility = true;
            config.params.resultsPerPage.params.value = $stateParams.limit;
            config.params.resultsPerPage.visibility = true;
            return config;
        }
        var generateQueryParams = function (path, stateParams) {
            var url = path;

            for (var x in stateParams) {
                url += x + '=' + stateParams[x];
                if (stateParams[x] != stateParams[Object.keys(stateParams)[Object.keys(stateParams).length - 1]]) {
                    url +='&';
                }
            };
            return url;
        };
        
        var config = cmConfig.config;
        var appConfig = appConfig.config;
        $scope.currentSection = $stateParams.searchIn;
        $scope.tabs = $scope.isActive(config.sections);

        var url = generateQueryParams(appConfig.paths.simpleSearchPath, $stateParams);
        promises.getAsyncData('GET', url)
        .then(
                function (responce) {
                        $scope.headerConfig = $scope.setHeaderConfig(responce.data[$scope.currentSection], recodrsListConfig.headerConfig);
                        $scope.headerConfig.visibility = true;
                        $scope.itemConfig = recodrsListConfig.itemConfig;
                        $scope.itemsList = responce.data[$scope.currentSection].items;
                        console.log(responce);
                }
        )
        
    });
}