"use strict";

module.exports =  function mainTagCtrl($scope, resultTagPageSrv) {

    // Property of object (default params)
    $scope.titlePage = resultTagPageSrv.titlePage;
    $scope.titleCreateTag = resultTagPageSrv.titleCreateTag;
    $scope.titleResultTagList = resultTagPageSrv.titleResultTagList;
    $scope.tags = {};
    $scope.formCreateTag = {
        name: ""
    };
    $scope.isVisibilityTagsList = true;

    // Visibility (show/hide) list tags
    function isVisibilityTagsList(tagsList) {
        console.log(tagsList);
        if (tagsList.length > 0) {
            return $scope.isVisibilityTagsList = true;
        } else {
            return $scope.isVisibilityTagsList = false;
        }
    };

    // Get list tags
    $scope.loadRemoteData = function () {
        resultTagPageSrv.getTags()
            .then(
                function(tagsList) {
                    applyRemoteData(tagsList);
                }
            );
    };

    // Remove tag
    $scope.removeTagItem = function(tag) {
        resultTagPageSrv.removeTagItem(tag._id)
            .then(
                $scope.loadRemoteData(),
                function(errorMessage) {
                    console.warn(errorMessage);
                }
            );

        $scope.loadRemoteData();
    };

    // Create new tag
    $scope.createTag = function() {
        var tagName = $scope.formCreateTag.tagName;
        resultTagPageSrv.createTag(tagName)
            .then(
                $scope.loadRemoteData(),
                function( errorMessage ) {
                    console.warn(errorMessage);
                }
            );

        $scope.loadRemoteData();
        $scope.formCreateTag.tagName = "";
    };

    // Update list tag of scope
    function applyRemoteData(tagsList) {
        $scope.tags = tagsList.data;
        isVisibilityTagsList($scope.tags);
    };

    // Start module tag
    $scope.loadRemoteData();

};
