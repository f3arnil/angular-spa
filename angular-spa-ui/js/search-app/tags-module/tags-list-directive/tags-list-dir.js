'use strict';

module.exports = function() {

    var tagsList = {
        restrict: 'E',
        transclude: true,
        scope: {
            inputParam: '=inputParam',
            msgWorning: '=msgWorning'
            //tags: '=tags'
        },
        link: function(scope, element, attrs) {
            scope.getStateName();
        },
        controller: 'tagsListController',
        templateUrl: '/listTagsTemplate.html',
        replace: true
    };

    return tagsList;

};
