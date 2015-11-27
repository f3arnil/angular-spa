"use strict";

module.exports = function tagItem() {

var tagItem = {
        restrict: 'E',
        transclude: true,
        scope: {},
        link: function(scope, element, attrs) {

        },
        controller: function($scope, $element) {
            console.log($scope)
        },
        templateUrl: '/tagItemTemplate.html',
        replace: true
    };

    return tagItem;

};
