"use strict";

module.exports = function (angular) {

    var tagsCtrl = require('./tags-ctrl');

    var tags = angular.module('app.tags', []);

    tags
        .config(configCb);

    function configCb($stateProvider) {
        $stateProvider
            .state('tags', {
                url: '/tags',
                templateUrl: 'tagsTemplate.html',
                controller: tagsCtrl
            });
    };

};
