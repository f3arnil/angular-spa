"use strict";

module.exports = function (app) {

    app.service('recodrsListConfig', function () {

        var config = require('./recordsList-config');

        var getHeaderConfig = function () {
            return angular.copy(config.header)
        };

        var getSortParams = function () {
            return angular.copy(config.sortParams)
        };

        var getResultsPerPage = function () {
            return angular.copy(config.resultsPerPage)
        };

        var getSortParams = function () {
            return angular.copy(config.sortParams)
        };

        var getItemConfig = function () {
            return angular.copy(config.itemConfig)
        };

        return {
            headerConfig: getHeaderConfig(),
            sortParams: getSortParams(),
            resultsPerPage: getResultsPerPage(),
            itemConfig: getItemConfig()
        }
    });


};
