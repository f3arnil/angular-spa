'use strict';

module.exports = function() {

    var tagsList = {
        restrict: 'E',
        transclude: true,
        scope: {
            inputParam: '=inputParam'
        },
        link: function(scope, element, attrs) {
            scope.tagsList.viewAPI.getStateName();
        },
        controller: 'tagsListController',
        controllerAs: 'tagsList',
        templateUrl: '/listTagsTemplate.html',
        replace: true
    };

    return tagsList;

};
