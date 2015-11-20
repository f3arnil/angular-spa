"use strict";

module.exports = function(app) {

    app.config(configCb);

    function configCb($stateProvider) {
        $stateProvider
            .state('cart', {
                url: '/cart',
                template: 'Hello cart'
            })
    };

};
