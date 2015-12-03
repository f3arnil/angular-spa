"use strict";

module.exports = function() {

    var createTag = {
        restrict: 'E',
        transclude: true,
        controller: 'createTagContrller',
        templateUrl: '/createTagTemplate.html',
        replace: true
    };

    return createTag;

};
