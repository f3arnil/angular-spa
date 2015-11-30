"use strict";

module.exports = function($scope, tagService) {

    // Implementation config of main controller Tags
    // Property of object (get static params)
    $scope.titlePage = tagService.titlePage;
    $scope.titleCreateTag = tagService.titleCreateTag;
    $scope.titleResultTagList = tagService.titleResultTagList;

};
