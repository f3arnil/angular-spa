"use strict";

module.exports = function(app) {

    app.config(function ($stateProvider) {
            $stateProvider
                .state('search.advanced', {
                    url: '.advanced',
                    template: "Hello world advanced search"
            });
        });

}
