"use strict";

module.exports = function (angular) {

    var tags = angular.module('searchApp.Tags', []);
    
    tags.config(configCb);
    
    function configCb($stateProvider) {
        $stateProvider
            .state('app.tags', {
                url: '/tags',
                template: 'Hello tags'
            })
    };

};
