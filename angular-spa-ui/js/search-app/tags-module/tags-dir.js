"use strict";

module.exports = function(tags) {

    console.log(arguments);

    tags
        .directive('tagItem', tagItem);

    function tagItem() {
        return {
            restrict: 'E',
            templateUrl: 'tagItemTemplate.html',
            link: function(scope, element, attrs) {
                element.bind('click', function(el) {

                });
            }
        };
    };

};
