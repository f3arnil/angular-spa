"use strict";

module.exports = function(tags) {

    //console.log(tags);

    tags
        .directive('tagItem', tagItem);

    function tagItem() {
        return {
            restrict: 'A',
            //templateUrl: 'tagItemTemplate.html',
            link: function(scope, element, attrs) {
                element.bind('click', function(el) {
                    //console.log(el);
                });
            }
        };
    };

};
