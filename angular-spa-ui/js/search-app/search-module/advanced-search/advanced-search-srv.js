"use strict";

module.exports = function (advancedSearch) {
    
    advancedSearch.service('advancedSearchConfig', function () {
        
        var config = require('./advanced-search-config');
        
        return {
            config : config
        }
    });
    
}