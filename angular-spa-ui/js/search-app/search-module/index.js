"use strict";

module.exports = function(app) {

    require('./advanced-search')(app);
    var searchCtrl = require('./search-ctrl')(app);
    
    app.config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('search', {
                abstract: true,
                url: '/search',
                views:{
                        "module-content": {
                            template: '<div ui-view="content"></div>'
                        }
                    }
            })
            .state('search.simple', {
                url: '/simple',
                views:{
                    "content": {
                        templateUrl: '/search.html',
                        controller : 'searchCtrl'
                    }
                }
            })
        });

}
