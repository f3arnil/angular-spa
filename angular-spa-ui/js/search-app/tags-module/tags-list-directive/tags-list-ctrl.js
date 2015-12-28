'use strict';

module.exports = function($scope, $state, $rootScope, promises) {

    var vm = this;

    var priveteAPI = {

        isWatchingEventDelete: false,

        /**
         * Starts directive.
         */
        startsDirective: function(state) {
            switch (state) {
                case
                    'tags':
                    this.getTagsListData();
                    break;
                case
                    'search.simple':
                    this.getTagsListByArticleItem($scope.inputParam);
                    break;
                case
                    'search.simpleQuery':
                    this.getTagsListByArticleItem($scope.inputParam)
                    break;
            };
        },


        /**
         * Repeater of fill array.
         *
         * Comman function.
         */
        repeaterOfFill: function(arr) {
            _.each(arr, function(item) {
                model.tags.push(item);
            });
        },


        /**
        * Is equality name new tag
        *
        * Returns true if any of the values in the list pass the predicate* truth test.
        * Short-circuits and stops traversing the list if a true element is found.
        * *predicate -> newTag
        */
        isEqualityNameNewTag: function(newTag) {
            return _.some(model.tags, newTag);
        },

        /**
         * API GET -get all tags.
         *
         * Input result.data in model.tags (get collection tags in array)
         */
        getTagsListData: function() {
            promises.getAsyncData('GET', '/service/tags/')
                .then(
                    function(result) {
                        var arrData = result.data;
                        priveteAPI.repeaterOfFill(arrData);

                        $scope.$on('deleteTagEvent', function(event, args) {
                            priveteAPI.deleteTag(args);
                        });
                    }
                )
                .catch(
                    function(err) {
                        this.warnMessage(err);
                    }
                )
        },


        /**
         * API GET - get tag by name.
         *
         * It is function of prepared for next task
         */
        /**
        getTagByName: function(tagItem) {
            var tagName = tagItem.tagName;
            promises.getAsyncData('GET', '/service/tag/by-name/' + tagName)
                .then(
                    function(result) {
                        // result...
                    }
                )
                .catch(
                    function(err) {
                        this.warnMessage(err);
                    }
                )
        },
        */


        /**
         * API GET - get tag by id.
         *
         * It is function of prepared for next task
         *
         * ":tagId" - is an Entity ID of Tag.
         */
        /**
        getTagById: function(tagItem) {
            var tagId = tagItem._id;
            promises.getAsyncData('GET', '/service/tag/by-id/' + tagId)
                .then(
                    function(result) {
                        // result...
                    },
                    function(err) {
                        this.warnMessage(err);
                    }
                );
        },
        */


        /**
         * API POST - creates a new tag 
         *
         * The function works next way:
         * 1. Checks tag name. If tag with selected name already exists - it does not create a copy, it returns same tag.
         * 2. Checks assignment (assignment - is an Id of piece of content like article, publication or etc).
         *    If assignment specified the tag connects to the content.
         * 3. Return result object in any way:
         */
        createTag: function(tagName, articleItem) {
            var data = {"assignmentId":articleItem,"name":tagName,"published":true};
            promises.getAsyncData('POST', '/service/tag', data)
                .then(
                    function(result) {
                        var newTag = result.data.tag;
                        var msg = 'Error, tag with that name already exists in this article';
                        model.msgWorning = '';

                        model.isDisabledBtn = false;

                        !(priveteAPI.isEqualityNameNewTag(newTag))
                            ? model.tags.push(newTag)
                            : model.msgWorning = msg;

                        model.form.tagName = '';
                        model.showFormAddTag = false;
                    },
                    function(err) {
                        this.warnMessage(err);
                    }
                );
        },


        /**
         * API PUT - Updates existing tag.
         *
         * It is function of prepared for next task
         *
         * See more in description of "createTagRequest" entry point (/service/tag).
         */
        /**
        updateTag: function(tagItem) {
            var tagId = tagItem._id;
            promises.getAsyncData('PUT', '/service/tag/' + tagId)
                .then(
                    function(result) {
                        // result..
                    },
                    function(err) {
                        this.warnMessage(err);
                    }
                );
        },
        */


        /**
         * API DELETE - Removes assignment betweet tag and content.
         */
        unpinTag: function(tagItem, articleItem) {
            var tagId = tagItem._id;
            var contentId = articleItem._id;
            promises.getAsyncData('DELETE', '/service/tag/unpin/' + tagId + '/' + contentId)
                .then(
                    function(result) {
                        model.tags = _.without(model.tags, tagItem);
                    },
                    function(err) {
                        this.warnMessage(err);
                    }
                );
        },


        /**
         * API DELETE - Removes tag from ALL assigned content and deletes tag entity.
         */
        deleteTag: function(tagItem) {
            var tagId = tagItem._id;
            promises.getAsyncData('DELETE', '/service/tag/' + tagId)
                .then(
                    function(result) {
                        model.tags = _.without(model.tags, tagItem);
                    },
                    function(err) {
                        this.warnMessage(err);
                    }
                );
        },


        /**
         * API GET
         *
         * Pulls tags by list of contentIds. If you want to get tags from one content item - just send id of the content
         * in ":contentIds". If you are going to receive tags that assigned for multiple content items - write it as
         * list and divide ids by comma character (id1,id2,id3,id4,...,idn).
         */
        pullTagsByContentIds: function(result) {
            var contentIds = result;
            promises.getAsyncData('GET', '/service/tags/get-by-content/' + contentIds)
                .then(
                    function(result) {
                        if (!_.isEmpty(result.data)) {
                            priveteAPI.repeaterOfFill(result.data);
                        }
                    },
                    function(err) {
                        this.warnMessage(err);
                    }
                );
        },


        /**
         * API GET
         *
         * Implementation of autocomplete features
         */
        autocompleteTag: function(arg) {
            promises.getAsyncData('GET', '/service/tag/autocomplete/' + arg)
                .then(
                    function(result) {
                        var resultData = result.data;

                        _.each(resultData, function(itemData) {
                            model.autoSuggestWord.push(itemData);
                        });
                    },
                    function(err) {
                        this.warnMessage(err);
                    }
                );
        },


        /**
         * Get Article Id from list articles
         */
        getTagsListByArticleItem: function(articleItem) {
            var articleId = articleItem._id;
            $scope.$on('deleteTagEvent', function(event, args) {
                priveteAPI.unpinTag(args, articleItem);
            });
            this.pullTagsByContentIds(articleId);
        },

        /**
         * Reset auto suggest word
         */
        resetAutoSuggestWord: function() {
            model.autoSuggestWord = [];
        },

        /**
         * Show a message as a warning.
         */
        warnMessage: function(warnMsg) {
            console.warn(warnMsg);
        }

    };

    /**
     * Initializing functions
     */
    var init = function() {
        vm.model = model;
        vm.viewAPI = viewAPI;
    };

    /**
     * Creating model as object and installing default setting.
     */
    var model = {
        tags: [],
        form: {
            tagName: ''
        },
        msgWorning: '',
        showFormAddTag: false,
        wrapContentDir: true,
        isDisabledBtn: false
        //autoSuggestWord: []
    };

    /**
     * Object contains the are functions 
     * that provide of functionality of the elements in the DOM.
     */
    var viewAPI = {

        /**
         * Get state name (determined from ui-router)
         */
        getStateName: function() {
            priveteAPI.startsDirective($state.current.name);
        },

        /**
         * Click button "remove" tag
         */
        removeTagItem: function(tagItem) {
            //$scope.$broadcast('deleteTagEvent', tagItem);
            $scope.$emit('deleteTagEvent', tagItem);
        },

        /**
         * Click button "add" new tag
         */
        addTag: function(tagName) {
            if (!_.isEmpty(tagName)) {
                model.isDisabledBtn = true;
                priveteAPI.createTag(tagName, $scope.inputParam);
            };
        },

        updateList: function(param) {
            //priveteAPI.autocompleteTag(param);
        }

    };

    /**
     * Starts controller
     */
    init();

};
