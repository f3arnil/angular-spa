"use strict";

module.exports = function(ngModule) {

    ngModule.config(function ($stateProvider) {
        $stateProvider
            .state('cart', {
                url: '/cart',
                template: 'Hello world from cart module',
            })
      });

}
