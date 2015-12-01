"use strict";

module.exports = function($scope, tagService) {

    // Property of tag list (and create tag) (directive)
    // Use current scope
    $scope.tags = {};
    $scope.visiblilityList = 'empty';
    $scope.form = {
        tagName: ""
    };

    // Get list tags
    $scope.loadRemoteData = function () {
        tagService.getTags()
            .then(
                function(tagsList) {
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

    // Create new tag
    $scope.createTag = function() {
        var tagName = $scope.form.tagName;
        tagService.createTag(tagName)
            .then(
                function(data) {
                    // $scope.tags.push(data.data);
                    $scope.loadRemoteData();
                    $scope.form.tagName = "";
                },
                //$scope.loadRemoteData(),
                function( errorMessage ) {
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
