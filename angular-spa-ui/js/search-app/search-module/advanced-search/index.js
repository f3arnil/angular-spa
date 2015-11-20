"use strict";

module.exports = function(app) {

    app.config(configCb);

    function configCb($stateProvider) {
        $stateProvider
            .state('search.advanced', {
                url: '.advanced',
                template: 'Hello advanced search'
            })
    };

};
