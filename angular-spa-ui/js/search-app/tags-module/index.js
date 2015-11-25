"use strict";

module.exports = function (angular) {

    var tagsCtrl = require('./tags-ctrl');
    var tagsDirs = require('./tags-dir');

    var tags = angular.module('app.tags', []);

    tagsDirs(tags);

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
