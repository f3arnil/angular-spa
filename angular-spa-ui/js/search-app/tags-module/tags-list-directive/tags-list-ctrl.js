'use strict';

module.exports = function($scope, $state, $rootScope, promises) {

    var priveteAPI = {

        isWatchingEventDelete: false,
        unbindHandler: null,

        selectionFunction: function(state) {
            return {
                'tags': this.getTagsListData(),
                //'search.simple': this.getTagsListByArticleItem($scope.inputParam)
                'search.simpleQuery': this.getTagsListByArticleItem($scope.inputParam)
            }
        },


        /**
         * Get all tags.
         */
        getTagsListData: function() {
            promises.getAsyncData('GET', '/service/tags/')
                .then(
                    function(result) {
                        model.tags = result.data;
                    }
                )
                .catch(
                    function(err) {
                        this.errorMessage(err);
                    }
                )
        },


        /**
         * Get tag by name.
         *
         * ":tagName" - is a String full-name of the tag.
         */
        getTagByName: function(tagItem) {
            var tagName = tagItem.tagName;
            promises.getAsyncData('GET', '/service/tag/by-name/' + tagName)
                .then(
                    function(result) {
                        //model.tags = result.data;
                        this.errorMessage('This function is prepared, without functionality')
                    }
                )
                .catch(
                    function(err) {
                        this.errorMessage(err);
                    }
                )
        },


        /**
         * Get tag by id.
         *
         * ":tagId" - is an Entity ID of Tag.
         */
        getTagById: function(tagItem) {
            var tagId = tagItem._id;
            promises.getAsyncData('GET', '/service/tag/by-id/' + tagId)
                .then(
                    function(result) {
                        console.log(result);
                        //$scope.applyTagsListData(tagsList);
                    },
                    function(err) {
                        this.errorMessage(err);
                    }
                );
        },


        /**
         * Creates a new tag with assignment if specified.
         * Create new tag from article
         *
         * The function works next way:
         * 1. Checks tag name. If tag with selected name already exists - it does not create a copy, it returns same tag.
         * 2. Checks assignment (assignment - is an Id of piece of content like article, publication or etc).
         *    If assignment specified the tag connects to the content.
         * 3. Return result object in any way:
         * {
         *  "tag": { tagEntity },
         *  "assignment": { assignmentEntity or null }
         * }
         *
         * Request fields:
         * {
         *  "assignmentId": "$entityId",    // String entity id (article, publication or other) that should be connected with the tag
         *  "name": "Sample tag",           // String name of tag
         *  "textColor": "#333",            // HEX color of the tags text
         *  "backgroundColor": "#AAA",      // HEX color of the tag background
         *  "glyph": "$important",          // String id of glyph type (unused)
         *  "published": "true",            // Boolean value of tags visibility (unpublished tags should be hidden)
         * }
         */
        createTag: function() {
        //createTag: function(tagName, articleItem) {
            promises.getAsyncData('POST', '/service/tag')
                .then(
                    function(result) {
                        console.log(result);
                        // function(tagItem) {
                        //     $scope.bindTagItem(articleItem, tagItem.data);
                        //     $scope.form.tagName = '';
                        // },
                    },
                    function(err) {
                        this.errorMessage(err);
                    }
                );
        },


        /**
         * Updates existing tag.
         *
         * See more in description of "createTagRequest" entry point (/service/tag).
         */
        updateTag: function(tagItem) {
            var tagId = tagItem._id;
            promises.getAsyncData('PUT', '/service/tag/' + tagId)
                .then(
                    function(result) {
                        console.log(result);
                    },
                    function(err) {
                        this.errorMessage(err);
                    }
                );
        },


        /**
         * Removes assignment betweet tag and content.
         */
        unpinTag: function(tagItem, articleItem) {
            var tagId = tagItem._id;
            var contentId = articleItem._id;
            promises.getAsyncData('DELETE', '/service/tag/unpin/' + tagId + '/' + contentId)
                .then(
                    function(result) {
                        console.log(result);
                    },
                    function(err) {
                        this.errorMessage(err);
                    }
                );
        },


        /**
         * Removes tag from ALL assigned content and deletes tag entity.
         */
        deleteTag: function(tagItem) {
            var tagId = tagItem._id;
            promises.getAsyncData('DELETE', '/service/tag/' + tagId)
                .then(
                    function(result) {
                        model.tags = _.without(model.tags, tagItem);
                        // $scope.detechTagsRemoving();
                    },
                    function(err) {
                        this.errorMessage(err);
                    }
                );
        },


        /**
         * Pulls tags by list of contentIds. If you want to get tags from one content item - just send id of the content
         * in ":contentIds". If you are going to receive tags that assigned for multiple content items - write it as
         * list and divide ids by comma character (id1,id2,id3,id4,...,idn).
         */
        pullTagsByContentIds: function(result) {
            console.log(result)
            var contentIds = result;
            promises.getAsyncData('GET', '/service/tags/get-by-content/' + contentIds)
                .then(
                    function(result) {
                        console.log(result);
                    },
                    function(err) {
                        this.errorMessage(err);
                    }
                );
        },


        /**
         * Implementation of autocomplete features
         */
        autocompleteTag: function(arg) {
            console.log(arg)
            promises.getAsyncData('GET', '/service/tag/autocomplete/' + arg)
                .then(
                    function(result) {
                        console.log(result);
                    },
                    function(err) {
                        this.errorMessage(err);
                    }
                );
        },











        /**
         * Get Article Id from list articles
         */
        getTagsListByArticleItem: function(articleItem) {
            //var articleId = articleItem._id;
            //console.log( model.tags );
            //console.log(articleId);
           // this.pullTagsByContentIds(articleId);
            //$scope.getTagByArticleId(articleItem._id);
        },


        // Get tag by article
        getTagByArticleId: function(articleId) {
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
        },


        // Get tag by article
        getListLinksTagsIdAndArticleId: function(listLinks) {
            _.each(listLinks, function(itemLink) {
                $scope.getTagById(itemLink);
            });
        },






        errorMessage: function(errorMsg) {
            console.warn(errorMsg);
        }

    };

    var init = function() {
        $scope.model = model;
        $scope.viewAPI = viewAPI;

        // console.log(this)
        // console.log( $scope );
        // console.log( $scope.model );
        // console.log( $scope.viewAPI );
    };

    var model = {
        tags: [],
        form: {
            tagName: ''
        },
        msgWorning: ''
    };

    var viewAPI = {


        getStateName: function() {
            //console.log( $state.current.name );
            priveteAPI.selectionFunction($state.current.name);

            //search.simpleQuery: this.getArticleItemByList($scope.inputParam);
            //search.simple: priveteAPI.getArticleItemByList($scope.inputParam);
            // $scope.eventDeleteTag = $scope.onTagRemoving;
            // $scope.addNewTag = $scope.isDoing;
        },

        // Remove tag (button delete tag)
        removeTagItem: function(tagItem) {
            console.log(tagItem)
            priveteAPI.deleteTag(tagItem);
            //$scope.eventDeleteTag(tagItem);
        },

    };


    init();



    /*

        onTagRemoving: function(tagItem) {
            $scope.unbindHandler = $scope.$on('deleteTagItem', $scope.deleteTagItem(tagItem));
            $scope.isWatchingEventDelete = true;
        };



        // Delete assign item tag from article
        deleteAssignArticleTag: function(tagItem, articleItem) {
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

        onTagsByArticleRemoving: function(tagItem) {
            $scope.unbindHandler = $scope.$on('deleteAssignArticleTag', $scope.deleteAssignArticleTag(tagItem, $scope.inputParam));
            $scope.isWatchingEventDelete = true;
        };

        // Off event delete tag listener
        //----------------------------

        detechTagsRemoving: function() {
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

        addTag: function() {
            $scope.addNewTag();
        };

        prepareCreateTag: function() {
            var tagName = $scope.form.tagName;

            !_.isEmpty(tagName) ?
                $scope.createTag(tagName, $scope.inputParam) :
                $scope.isDoing();
        };

        isDoing: function() {
            $scope.errorMessage('Is not provided to the user!');
            return false;
        };


        // Bind new tag item to article
        bindTagItem: function(articleItem, tagItem) {
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

        applyTagsListData: function(tagsList) {
            if (_.isEmpty(tagsList.data) === false ) {
                return $scope.tags.push(tagsList.data);
            }
        };

        // Get message message Attention. If warning
        //----------------------------

        errorMessage: function(errorMessage) {
            console.warn(errorMessage);
        };

        warningMessageForView: function(errorMessage) {
            $scope.msgWorning = errorMessage;
        };
    */

};
