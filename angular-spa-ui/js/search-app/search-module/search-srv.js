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
    
    search.service('searchFunctional', function() {
                
        //Find value in objects list (for limits and sortBy) and returns its id
        function findValueId(val, object) {
            for (var x in object) {
                if (object[x].value === val ) {
                    return x;
                }
            }
        };
        
        //if object has no keys return true, else false
        function isEmptyObject(obj) {
            if (angular.equals({}, obj)) {
            //if (Object.keys(obj).length === 0) {
                return true;
            }
            return false;
        }
        
        return {
            findValueId : findValueId,
            isEmptyObject : isEmptyObject
        }
    })
}
