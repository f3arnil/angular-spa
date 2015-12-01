"use strict";

module.exports = function() {

    var tagsList = {
        restrict: 'E',
        transclude: true,
        scope: {

        },
        link: function(scope, element, attrs) {
            // element.click(function() {
            //     $scope.$apply(function() {
            //         $scope.tabs = !$scope.tabs
            //     })
            // })
        },
        controller: 'tagsListContrller',
        templateUrl: '/listTagsTemplate.html',
        replace: true
    };

    return tagsList;

};
