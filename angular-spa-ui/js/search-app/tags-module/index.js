"use strict";

module.exports = function(angular) {

    var tags = angular.module('searchApp.Tags', []);
    
    tags.config(function ($stateProvider) {
        $stateProvider
            .state('tags', {
                url: '/tags',
                template: 'Hello world from tags module',
            })
      });
    
}
