
"use strict";

module.exports = function($scope, tagService) {

    // Property of create tag directive
    $scope.form = {
        tagName: ""
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

};
