"use strict";

module.exports = function() {

    var createTag = {
        restrict: 'E',
        transclude: true,
        scope: {

        },
        controller: 'createTagContrller',
        templateUrl: '/createTagTemplate.html',
        replace: true
    };

    return createTag;

};
