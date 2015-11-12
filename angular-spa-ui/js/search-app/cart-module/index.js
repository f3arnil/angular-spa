"use strict";

require('angular-ui-router');

var cart = angular.module('cart', ['ui.router']);

cart.config(function ($stateProvider) {
    $stateProvider
        .state('cart', {
          url: '/cart',
          template: 'Hello world from cart module',
        })
  });

module.exports = cart;