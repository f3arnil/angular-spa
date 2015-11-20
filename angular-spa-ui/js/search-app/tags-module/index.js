"use strict";

module.exports = function(app) {

    app.config(function ($stateProvider) {
        $stateProvider
            .state('tags', {
                url: '/tags',
                template: 'Hello world from tags module',
            })
      });
    
}
