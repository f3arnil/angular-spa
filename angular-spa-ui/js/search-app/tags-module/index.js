"use strict";

require('angular-ui-router');

var tags = angular.module('tags', ['ui.router']);
var tagsCtrl = require('./tags-ctrl');
//var tagsDirs = require('./tags-dir');

tags
    .config(function ($stateProvider) {
        $stateProvider
            .state('tags', {
                url: '/tags',
                templateUrl: '/js/search-app/tags-module/tags.jade',
                controller: tagsCtrl
            })
    });

module.exports = tags;
