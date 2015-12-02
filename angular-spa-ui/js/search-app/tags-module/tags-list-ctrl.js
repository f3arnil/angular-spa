"use strict";

module.exports = function($scope, tagService) {

    // Property of tag list (and create tag) (directive)
    $scope.tags = {};
    $scope.visiblilityList = 'empty';

    // Get list tags
    $scope.loadRemoteData = function () {
        tagService.getTags()
            .then(
                function(tagsList) {
                    // Remote data tags list
                    applyRemoteData(tagsList);
                },
                function(errorMessage) {
                    console.warn(errorMessage);
                }
            );
    };

    // Remove tag
    $scope.removeTagItem = function(tag) {
        tagService.removeTagItem(tag._id)
            .then(
                function() {
                    // Update list tags
                    $scope.loadRemoteData();
                },
                function(errorMessage) {
                    console.warn(errorMessage);
                }
            );
    };

    // Update list tag of scope
    function applyRemoteData(tagsList) {
        $scope.tags = tagsList.data;
        visiblilityList($scope.tags);
    };

    // Visibility (show/hide) list tags
    function visiblilityList(tagsList) {
        if (tagsList.length === 0) {
            $scope.visiblilityList = 'empty';
        } else {
            $scope.visiblilityList = '';
        }
    };

    // Start module tag
    $scope.loadRemoteData();

};
