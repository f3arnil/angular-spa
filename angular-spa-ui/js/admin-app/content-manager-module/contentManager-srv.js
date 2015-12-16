"use strict";

module.exports = function (configService) {

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
    
    var setVisibility = function (defaultParams, params, config) {

        if (!_.isEqual(defaultParams, params)) {
            config.visibility = true;
        }

        return config;
    }
    
    var findValueId = function (val, array) {
        for (var x in array) {
            if (array[x].value === val) {
                return x;
            }
        }
        return false;
    };
    
    var setResultsCount = function (config, data) {

        var from = (data.page * data.perPage) - data.perPage + 1 || configService.getData('recordsListConfig', 'header.params.resultsCount.params.from'),
            count = data.count || configService.getData('recordsListConfig', 'header.params.resultsCount.params.to'),
            to = (function () {
                var resultsTo = data.page * data.perPage;
                if (resultsTo > data.count) {
                    resultsTo = data.count;
                }
                return resultsTo;
            })() || configService.getData('recordsListConfig', 'header.params.resultsCount.params.count'),
            params = {
                from: from,
                to: to,
                count: count
            },
            defaultParams = configService.getData('recordsListConfig', 'header.params.resultsCount.params');
        if (count < to || from >= to)
            return config;

        _.extend(config.params, params);

        return setVisibility(defaultParams, config.params, config);

    };

    var setSortBy = function (config, value) {
        var sortByValue = value || configService.getData('recordsListConfig', 'header.params.sortBy.params.value');

        if (!findValueId(sortByValue, configService.getData('recordsListConfig', 'sortParams'))) {
            console.warn('Unknown sortBy param!');
            return config;
        }

        var params = {
                value: sortByValue
            },
            defaultParams = configService.getData('recordsListConfig', 'header.params.sortBy.params');

        _.extend(config.params, params);

        return setVisibility(defaultParams, config.params, config);

    };

    var setResultsPerPage = function (config, value) {
        var resultsPerPageValue = value || configService.getData('recordsListConfig', 'header.params.resultsPerPage.params.value');

        if (!findValueId(resultsPerPageValue, configService.getData('recordsListConfig', 'resultsPerPage'))) {
            console.warn('Unknown limit param!');
            return config;
        }
        var params = {
                value: resultsPerPageValue
            },
            defaultParams = configService.getData('recordsListConfig', 'header.params.resultsPerPage.params');

        _.extend(config.params, params);

        return setVisibility(defaultParams, config.params, config);
    };

    var setPagination = function (config, data) {
        var params = {
                totalItems: data.count || configService.getData('recordsListConfig', 'header.params.pagination.params.totalItems'),
                currentPage: data.page || configService.getData('recordsListConfig', 'header.params.pagination.params.currentPage'),
                maxSize: '5',
                class: 'pagination-sm',
                rotate: false,
                itemsPerPage: data.perPage || configService.getData('recordsListConfig', 'header.params.pagination.params.itemsPerPage')
            },
            defaultParams = configService.getData('recordsListConfig', 'header.params.pagination.params');

        if (params.totalItems <= params.itemsPerPage)
            return config;
        _.extend(config.params, params);

        return setVisibility(defaultParams, config.params, config);
    };

    var setHeaderConfig = function (data, config, stateParams) {
        var defaultHeaderParams = configService.getData('recordsListConfig', 'header.params');
        var params = {
            resultsCount: setResultsCount(config.params.resultsCount, data),
            sortBy: setSortBy(config.params.sortBy, stateParams.sortBy),
            resultsPerPage: setResultsPerPage(config.params.resultsPerPage, stateParams.limit),
            pagination: setPagination(config.params.pagination, data)
        }
        _.extend(config.params, params);

        return setVisibility(defaultHeaderParams, config.params, config);
    };
    
    return {
        generateQueryParams: generateQueryParams,
        isActiveTab: isActiveTab,
        setResultsCount: setResultsCount,
        setSortBy: setSortBy,
        setResultsPerPage: setResultsPerPage,
        setPagination: setPagination,
        setHeaderConfig: setHeaderConfig,
        findValueId: findValueId,
    }
};