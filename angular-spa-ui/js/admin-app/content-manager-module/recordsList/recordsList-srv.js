"use strict";

module.exports = function (app) {

    app.service('rlService', function (recordsListConfig) {
        
        var findValueId = function (val, object) {
            for (var x in object) {
                if (object[x].value === val) {
                    return x;
                }
            }
            return false;
        };
        
        //Generate fount results "to" (RESULTS $from - $to )
        var setResultTo = function (currentPage, pubPerPage, resultsCount) {
            var resultsTo = currentPage * pubPerPage;
            if (resultsTo > resultsCount) {
                resultsTo = resultsCount;
            }
            return resultsTo;
        };
        
        var setResultsCount = function (config, visibility, from, to, count) {
            var defaultParams = recordsListConfig.header.params.resultsCount;
            config.params.resultsCount.visibility = visibility || defaultParams.visibility;
            config.params.resultsCount.params.from = from || defaultParams.params.from;
            config.params.resultsCount.params.to = to || defaultParams.params.to;
            config.params.resultsCount.params.count = count || defaultParams.params.count;
            return config;
        };
        
        var setSortBy = function (config, visibility, value) {
            console.log(config);
            var defaultParams = recordsListConfig.header.params.sortBy;
            config.params.sortBy.visibility = visibility || defaultParams.visibility;
            config.params.sortBy.params.value = value || defaultParams.params.value;
            return config;
        };
        
        var getDefault = function (way, object) {};
        
        var setResultsPerPage = function (config, visibility, value) {
            var defaultParams = recordsListConfig.header.params.resultsPerPage;
            config.params.resultsPerPage.visibility = visibility || defaultParams.visibility;
            config.params.resultsPerPage.params.value = value || defaultParams.params.value;
            return config;
        };
        
        var setPagination = function (config, visibility, totalItems, currentPage, maxSize, pgClass, rotate, itemsPerPage) {
            var defaultParams = recordsListConfig.header.params.pagination;
            config.params.pagination.visibility = visibility || defaultParams.visibility;
            config.params.pagination.params.totalItems = totalItems || defaultParams.params.totalItems;
            config.params.pagination.params.currentPage = currentPage || defaultParams.params.currentPage;
            config.params.pagination.params.maxSize = maxSize || defaultParams.params.maxSize;
            config.params.pagination.params.class = pgClass || defaultParams.params.class;
            config.params.pagination.params.rotate = rotate || defaultParams.params.rotate;
            config.params.pagination.params.itemsPerPage = itemsPerPage || defaultParams.params.itemsPerPage;
            return config;
        };
        
        var setHeaderConfig = function (data, config, stateParams) {
            console.log(recordsListConfig)
            var resultsCount = data.count || false,
                resultsFrom = (data.page * data.perPage) - data.perPage + 1 || false,
                resultsTo = setResultTo(data.page, data.perPage, data.count) || false;
            
            if (resultsCount && resultsFrom && resultsTo) {
                config = setResultsCount(config, true, resultsFrom, resultsTo, resultsCount);
            } else {
                console.warn('Cant set header resultsCount');
            }
            
            var sortBy = stateParams.sortBy || true;
            
            if (sortBy) {
                config = setSortBy(config, true, sortBy);
            } else {
                console.warn('Cant set header sortBy');
            }
            
            var resultsPerPage = stateParams.limit || false;
            if (resultsCount) {
                config = setResultsPerPage(config, true, resultsPerPage);
            } else {
                console.warn('Cant set header limit');
            }
            
            var currentPage = data.page || false;
            if (currentPage && resultsPerPage && resultsCount) {
                config = setPagination(config, true, resultsCount, currentPage, null, null, false, resultsPerPage);
            } else {
                console.warn('Cant set header pagination');
            }
            
            config.visibility = true;
            return config;
        };
        
        return {
            findValueId : findValueId,
            setResultsCount : setResultsCount,
            setSortBy : setSortBy,
            setResultsPerPage : setResultsPerPage,
            setPagination : setPagination,
            setHeaderConfig: setHeaderConfig,
            setResultTo: setResultTo
        }
    });

};
