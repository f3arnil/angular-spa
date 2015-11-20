"use strict";

module.exports = function(app) {

    require('./advanced-search')(app);

    //var searchCtrl = require('./search-ctrl');

    app.config(configCb);

    function configCb($stateProvider) {
        $stateProvider
            .state('search', {
                abstract: true,
                url: '/search',
                template: '<ui-view/>'
            })
            .state('search.simple', {
                url: '.simple',
                template: 'Hello world simple search'
                //controller: searchCtrl
            });
    };

};
