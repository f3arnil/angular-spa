"use strict";

module.exports = function (configService) {

    var setHeaderConfig = function (data, config, stateParams) {
        var defaultHeaderParams = configService.getData('recordsListConfig', 'header.params'),
            params = {
                resultsCount: setResultsCount(config.params.resultsCount, data),
                sortBy: setSortBy(config.params.sortBy, stateParams.sortBy),
                resultsPerPage: setResultsPerPage(config.params.resultsPerPage, stateParams.limit),
                pagination: setPagination(config.params.pagination, data)
            }

        _.extend(config.params, params);

        config = setVisibility(defaultHeaderParams, config.params, config);

        return config;
    };

    var setResultsCount = function (config, data) {
        var resultsCount = 'header.params.resultsCount',
            setTo = function () {
                var to = data.page * data.perPage,
                    defaultTo = configService.getData(
                        'recordsListConfig',
                        resultsCount + '.params.count'
                    );

                var resultsTo = to || defaultTo;
                if (resultsTo > data.count) {
                    resultsTo = data.count;
                }
                return resultsTo;
            },
            setFrom = function () {
                var from = (data.page * data.perPage) - data.perPage + 1,
                    defaultFrom = configService.getData(
                        'recordsListConfig',
                        resultsCount + '.params.from'
                    );
                return from || defaultFrom;
            },
            setCount = function () {
                var count = data.count,
                    defaultCount = configService.getData(
                        'recordsListConfig',
                        resultsCount + '.params.count'
                    );
                return count || defaultCount;
            },
            params = {
                from: setFrom(),
                to: setTo(),
                count: setCount()
            },
            defaultParams = configService.getData(
                'recordsListConfig',
                resultsCount + '.params'
            );

        if (params.count < params.to || params.from >= params.to)
            return config;

        _.extend(config.params, params);

        config = setVisibility(defaultParams, config.params, config);

        return config;

    };

    var setSortBy = function (config, value) {
        var sortBy = 'header.params.sortBy',
            defaultValue = configService.getData(
                'recordsListConfig',
                sortBy + '.params.value'
            );

        var sortByValue = value || defaultValue;

        if (!_.indexOf(
                configService.getData(
                    'recordsListConfig',
                    'sortParams'),
                sortByValue, true)) {
            console.warn('Unknown sortBy param!');
            return config;
        }

        var params = {
                value: sortByValue
            },
            defaultParams = configService.getData(
                'recordsListConfig',
                'header.params.sortBy.params'
            );

        _.extend(config.params, params);

        config = setVisibility(defaultParams, config.params, config);

        return config;

    };

    var setResultsPerPage = function (config, value) {
        var resultsPerPage = 'header.params.resultsPerPage',
            defaultValue = configService.getData(
                'recordsListConfig',
                resultsPerPage + '.params.value'
            ),
            resultsPerPageValue = value || defaultValue;

        if (!_.indexOf(configService.getData('recordsListConfig', 'resultsPerPage'),
                resultsPerPageValue, true)) {
            console.warn('Unknown limit param!');
            return config;
        }
        var params = {
                value: resultsPerPageValue
            },
            defaultParams = configService.getData(
                'recordsListConfig',
                resultsPerPage + '.params'
            );

        _.extend(config.params, params);

        config = setVisibility(defaultParams, config.params, config);

        return config;
    };

    var setPagination = function (config, data) {
        var pagination = 'header.params.pagination',
            configParams = {
                totalItems: configService.getData(
                    'recordsListConfig',
                    pagination + '.params.totalItems'
                ),
                currentPage: configService.getData(
                    'recordsListConfig',
                    pagination + '.params.currentPage'
                ),
                itemsPerPage: configService.getData(
                    'recordsListConfig',
                    pagination + '.params.itemsPerPage'
                )
            },
            params = {
                totalItems: data.count || configParams.totalItems,
                currentPage: data.page || configParams.currentPage,
                maxSize: 5,
                class: 'pagination-sm',
                rotate: false,
                itemsPerPage: data.perPage || configParams.itemsPerPage
            },
            defaultParams = configService.getData(
                'recordsListConfig',
                pagination + '.params'
            );

        if (params.totalItems <= params.itemsPerPage)
            return config;
        _.extend(config.params, params);

        config = setVisibility(defaultParams, config.params, config);

        return config;
    };

    var setVisibility = function (defaultParams, params, config) {

        if (!_.isEqual(defaultParams, params)) {
            config.visibility = true;
        }

        return config;
    }

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
        setResultsCount: setResultsCount,
        setSortBy: setSortBy,
        setResultsPerPage: setResultsPerPage,
        setPagination: setPagination,
        generateQueryParams: generateQueryParams,
        isActiveTab: isActiveTab
    }
};
