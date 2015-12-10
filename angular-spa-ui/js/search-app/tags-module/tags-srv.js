"use strict";

module.exports = function($http, $q) {

    // Service get all tags (GET)
    function getTags() {
        var request = $http({
            method: 'GET',
            url: '/service/tags/'
        });
        return request.then(handleSuccess, handleError);
    }

    // Service delete item tag (DELETE)
    function deleteTagItem(tagId) {
        var request = $http({
            method: "DELETE",
            url: "/service/tag/delete/" + tagId
        });
        return request.then(handleSuccess, handleError);
    }

    // Service create new tag (POST)
    function createTag(tagName) {
        var request = $http({
            method: "POST",
            url: '/service/tag/create/',
            data: {
                name: tagName
            }
        });
        return request.then(handleSuccess, handleError);
    }

    // Service get tag by article #id (GET)
    function getTagByArticleId(articleId) {
        var request = $http({
            method: 'GET',
            url: '/service/tag/get-by-article/' + articleId
        });
        return request.then(handleSuccess, handleError);
    }

    // Service get tag by #id (GET)
    function getTagById(tagId) {
        var request = $http({
            method: 'GET',
            url: '/service/tag/get-by-id/' + tagId
        });
        return request.then(handleSuccess, handleError);
    }

    // Service get tag by #id (GET)
    function detachTagFromArticleReq(articleId, tagId) {
        var request = $http({
            method: 'DELETE',
            url: '/service/remove-article-tag/' + articleId + '/' + tagId
        });
        return request.then(handleSuccess, handleError);
    }

    //app.get('/service/assign-article-tag/:articleId/:tagId', assignArticleTagRequest);
    function assignArticleTag(articleId, tagId) {
        var request = $http({
            method: "GET",
            url: '/service/assign-article-tag/' + articleId + '/' + tagId,
        });
        return request.then(handleSuccess, handleError);
    }

    // Service update item tag (PUT)
    function editTag(tagId, tagName) {
        var request = $http({
            method: "PUT",
            url: '/service/tag/update/' + tagId,
            data: {
                name: tagName
            }
        });
        return request.then(handleSuccess, handleError);
    }

    // Request ERROR
    function handleError(response) {
        if ( !angular.isObject(response.data) || !response.data.message ) {
            return $q.reject("An unknown error occurred.");
        }
        return $q.reject(response.data.message);
    }

    // Request Success
    function handleSuccess(response) {
        return response.data;
    }

    return {
        titlePage: 'Manage tags',
        titleCreateTag: 'Create tag',
        getTags: getTags,
        deleteTagItem: deleteTagItem,
        detachTagFromArticleReq: detachTagFromArticleReq,
        createTag: createTag,
        editTag: editTag,
        getTagByArticleId: getTagByArticleId,
        getTagById: getTagById,
        assignArticleTag: assignArticleTag
    }

};
