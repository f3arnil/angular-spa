'use strict';

module.exports = function() {

    var tagsList = {
        restrict: 'E',
        transclude: true,
        scope: {
            inputParam: '=inputParam',
            msgWorning: '=msgWorning'
        },
        link: function(scope, element, attrs) {
            scope.getCurrentScope();
        },
        controller: 'tagsListController',
        templateUrl: '/listTagsTemplate.html',
        replace: true
    };

    return tagsList;

};
