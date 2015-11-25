"use strict";

module.exports = function (angular) {

    var tagsCtrl = require('./tags-ctrl');

    var tags = angular.module('app.tags', []);

    tags
        .config(configCb)
        .directive('tagIteme', tagIteme);

    function configCb($stateProvider) {
        $stateProvider
            .state('tags', {
                url: '/tags',
                templateUrl: 'tagsTemplate.html',
                controller: tagsCtrl
            });
    };

    function tagIteme() {
        return {
            restrict: 'E',
            templateUrl: 'tagItemTemplate.html',
            link: function(scope, element, attrs) {
                //console.log(scope)
                element.bind('click', function(el) {
                    console.log(el.target)
                    //scope.toggle();
                });
            }
        };
    }

};
