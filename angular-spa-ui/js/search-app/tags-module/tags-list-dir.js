"use strict";

module.exports = function() {

    var tagsList = {
        restrict: 'E',
        transclude: true,
        controller: 'tagsListContrller',
        templateUrl: '/listTagsTemplate.html',
        replace: true
    };

    return tagsList;

};
