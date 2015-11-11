"use strict";

function start() {
  var angular = require('angular');

  // Trying to init nested module...
  var cart = require(__dirname + '/cart-module')(angular);

  console.log('Search-app');
  var searchApp = angular.module('searchApp', [require("angular-ui-router")]);
  angular.bootstrap(document.getElementById("app"), ["searchApp"]);
  searchApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/#');
    $stateProvider
        .state('search', {
          url: '#search',
          templateUrl: '/js/search-app/search-module/search.jade',
          controller: function () {
            var search = require(__dirname + '/search-module');
            search();
          }
        })
  });
};

module.exports = start();

/*
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
 */
