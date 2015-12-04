"use strict";

module.exports = function (cm) {
    
    cm.controller('cmCtrl', function ($scope, cmConfig, appConfig, $state, promises, $stateParams) {
        
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
        $scope.showResults = false;
        $scope.currentSection = $stateParams.searchIn;
        $scope.tabs = $scope.isActive(config.sections);
        
        var url = generateQueryParams(appConfig.paths.simpleSearchPath, $stateParams);
        promises.getAsyncData('GET', url)
            .then(
                    function (data) {
                        $scope.name = 'Alex';
                        console.log(data);
                        $scope.queryResults = data.data[$scope.currentSection];
                        $scope.showResults = true;
                    }
            )
    });
}