"use strict";

module.exports = function(angular) {

    var cart = angular.module('searchApp.Cart',[]);
    
    cart.config(function ($stateProvider) {
        $stateProvider
            .state('cart', {
              url: '/cart',
              template: 'Hello world from cart module',
            })
      });

}
