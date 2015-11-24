"use strict";

module.exports = function (angular) {

    var tags = angular.module('app.Tags', []);
    
    tags.config(configCb);
    
    function configCb($stateProvider) {
        $stateProvider
            .state('tags', {
                url: '/tags',
                template: 'Hello tags'
            })
    };

};
