"use strict";

module.exports = function (cm) {

    cm.service('cmConfig', function () {

        var config = require('./cm-config');

        return {
            config: config
        }
    });

    cm.service('contentStorage', function () {
        return {
            data: {},
            params: {},
            details: {},
            searchType: {}
        }
    });

    cm.service('cmService', function (recordsListConfig, rlService) {

        var generateQueryParams = function (path, stateParams) {
            var url = path;

            for (var x in stateParams) {
                url += x + '=' + stateParams[x];
                if (stateParams[x] != stateParams[Object.keys(stateParams)[Object.keys(stateParams).length - 1]]) {
                    url += '&';
                }
            };
            return url;
        };

        // Set active tab
        var isActiveTab = function (tabs, currentSection) {
            angular.forEach(tabs, function (tab) {
                if (tab.value === currentSection)
                    tab.active = true;
            });
            return tabs;
        };
        
        return {
            generateQueryParams: generateQueryParams,
            isActiveTab: isActiveTab
        }
    });
}
