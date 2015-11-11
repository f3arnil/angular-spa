"use strict";

function start() {

    var searchApp = angular.module('searchApp', [require("angular-ui-router")]);
    //['ui.router']);
    //[require("angular-ui-router")]);


    /* TODO */
    /* point for the implementation of -> */
    // var routSearchCfg = require('./search-config');

    /* next code go in routSearchCfg -> */
    var search = {
        name: 'search',
        url: '/search',
        templateUrl:'/js/search-app/search-module/search.jade',
        controller: 'searchMainCtrl'
    }
    var advanced = {
        name: 'advanced',
        url: '/advanced',
        templateUrl:'/js/search-app/search-module/advanced-search/advanced-search.jade',
        controller: 'searchMainCtrl'
    }
    var cart = { 
        name: 'cart',
        url: '/cart',
        templateUrl:'/js/search-app/cart-module/cart.jade',
        controller: 'cartMainCtrl'
    }
    var tags = { 
        name: 'tags',
        url: '/tags',
        templateUrl:'/js/search-app/tags-module/tags.jade',
        controller: 'tagsMainCtrl'
    }



    angular
        .bootstrap(document.getElementsByTagName('body')[0], ["searchApp"]);

    searchApp
        .config(appUIPouter);


    function appUIPouter($stateProvider, $urlRouterProvider) {
        //console.log(arguments);
        $stateProvider
            .state(search)
            .state(advanced)
            .state(cart)
            .state(tags);

        $urlRouterProvider
            .otherwise('/search');
    }

};

module.exports = start();
