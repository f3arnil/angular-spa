"use strict";

module.exports = function() {

    var editTag = {
        restrict: 'E',
        transclude: true,
        controller: 'editTagContrller',
        templateUrl: '/editTagTemplate.html',
        replace: true
    };

    return editTag;

};
