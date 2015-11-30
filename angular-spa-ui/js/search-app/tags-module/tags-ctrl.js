"use strict";

module.exports = function($scope, tagService) {

    // Implementation main controller of 'module tags'
    // Get property of current scope
    $scope.titlePage = tagService.titlePage;
    $scope.titleCreateTag = tagService.titleCreateTag;
    $scope.titleResultTagList = tagService.titleResultTagList;

};
