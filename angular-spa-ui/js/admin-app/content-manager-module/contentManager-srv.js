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

    var setResultsCount = function (config, data) {

        var from = ((data.page * data.perPage) - data.perPage + 1) || configService.getData(
            'recordsListConfig',
            'header.params.resultsCount.params.from'
        ),
            count = data.count
                ? data.count
                : configService.getData(
                    'recordsListConfig',
                    'header.params.resultsCount.params.to'
                ),
            to = setTo(),
            params = {
                from: from,
                to: to,
                count: count
            },
            defaultParams = configService.getData(
                'recordsListConfig',
                'header.params.resultsCount.params'
            );
        if (count < to || from >= to)
            return config;

        _.extend(config.params, params);

        return setVisibility(defaultParams, config.params, config);

        function setTo() {
            var resultsTo = data.page * data.perPage || configService.getData(
                'recordsListConfig',
                'header.params.resultsCount.params.count'
            );
            if (resultsTo > data.count) {
                resultsTo = data.count;
            }
            return resultsTo;
        }
    };

    var setSortBy = function (config, value) {
        var sortByValue = value
            ? value
            : configService.getData(
                'recordsListConfig',
                'header.params.sortBy.params.value'
            );

        if (!_.indexOf(configService.getData('recordsListConfig', 'sortParams'),
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
        var resultsPerPageValue = value
            ? value
            : configService.getData(
                'recordsListConfig',
                'header.params.resultsPerPage.params.value'
            );

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
                'header.params.resultsPerPage.params'
            );

        _.extend(config.params, params);
        
        config = setVisibility(defaultParams, config.params, config);
        
        return config;
    };

    var setPagination = function (config, data) {
        var params = {
                totalItems: data.count ? data.count : configService.getData(
                    'recordsListConfig',
                    'header.params.pagination.params.totalItems'
                ),
                currentPage: data.page
                    ? data.page
                    : configService.getData(
                        'recordsListConfig',
                        'header.params.pagination.params.currentPage'
                    ),
                maxSize: 5,
                class: 'pagination-sm',
                rotate: false,
                itemsPerPage: data.perPage
                    ? data.perPage
                    : configService.getData(
                        'recordsListConfig',
                        'header.params.pagination.params.itemsPerPage'
                    )
            },
            defaultParams = configService.getData(
                'recordsListConfig',
                'header.params.pagination.params'
            );

        if (params.totalItems <= params.itemsPerPage)
            return config;
        _.extend(config.params, params);

        config = setVisibility(defaultParams, config.params, config);
        
        return config;
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

        config = setVisibility(defaultHeaderParams, config.params, config);
        
        return config;
    };

    return {
        generateQueryParams: generateQueryParams,
        isActiveTab: isActiveTab,
        setResultsCount: setResultsCount,
        setSortBy: setSortBy,
        setResultsPerPage: setResultsPerPage,
        setPagination: setPagination,
        setHeaderConfig: setHeaderConfig
    }
};
