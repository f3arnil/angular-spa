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

    cm.service('cmService', function () {

        //Generate fount results "to" (RESULTS $from - $to )
        var setResultTo = function (currentPage, pubPerPage, resultsCount) {
            var resultsTo = currentPage * pubPerPage;
            if (resultsTo > resultsCount) {
                resultsTo = resultsCount;
            }
            return resultsTo;
        };

        var setHeaderConfig = function (data, config, stateParams) {
            config.params.resultsCount.params.count = data.count;
            config.params.resultsCount.params.from = (data.page * data.perPage) - data.perPage + 1;
            config.params.resultsCount.params.to = setResultTo(data.page, data.perPage, data.count);
            config.params.resultsCount.visibility = true;
            config.params.sortBy.params.value = stateParams.sortBy;
            config.params.sortBy.visibility = true;
            config.params.resultsPerPage.params.value = stateParams.limit;
            config.params.resultsPerPage.visibility = true;
            return config;
        };

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
            setHeaderConfig: setHeaderConfig,
            setResultTo: setResultTo,
            generateQueryParams: generateQueryParams,
            isActiveTab: isActiveTab
        }
    });
}
