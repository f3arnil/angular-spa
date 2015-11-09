"use strict";

var searchApp = angular.module('searchApp', ['ui.router']);

searchApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/#');
    $stateProvider
    .state('search', {
        url: '#search',
        templateUrl:'/js/search-app/search-module/search.jade',
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

