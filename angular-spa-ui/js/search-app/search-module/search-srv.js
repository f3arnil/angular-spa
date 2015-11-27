"use strict";
module.exports = function (search) {
    
    search.service('searchConfig', function () {
        
        var config = require('./search-config');
        
        return {
            config : config
        }
    });
    
    search.service('queryParams', function () {
        
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
        
        return {
            generateQueryParams : generateQueryParams
        }
    });
    
}
