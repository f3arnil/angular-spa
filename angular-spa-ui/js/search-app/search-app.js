"use strict";

function start() {

    var searchApp = angular.module('searchApp', ['ui.router']);
    //var searchApp = angular.module('searchApp', [require("angular-ui-router")]);

    var searchCtrl = require('./search-module/search-ctrl');
    var searchAdvancedCtrl = require('./search-module/advanced-search/advanced-search-ctrl');
    var cartCtrl = require('./cart-module/cart-ctrl');
    var tagsCtrl = require('./tags-module/tags-ctrl');


    angular
        .bootstrap(document.getElementById("app"), ["searchApp"]);
        //.bootstrap(document.getElementsByTagName('body')[0], ["searchApp"]);

    searchApp
        .config(appUIPouter);


    function appUIPouter($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('search', {
                url: '/search',
                templateUrl:'/js/search-app/search-module/search.jade',
                controller: searchCtrl
            })
            .state('advanced', {
                url: '/advanced',
                templateUrl:'/js/search-app/search-module/advanced-search/advanced-search.jade',
                controller: searchAdvancedCtrl
                //templateUrl:'/js/search-app/search-module/advanced-search/advanced-search.jade',
            })
            .state('cart', {
                url: '/cart',
                templateUrl:'/js/search-app/cart-module/cart.jade',
                controller: cartCtrl
                //templateUrl:'/js/search-app/cart-module/cart.jade',
            })
            .state('tags', {
                url: '/tags',
                templateUrl:'/js/search-app/tags-module/tags.jade',
                controller: tagsCtrl
                //templateUrl:'/js/search-app/tags-module/tags.jade',
            });

        $urlRouterProvider
            .otherwise('/search');
    }
};

module.exports = start();
