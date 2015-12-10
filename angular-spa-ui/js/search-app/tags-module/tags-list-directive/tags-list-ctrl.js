'use strict';

module.exports = function($scope, tagService) {

    // Property of tag list
    $scope.tags = [];

    // Property of create tag directive
    $scope.form = {
        tagName: ''
    };

    $scope.msgWorning = '';

    // Define scope directive
    //-------------------------

    $scope.getCurrentScope = function() {
        $scope.currentScope = $scope.getCurrentScopeParam();
        $scope.getTagsList();
    };

    $scope.getCurrentScopeParam = function() {
        if ($scope.inputParam === undefined) {
            return 'pageModuleTags';
        } else
        if ($scope.inputParam !== undefined) {
            return 'pageArticleList';
        }
    };

    // Show tgs list
    //-------------------------

    $scope.getTagsList = function() {
        if ($scope.currentScope === 'pageModuleTags') {
            return $scope.getTagsListData();
        } else
        if ($scope.currentScope === 'pageArticleList') {
            return $scope.getArticleItem($scope.inputParam);
        }
    };

    // Directive of module tags
    //-------------------------

    // Get list tags
    $scope.getTagsListData = function() {
        tagService.getTags()
            .then(
                // Implementation in the case of success
                function(tagsList) {
                    $scope.tags = tagsList.data;
                },
                function(errorMessage) {
                    console.warn(errorMessage);
                }
            );
    };


    // Directive of module article
    //----------------------------

    // Get item article
    $scope.getArticleItem = function(articleItem) {
        $scope.getTagByArticleId(articleItem._id);
    };

    // Get tag by article
    $scope.getTagByArticleId = function(articleId) {
        tagService.getTagByArticleId(articleId)
            .then(
                // Implementation in the case of success
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
                // Implementation in the case of success
                function(tagsList) {
                    $scope.applyTagsListData(tagsList);
                },
                function(errorMessage) {
                    console.warn(errorMessage);
                }
            );
    };

    // Remove or detach the current tag of current scope
    //----------------------------

    // Remove tag
    $scope.removeTagItem = function(itemTag) {
        if ($scope.currentScope === 'pageModuleTags') {
            return $scope.deleteTagItem(itemTag);
        } else
        if ($scope.currentScope === 'pageArticleList') {
            return $scope.detachTagFromArticle(itemTag, $scope.inputParam);
        }
    };

    // Delete item tag
    $scope.deleteTagItem = function(itemTag) {
        tagService.deleteTagItem(itemTag._id)
            .then(
                // Implementation in the case of success
                function() {
                    $scope.tags = _.without($scope.tags, itemTag);
                },
                function(errorMessage) {
                    console.warn(errorMessage);
                }
            );
    };

    // Detach item tag from article
    $scope.detachTagFromArticle = function(itemTag, articleItem) {
        tagService.detachTagFromArticleReq(articleItem._id, itemTag._id)
            .then(
                // Implementation in the case of success
                function() {
                    $scope.tags = _.without($scope.tags, itemTag);
                },
                function(errorMessage) {
                    console.warn(errorMessage);
                }
            );
    };

    // Create or add new tag of current scope
    //----------------------------

    // Add new tag
    $scope.addTag = function() {
        var tagName = $scope.form.tagName;

        if (tagName.length !== 0) {
            if ($scope.currentScope === 'pageModuleTags') {
                return false
            } else
            if ($scope.currentScope === 'pageArticleList') {
                return $scope.createTag(tagName, $scope.inputParam);
            }
        }
    };

    // Create new tag
    $scope.createTag = function(tagName, articleItem) {
        tagService.createTag(tagName)
            .then(
                // Implementation in the case of success
                function(tagItem) {
                    if ( articleItem !== undefined ) {
                        $scope.bindTagItem(articleItem, tagItem.data);
                    }
                    $scope.form.tagName = '';
                },
                function( errorMessage ) {
                    console.warn(errorMessage);
                }
            );
    };

    // Bind new tag item to article
    $scope.bindTagItem = function(articleItem, tagItem) {
        tagService.assignArticleTag(articleItem._id, tagItem._id)
            .then(
                // Implementation in the case of success
                function() {
                    if (_.some($scope.tags, tagItem)) {
                        $scope.msgWorning = 'Such tag already exists';
                    } else {
                        $scope.msgWorning = '';
                        $scope.tags.push(tagItem);
                    }
                },
                function( errorMessage ) {
                    console.warn(errorMessage);
                }
            );
    };

    //----------------------------

    // Update list tag of scope
    $scope.applyTagsListData = function(tagsList) {
        if (_.isEmpty(tagsList.data) === false ) {
            return $scope.tags.push(tagsList.data);
        }
        
    };

};
