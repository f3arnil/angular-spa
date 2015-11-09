"use strict";

var searchAppRouter = angular.module('searchAppRouter', ['ui.router']);
searchAppRouter.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
    .state('/', {
        url: '/search',
        templateUrl:'search-module/search.jade',
        controller: 'searchMainPage'
    })
    .state('search', {
        url: '/search',
        templateUrl:'search-module/search.jade',
        controller: 'searchMainPage'
    })
    .state('search.cart', {
        url: '.cart',
        templateUrl:'cart-module/cart.jade',
        controller: 'cartMain'
    })
    .state('search.tags', {
        url: '.tags',
        templateUrl:'tags-module/tags.jade',
        controller: 'tagsMain'
    })
});