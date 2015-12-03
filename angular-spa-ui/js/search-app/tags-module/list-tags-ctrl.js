"use strict";

module.exports = function($scope, tagService) {

    // Property of tag list (and create tag) (directive)
    $scope.tags = [];
    $scope.visiblilityList = 'empty';
    //$scope.labelTag = tagService.labelTag;
    $scope.ofArticle = '';

    $scope.getAttrDirective = function(attr, itemScope) {
        //getTagAttrFactory();
        if (attr === 'tags-by-article') {
            $scope.getTagByArticleId(itemScope.result);
        } else 
        if (attr === 'tags-list') {
            $scope.getAllTagsListData();
        }
    };

    // Visibility (show/hide) list tags
    $scope.visiblilityList = function(tagsList) {
        if (tagsList.length === 0) {
            $scope.visiblilityList = 'empty';
        } else {
            $scope.visiblilityList = '';
        }
    };

    // Get list tags of page tags
    $scope.getAllTagsListData = function() {
        tagService.getTags()
            .then(
                function(tagsList) {
                    applyTagsListData(tagsList.data);
                },
                function(errorMessage) {
                    console.warn(errorMessage);
                }
            );
    };

    // Get tag by article
    $scope.getTagByArticleId = function(itemArticle) {
        tagService.getTagByArticleId(itemArticle._id)
            .then(
                function(itemArticleData) {
                    $scope.getTagsListByArticleId(itemArticleData.data);
                },
                function(errorMessage) {
                    console.warn(errorMessage);
                }
            );
    };

    // Get tag by article
    $scope.getTagsListByArticleId = function(listTags) {
        _.each(listTags, function(itemTag){
            $scope.getTagById(itemTag);
        });
    };

    // Get list tag of one article
    $scope.getTagById = function(itemTag) {
        tagService.getTagById(itemTag.tagId)
            .then(
                function(itemTagData) {
                    applyTagsOfArticle(itemTagData);
                },
                function(errorMessage) {
                    console.warn(errorMessage);
                }
            );
    };

    // Remove tag
    $scope.removeTagItem = function(itemTag) {
        tagService.removeTagItem(itemTag._id)
            .then(
                function() {
                    // Update list tags
                    $scope.getAllTagsListData();
                },
                function(errorMessage) {
                    console.warn(errorMessage);
                }
            );
    };

    // Update list tag of scope
    function applyTagsOfArticle(ListTags) {
        if (_.isEmpty(ListTags.data) === false ) {
            return  $scope.tags.push(ListTags.data);
        }
        //$scope.visiblilityList($scope.tags);
    };

    // Update list tag of scope
    function applyTagsListData(tagsList) {
        $scope.tags = tagsList;
        //$scope.visiblilityList($scope.tags);
    };

};
