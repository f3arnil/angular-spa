"use strict";

module.exports = function(app) {

    app.config(function ($stateProvider) {
        $stateProvider
            .state('cart', {
              url: '/cart',
              template: 'Hello world from cart module',
            })
      });

}
