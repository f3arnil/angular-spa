"use strict";

module.exports = function (app) {

    app.service('rlService', function (configService) {

        var findValueId = function (val, array) {
            for (var x in array) {
                if (array[x].value === val) {
                    return x;
                }
            }
            return false;
        };

        // Check if object
        var objHasKeys = function (obj, keys) {
            return keys.every(checkKey);

            function checkKey(value) {
                return _.has(obj, value);
            }
        };

        var setVisibility = function (defaultParams, params, config) {

            if (!_.isEqual(defaultParams, params)) {
                config.visibility = true;
            }

            return config;
        }

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

            if (!findValueId(sortByValue, configService.getData('recordsListConfig', 'sortParams'))) return config;

            var params = {
                    value: sortByValue
                },
                defaultParams = configService.getData('recordsListConfig', 'header.params.sortBy.params');

            _.extend(config.params, params);

            return setVisibility(defaultParams, config.params, config);

        };

        var setResultsPerPage = function (config, value) {
            var resultsPerPageValue = value || configService.getData('recordsListConfig', 'header.params.resultsPerPage.params.value');

            if (!findValueId(resultsPerPageValue, configService.getData('recordsListConfig', 'resultsPerPage'))) return config;
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

            if (params.totalItems < params.itemsPerPage)
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

        var setModelValues = function (data, model) {

            if (_.isEmpty(model))
                model = setDefaultModel();

            model.showHeader = data.visibility;
            model.resultsCountConfig = data.params.resultsCount;
            model.sortByConfig = data.params.sortBy;
            model.resultsPerPageConfig = data.params.resultsPerPage;
            model.paginationConfig = data.params.pagination;

            var sortById = findValueId(model.sortByConfig.params.value, model.sortParams);
            model['sortBy'] = model.sortParams[sortById];

            var limitId = findValueId(model.resultsPerPageConfig.params.value, model.resultsPerPage);
            model['limit'] = model.resultsPerPage[limitId];
            model['currentPage'] = model.paginationConfig.params.currentPage;

            return model;
        }

        var setDefaultModel = function () {

            var model = {
                showHeader: configService.getData('recordsListConfig', 'header.visibility'),
                resultsCountConfig: configService.getData('recordsListConfig', 'header.params.resultsCount'),
                sortByConfig: configService.getData('recordsListConfig', 'header.params.sortBy'),
                resultsPerPageConfig: configService.getData('recordsListConfig', 'header.params.resultsPerPage'),
                paginationConfig: configService.getData('recordsListConfig', 'header.params.pagination'),
                sortParams: configService.getData('recordsListConfig', 'sortParams'),
                resultsPerPage: configService.getData('recordsListConfig', 'resultsPerPage'),
                itemConfig: configService.getData('recordsListConfig', 'itemConfig'),
            }

            return model;
        };

        return {
            findValueId: findValueId,
            setResultsCount: setResultsCount,
            setSortBy: setSortBy,
            setResultsPerPage: setResultsPerPage,
            setPagination: setPagination,
            setHeaderConfig: setHeaderConfig,
            setModelValues: setModelValues,
            setDefaultModel: setDefaultModel
        }
    });

};
