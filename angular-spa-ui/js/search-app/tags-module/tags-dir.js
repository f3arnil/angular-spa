"use strict";

module.exports = function(moduleTags) {

    moduleTags
        .directive('tagIteme', tagIteme);

    function tagIteme() {
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
