'use strict';

module.exports = function($http, $q) {

    return {

        // Service get all tags (GET)
        getTags: function() {
            var request = $http({
                method: 'GET',
                url: '/service/tags/'
            });
            return request.then(this.handleSuccess, this.handleError);
        },

        // Service delete item tag (DELETE)
        deleteTagItem: function(tagId) {
            var request = $http({
                method: 'DELETE',
                url: '/service/tag/delete/' + tagId
            });
            return request.then(this.handleSuccess, this.handleError);
        },

        // Service create new tag (POST)
        createTag: function(tagName) {
            var request = $http({
                method: 'POST',
                url: '/service/tag/create/',
                data: {
                    name: tagName
                }
            });
            return request.then(this.handleSuccess, this.handleError);
        },

        // Service get tag by article #id (GET)
        getTagByArticleId: function(articleId) {
            var request = $http({
                method: 'GET',
                url: '/service/tag/get-by-article/' + articleId
            });
            return request.then(this.handleSuccess, this.handleError);
        },

        // Service get tag by #id (GET)
        getTagById: function(tagId) {
            var request = $http({
                method: 'GET',
                url: '/service/tag/get-by-id/' + tagId
            });
            return request.then(this.handleSuccess, this.handleError);
        },

        // Service get tag name (GET)
        getTagByName: function(tagName) {
            var request = $http({
                method: 'GET',
                url: '/service/tag/get-by-name/' + tagName
            });
            return request.then(this.handleSuccess, this.handleError);
        },

        // Service delete assign article tag (DELETE)
        deleteAssignArticleTag: function(articleId, tagId) {
            var request = $http({
                method: 'DELETE',
                url: '/service/remove-article-tag/' + articleId + '/' + tagId
            });
            return request.then(this.handleSuccess, this.handleError);
        },

        // Service assign article tag (GET)
        assignArticleTag: function(articleId, tagId) {
            var request = $http({
                method: 'GET',
                url: '/service/assign-article-tag/' + articleId + '/' + tagId,
            });
            return request.then(this.handleSuccess, this.handleError);
        },

        // Service update item tag (PUT)
        editTag: function(tagId, tagName) {
            var request = $http({
                method: 'PUT',
                url: '/service/tag/update/' + tagId,
                data: {
                    name: tagName
                }
            });
            return request.then(this.handleSuccess, this.handleError);
        },

        // Request ERROR
        handleError: function(response) {
            if ( !angular.isObject(response.data) || !response.data.message ) {
                return $q.reject('An unknown error occurred.');
            }
            return $q.reject(response.data.message);
        },

        // Request Success
        handleSuccess: function(response) {
            return response.data;
        }

            // getTags: getTags,
            // deleteTagItem: deleteTagItem,
            // deleteAssignArticleTag: deleteAssignArticleTag,
            // createTag: createTag,
            // editTag: editTag,
            // getTagByArticleId: getTagByArticleId,
            // getTagById: getTagById,
            // getTagByName: getTagByName,
            // assignArticleTag: assignArticleTag
    }

};
