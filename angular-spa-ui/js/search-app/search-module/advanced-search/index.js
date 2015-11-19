"use strict";

module.exports = function(ngModule) {

    ngModule.config(function ($stateProvider) {
        $stateProvider
            .state('search.advanced', {
                url: '.advanced',
                template: "Hello world advanced search"
            });
    });

}
