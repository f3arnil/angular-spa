module.exports = function(app, mongoose, api) {

    var api = api;
    var config = require('../../config.json');
    var Async = require('async');

    app.get('/search-app', searchAppIndexPageRequest);

    app.get('/service/search', searchRequest);

    app.post('/service/advanced-search', advancedSearchRequest);

    function searchAppIndexPageRequest (request, response) {
        response.render('js/search-app/index.jade', {
            way: 'js/search-app/',
            backEndData: 'That is a message from Backend',
            userId: app.envSettings.user
        });
    }

    function searchRequest(request, response) {
        var operationName = 'search';

        var query = request.param('query')
            ? request.param('query').trim().replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')
            : '.';

        var searchingEntity = request.param('searchIn')
            ? request.param('searchIn').trim()
            : config.search.searchIn;

        var startFrom = request.param('startFrom')
            ? request.param('startFrom').trim()
            : config.search.startFrom;

        var itemsOnPage = request.param('showItems')
            ? request.param('showItems').trim()
            : config.search.itemsOnPage;

        var sortingOrder = request.param('orderBy')
            ? request.param('orderBy').trim()
            : config.search.orderBy;

        var searchingField = request.param('field')
            ? request.param('field').trim()
            : config.search.field;

        var entityModel = api.getRESTModule(searchingEntity);

        if (entityModel == undefined || entityModel == null) {
            return response.send(api.generateResponseObject(
                operationName,
                'error',
                'Looks like ' + searchingEntity + ' does not implemented or does not loaded at the moment...'
            ));
        }
        else {
            entityModel = entityModel.getModel();
        }

        if (!config.search.validSearchEntities.hasOwnProperty(searchingEntity)) {
            return response.send(api.generateResponseObject(
                operationName,
                'error',
                'Entity ' + searchingEntity + ' does not available for searching'
            ));
        }

        if (config.search.validSearchEntities[searchingEntity].indexOf(searchingField) == -1) {
            return response.send(api.generateResponseObject(
                operationName,
                'error',
                'Field ' + searchingField + ' in entity ' + searchingEntity + ' does not available for searching'
            ));
        }

        var searchingRegexp = new RegExp(query, 'i');
        var searchingFieldData = {};
        var orderingFieldData = {};

        searchingFieldData[searchingField] = searchingRegexp;
        orderingFieldData[searchingField] = sortingOrder == 'ASC' ? '1' : '-1';

        return entityModel
            .find()
            .or([ searchingFieldData ])
            .sort(orderingFieldData)
            .exec(function (error, data) {
                return response.json(JSON.stringify(data));
            }
        );
    }

    /**
     *
     * @param request POST fields {
     *      "context": {
     *          "TABLE_NAME": {
     *              "conditions": [
     *                  {
     *                      "field": "FIELD_NAME || ALL_FIELDS",
     *                      "query": "QUERY",
     *                      "match": "STARTS_FROM || CONTAINS || EXACT",
     *                      "condition_op": "NONE || AND || OR"
     *                  },
     *                  {
     *                      "field": "FIELD_NAME || ALL_FIELDS",
     *                      "query": "QUERY",
     *                      "match": "STARTS_FROM || CONTAINS || EXACT",
     *                      "condition_op": "NONE || AND || OR"
     *                  }
     *              ]
     *          }
     *      },
     *      "limits": {
     *          "offset": 0,
     *          "limit": 0,
     *      }
     * }
     * @param response
     */
    function advancedSearchRequest(request, response) {
        _AS_getContexts(request.body, response);
    }

    function _AS_getContexts(requestJSON, response) {
        var contexts = [];
        var limits = null;

        if (requestJSON.hasOwnProperty('limits')) {
            limits = {
                offset: requestJSON.limits.hasOwnProperty('offset') ? requestJSON.limits.offset : 0,
                limit: requestJSON.limits.hasOwnProperty('limit') ? requestJSON.limits.limit : 0
            };
        }

        if (requestJSON.hasOwnProperty('context')) {
            for (contextName in requestJSON.context) {
                var context = _AS_buildContext(contextName, requestJSON.context[contextName], limits);

                contexts.push(context);
            }
        }

        _AS_buildContextsRequest(contexts, response);
    }

    function _AS_buildContext(contextName, contextData, limits) {
        var conditions = [];

        if (contextData.hasOwnProperty('conditions')) {
            for (var i = 0; i < contextData.conditions.length; i++) {
                var condition = contextData.conditions[i];

                if (i == 0) {
                    condition.condition_op = 'NONE';
                }

                if (i > 0 && (i < contextData.conditions.length) && condition.condition_op == 'NONE') {
                    break;
                }

                conditions.push(_AS_buildConditionObject(
                    _AS_filterFieldValue(condition, 'field').split(','),
                    _AS_filterFieldValue(condition, 'query'),
                    _AS_filterFieldValue(condition, 'match'),
                    _AS_filterFieldValue(condition, 'condition_op')
                ));
            }
        }

        return _AS_buildConditionsRequest(conditions, contextName, limits);
    }

    function _AS_buildConditionsRequest(conditions, contextName, limits) {
        var runnableCallback = function (callback) {

            var model = api.getRESTModule(contextName);

            if (model == null) {
                return;
            }

            model = model.getModel();
            var databaseQuery = model.find();

            databaseQuery = _AS_buildQueryConditions(conditions, databaseQuery);

            if (limits != undefined && limits != null) {
                databaseQuery.skip(limits.offset).limit(limits.limit);
            }

            return databaseQuery.exec(function (error, data) {
                if (error) {
                    console.log('Oups... Something bad on executing context condition request!');
                    console.log(error);
                }
                callback(error, data);
            });
        }

        return runnableCallback;
    }

    function _AS_buildQueryConditions(conditions, databaseQuery) {
        var conditionUnions = [];
        var requestFields = {};

        for (var conditionIndex = 0; conditionIndex < conditions.length; conditionIndex++) {
            var condition = conditions[conditionIndex];

            if (condition.conditionOperator == 'OR') {
                conditionUnions.push(requestFields);
                requestFields = {};
            }

            for (var fieldIndex = 0; fieldIndex < condition.fieldName.length; fieldIndex++) {
                if (requestFields.hasOwnProperty(condition.fieldName[fieldIndex])) {
                    continue;
                }

                requestFields[condition.fieldName[fieldIndex]] = _AS_getQueryRegexp(condition.matchingOperator, condition.requestQuery);
            }
        }

        if (requestFields != null && requestFields.length != 0) {
            conditionUnions.push(requestFields);
        }

        if (conditionUnions.length > 0) {
            databaseQuery.or(conditionUnions);
        }

        return databaseQuery;
    }

    function _AS_buildContextsRequest(contexts, response) {

        Async.parallel(contexts, function (error, data) {
           if (error) {
               console.log("ASync parallel request error:");
               console.log(error);
           }

            return response.json(data);
        });
    }

    function _AS_buildConditionObject(fieldName, requestQuery, matchingOperator, conditionOperator) {
        return {
            fieldName: fieldName,
            requestQuery: requestQuery,
            matchingOperator: matchingOperator,
            conditionOperator: conditionOperator
        };
    }

    function _AS_getQueryRegexp(matchingOperator, query) {

        switch (matchingOperator) {
            case 'STARTS_FROM': return new RegExp('^' + query, 'i')
            case 'CONTAINS': return new RegExp(query, 'i');
            case 'EXACT': return new RegExp('^' + query + '$', 'i');
            default: return new RegExp(query, 'i');
        }
    }

    function _AS_filterFieldValue(condition, fieldName) {
        if (condition[fieldName] != undefined && condition[fieldName] != null) {
            return _AS_cleanString(condition[fieldName]);
        }

        return '';
    }

    function _AS_cleanString(value) {
        if (value != undefined && value != null) {
            return value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
        }

        return '';
    }
}
