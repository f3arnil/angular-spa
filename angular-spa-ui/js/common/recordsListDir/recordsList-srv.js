"use strict";

module.exports = function (configService) {

    var findValueId = function (val, array) {
        for (var x in array) {
            if (array[x].value === val) {
                return x;
            }
        }
        return false;
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
        setModelValues: setModelValues,
        setDefaultModel: setDefaultModel
    }
};
