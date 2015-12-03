"use strict";

module.exports = function($scope, tagService) {

    // Property of create tag (of directive)
    $scope.titlePage = tagService.titleCreateTag;
    $scope.form = {
        tagName: ""
    };

    // Create new tag
    $scope.createTag = function() {
        var tagName = $scope.form.tagName;
        tagService.createTag(tagName)
            .then(
                function(data) {
                    // Update list tags
                    $scope.loadRemoteData();
                    // Clear input after update
                    $scope.form.tagName = "";
                },
                function( errorMessage ) {
                    console.warn(errorMessage);
                }
            );
    };

};
