"use strict";

module.exports = function (app) {
    
    app.service('recodrsListConfig', function () {
        
        var config = require('./recordsList-config');
        
        function getHeaderConfig() {
            return angular.copy(config.header)
        };
        
        function getSortParams() {
            return angular.copy(config.sortParams)
        };
        
        function getResultsPerPage() {
            return angular.copy(config.resultsPerPage)
        };
        
        function getSortParams() {
            return angular.copy(config.sortParams)
        };
                
        function getItemConfig() {
            return angular.copy(config.itemConfig)
        };
        
        return {
            headerConfig : getHeaderConfig(),
            sortParams : getSortParams(),
            resultsPerPage : getResultsPerPage(),
            itemConfig : getItemConfig()
        }
    })
};