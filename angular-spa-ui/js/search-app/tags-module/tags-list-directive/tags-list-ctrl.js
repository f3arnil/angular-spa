'use strict';

module.exports = function($scope, tagService, $state, $rootScope) {

    // Property of tag list
    $scope.tags = [];

    // Property of create tag directive
    $scope.form = {
        tagName: ''
    };

    // Worning text for message error
    $scope.msgWorning = '';

    $scope.isWatchingEventDelete = false;
    $scope.unbindHandler = null;

    // Get current state name Provider for directive
    //-------------------------

    $scope.getStateName = function() {
        switch ($state.current.name) {
            case
                'tags':
                $scope.getTagsListData();
                break;
            case
                'search.simple':
                $scope.getArticleItemByList($scope.inputParam);
                break;
            case
                'search.simpleQuery':
                $scope.getArticleItemByList($scope.inputParam);
                break;
        }
    };


    // Remove tag (button delete tag)
    $scope.removeTagItem = function(tagItem) {
        $scope.eventDeleteTag(tagItem);
    };


    // Implementation code of page Manage tags
    //-------------------------

    // Get list tags
    $scope.getTagsListData = function() {
        tagService.getTags()
            .then(
                // Implementation in the case of success
                function(tagsList) {
                    $scope.tags = tagsList.data;
                    $scope.eventDeleteTag = $scope.onTagRemoving;
                    $scope.addNewTag = $scope.isDoing;
                },
                function(errorMessage) {
                    $scope.errorMessage(errorMessage);
                }
            );
    };

    // Get list tag of one article
    $scope.getTagById = function(tagItem) {
        tagService.getTagById(tagItem.tagId)
            .then(
                // Implementation in the case of success
                function(tagsList) {
                    $scope.applyTagsListData(tagsList);
                },
                function(errorMessage) {
                    $scope.errorMessage(errorMessage);
                }
            );
    };

    // Get tag by name
    $scope.getTagByName = function() {
        tagService.getTagByName()
            .then(
                // Implementation in the case of success
                function() {
                    $scope.errorMessage('This function is prepared, without functionality')
                },
                function(errorMessage) {
                    $scope.errorMessage(errorMessage);
                }
            );
    };

    // Delete item tag
    $scope.deleteTagItem = function(tagItem) {
        tagService.deleteTagItem(tagItem._id)
            .then(
                // Implementation in the case of success
                function() {
                    $scope.tags = _.without($scope.tags, tagItem);
                    $scope.detechTagsRemoving();
                },
                function(errorMessage) {
                    $scope.errorMessage(errorMessage);
                }
            );
    };

    $scope.onTagRemoving = function(tagItem) {
        $scope.unbindHandler = $scope.$on('deleteTagItem', $scope.deleteTagItem(tagItem));
        $scope.isWatchingEventDelete = true;
    };


    // Directive of module article
    //----------------------------

    // Get article item by list article
    $scope.getArticleItemByList = function(articleItem) {
        $scope.getTagByArticleId(articleItem._id);
    };

    // Get tag by article
    $scope.getTagByArticleId = function(articleId) {
        tagService.getTagByArticleId(articleId)
            .then(
                // Implementation in the case of success
                function(itemArticleData) {
                    $scope.getListLinksTagsIdAndArticleId(itemArticleData.data);
                    $scope.eventDeleteTag = $scope.onTagsByArticleRemoving;
                    $scope.addNewTag = $scope.prepareCreateTag;
                },
                function(errorMessage) {
                    $scope.errorMessage(errorMessage);
                }
            );
    };

    // Get tag by article
    $scope.getListLinksTagsIdAndArticleId = function(listLinks) {
        _.each(listLinks, function(itemLink) {
            $scope.getTagById(itemLink);
        });
    };

    // Delete assign item tag from article
    $scope.deleteAssignArticleTag = function(tagItem, articleItem) {
        tagService.deleteAssignArticleTag(articleItem._id, tagItem._id)
            .then(
                // Implementation in the case of success
                function() {
                    $scope.tags = _.without($scope.tags, tagItem);
                    $scope.detechTagsRemoving();
                },
                function(errorMessage) {
                    $scope.errorMessage(errorMessage);
                }
            );
    };

    $scope.onTagsByArticleRemoving = function(tagItem) {
        $scope.unbindHandler = $scope.$on('deleteAssignArticleTag', $scope.deleteAssignArticleTag(tagItem, $scope.inputParam));
        $scope.isWatchingEventDelete = true;
    };

    // Off event delete tag listener
    //----------------------------

    $scope.detechTagsRemoving = function() {
        $scope.unbindHandler(); // or unbindHandler = null;
        $scope.isWatchingEventDelete = false;
    };



    // Directive of module article
    //----------------------------

    // Get article item 
    // Prepare case for implementation of next task
    // $scope.getArticleItem = function(articleItem) {

    // };

    // Add new tag
    //----------------------------

    $scope.addTag = function() {
        $scope.addNewTag();
    };

    $scope.prepareCreateTag = function() {
        var tagName = $scope.form.tagName;

        !_.isEmpty(tagName) ?
            $scope.createTag(tagName, $scope.inputParam) :
            $scope.isDoing();
    };

    $scope.isDoing = function() {
        $scope.errorMessage('Is not provided to the user!');
        return false;
    };

    // Create new tag from article
    $scope.createTag = function(tagName, articleItem) {
        tagService.createTag(tagName)
            .then(
                // Implementation in the case of success
                function(tagItem) {
                    $scope.bindTagItem(articleItem, tagItem.data);
                    $scope.form.tagName = '';
                },
                function(errorMessage) {
                    $scope.errorMessage(errorMessage);
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
                        $scope.warningMessageForView('Such tag already exists');
                    } else {
                        $scope.msgWorning = '';
                        $scope.tags.push(tagItem);
                    }
                },
                function(errorMessage) {
                    $scope.errorMessage(errorMessage);
                }
            );
    };


    // Update list tag of scope
    //----------------------------

    $scope.applyTagsListData = function(tagsList) {
        if (_.isEmpty(tagsList.data) === false ) {
            return $scope.tags.push(tagsList.data);
        }
    };

    // Get message message Attention. If warning
    //----------------------------

    $scope.errorMessage = function(errorMessage) {
        console.warn(errorMessage);
    };

    $scope.warningMessageForView = function(errorMessage) {
        $scope.msgWorning = errorMessage;
    };

};
