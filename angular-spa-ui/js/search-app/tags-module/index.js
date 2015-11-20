"use strict";

module.exports = function(app) {

    app.config(configCb);

    function configCb($stateProvider) {
        $stateProvider
            .state('tags', {
                url: '/tags',
                template: 'Hello tags'
            })
    };

};
