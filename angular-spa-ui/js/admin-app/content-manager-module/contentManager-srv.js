"use strict";

module.exports = function (configService) {

    var defaultHeaderParams = configService.getData('recordsListConfig', 'header.params');
    var resultsCount = 'header.params.resultsCount';
    var sortBy = 'header.params.sortBy';
    var resultsPerPage = 'header.params.resultsPerPage';
    var pagination = 'header.params.pagination';
    var defaultResultsCount = configService.getData(
        'recordsListConfig',
        resultsCount + '.params'
    );
    var defaultTo = configService.getData(
        'recordsListConfig',
        resultsCount + '.params.count'
    );
    var defaultFrom = configService.getData(
        'recordsListConfig',
        resultsCount + '.params.from'
    );
    var defaultCount = configService.getData(
        'recordsListConfig',
        resultsCount + '.params.count'
    );
    var defaultSortByValue = configService.getData(
        'recordsListConfig',
        sortBy + '.params.value'
    );
    var defaultSortBy = configService.getData(
        'recordsListConfig',
        sortBy + '.params'
    );
    var defaultLimitValue = configService.getData(
        'recordsListConfig',
        resultsPerPage + '.params.value'
    );
    var defaultLimit = configService.getData(
        'recordsListConfig',
        resultsPerPage + '.params'
    );
    //Default pagination config
    var defaultPgConf = {
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
    };

    var defaultPagination = configService.getData(
        'recordsListConfig',
        pagination + '.params'
    );

    return {
        setHeaderConfig: function (data, config, stateParams) {
            var params = {
                resultsCount: this.setResultsCount(config.params.resultsCount, data),
                sortBy: this.setSortBy(config.params.sortBy, stateParams.sortBy),
                resultsPerPage: this.setResultsPerPage(config.params.resultsPerPage, stateParams.limit),
                pagination: this.setPagination(config.params.pagination, data)
            }

            _.extend(config.params, params);

            config = this.setVisibility(defaultHeaderParams, config.params, config);

            return config;
        },
        setResultsCount: function (config, data) {
            var params = {
                from: this.setFrom(data),
                to: this.setTo(data),
                count: this.setCount(data)
            };
            if (params.count < params.to || params.from >= params.to)
                return config;

            _.extend(config.params, params);

            config = this.setVisibility(defaultResultsCount, config.params, config);

            return config;

        },
        setTo: function (data) {
            var to = data.page * data.perPage;

            var resultsTo = to || defaultTo;
            if (resultsTo > data.count) {
                resultsTo = data.count;
            }
            return resultsTo;
        },
        setFrom: function (data) {
            var from = (data.page * data.perPage) - data.perPage + 1;

            return from || defaultFrom;
        },
        setCount: function (data) {
            var count = data.count;

            return count || defaultCount;
        },
        setSortBy: function (config, value) {
            var sortByValue = value || defaultSortByValue;

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
            };

            _.extend(config.params, params);
            config = this.setVisibility(defaultSortBy, config.params, config);

            return config;

        },
        setResultsPerPage: function (config, value) {
            var resultsPerPageValue = value || defaultLimitValue;

            if (!_.indexOf(configService.getData('recordsListConfig', 'resultsPerPage'),
                    resultsPerPageValue, true)) {
                console.warn('Unknown limit param!');
                return config;
            }

            var params = {
                value: resultsPerPageValue
            };

            _.extend(config.params, params);
            config = this.setVisibility(defaultLimit, config.params, config);

            return config;
        },
        setPagination: function (config, data) {
            var params = {
                totalItems: data.count || defaultPgConf.totalItems,
                currentPage: data.page || defaultPgConf.currentPage,
                maxSize: 5,
                class: 'pagination-sm',
                rotate: false,
                itemsPerPage: data.perPage || defaultPgConf.itemsPerPage
            };

            if (params.totalItems <= params.itemsPerPage) return config;
            _.extend(config.params, params);

            config = this.setVisibility(defaultPagination, config.params, config);

            return config;
        },
        setVisibility: function (defaultParams, params, config) {

            if (!_.isEqual(defaultParams, params)) {
                config.visibility = true;
            }

            return config;
        },
        generateQueryParams: function (path, stateParams) {
            var url = path,
                data = _.pairs(stateParams);

            _.each(data, function (pair) {
                url += pair[0] + '=' + pair[1] + '&';
            });

            return url;
        },
        isActiveTab: function (tabs, currentSection) {
            angular.forEach(tabs, function (tab) {
                if (tab.value === currentSection)
                    tab.active = true;
            });
            return tabs;
        }
    };

};
