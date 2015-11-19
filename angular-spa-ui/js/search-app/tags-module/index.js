"use strict";

module.exports = function(ngModule) {

    ngModule.config(function ($stateProvider) {
        $stateProvider
            .state('tags', {
                url: '/tags',
                template: 'Hello world from tags module',
            })
      });
    
}
