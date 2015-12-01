"use strict";

module.exports = function($scope, tagService) {

    // Create new tag
    $scope.editTag = function() {
        tagService.editTag(tagName)
            .then(
                function() {
                    //$scope.loadRemoteData();
                    // Implementation function of edit tag
                    // Call function of action
                },
                function( errorMessage ) {
                    console.warn(errorMessage);
                }
            );
    };

};
