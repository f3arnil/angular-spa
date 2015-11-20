"use strict";

module.exports = function(app) {

    require('./advanced-search')(app);
    var searchCtrl = require('./search-ctrl')(app);
    
    app.config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('search', {
                abstract: true,
                url: '/search',
                template: '<ui-view/>'
            })
            .state('search.simple', {
                url: '.simple',
                template: 'Hello world simple search',
                controller: searchCtrl
            })
        });

}
