"use strict";

module.exports = function() {

    var createTag = {
        restrict: 'E',
        transclude: true,
        scope: {

        },
        controller: function($scope, tagService) {

            $scope.form = {
                name: ""
            };

            // Create new tag
            $scope.createTag = function() {
                var tagName = $scope.form.tagName;
                tagService.createTag(tagName)
                    .then(
                        // update list tags
                        function( errorMessage ) {
                            console.warn(errorMessage);
                        }
                    );

                $scope.form.tagName = "";
            };

        },
        templateUrl: '/createTagTemplate.html',
        replace: true
    };

    return createTag;

};
