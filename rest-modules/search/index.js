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
     *      }
     * }
     * @param response
     */
    function advancedSearchRequest(request, response) {
        //return response.json(request.body);

        return response.json(_AS_getContexts(request.body));
    }

    function _AS_getContexts(requestJSON) {
        var contexts = [];
;
        if (requestJSON.hasOwnProperty('context')) {
            for (contextName in requestJSON.context) {;
                contexts.push(_AS_buildContext(contextName, requestJSON.context[contextName]));
            }
        }

        return contexts;
    }

    function _AS_buildContext(contextName, contextData) {
        var conditions = [];

        if (contextData.hasOwnProperty('conditions')) {
            for (var i = 0; i < contextData.conditions.length; i++) {
                var condition = contextData.conditions[i];

                conditions.push(condition);

                // Do not process next conditions if it has no operator
                if (condition.hasOwnProperty("condition_op") && condition.condition_op == 'NONE') {
                    break;
                }
            }
        }

        return conditions;
    }

    function _AS_getQueryRegexp(matchingOperator, query) {

        switch (matchingOperator) {
            case 'STARTS_FROM': return new RegExp('^' + query, 'i')
            case 'CONTAINS': return new RegExp(query, 'i');
            case 'EXACT': return new RegExp('^' + query + '$', 'i');
            default: return new RegExp(query, 'i');
        }
    }

    function _AS_cleanString(value) {
        if (value != undefined && value != null) {
            return value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
        }

        return '';
    }
}
