"use strict";

module.exports = function() {

    var tagsList = {
        restrict: 'E',
        transclude: true,
        scope: {

        },
        controller: 'tagsListContrller',
        templateUrl: '/listTagsTemplate.html',
        replace: true
    };

    return tagsList;

};
