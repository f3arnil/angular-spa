"use strict";

module.exports = function() {

    var listTags = {
        restrict: 'E',
        transclude: true,
        // scope: {

        // },
        link: function(scope, element, attrs) {
            scope.getAttrDirective(attrs.page, scope);
        },
        controller: 'listTagsContrller',
        templateUrl: '/listTagsTemplate.html',
        replace: true
    };

    return listTags;

};
