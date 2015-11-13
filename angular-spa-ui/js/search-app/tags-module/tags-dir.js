"use strict";

var tagsDirs = angular.module('tagsDirs', []);

tagsDirs
    .directive('tags-search', function() {
    return {
        restrict: 'E',
        link: function (scope, element, attributes) {
            console.log(scope);
            console.log(element);
            console.log(attributes);
            if (attributes.type === "text" && attributes.name) {
                element[0].value = "It works!";
            }
        }
    };
});

module.exports = tagsDirs;

