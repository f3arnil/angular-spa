"use strict";

module.exports = function($http, $q) {

    // Service get all tags (GET)
    function getTags() {
        var request = $http({
            method: 'GET',
            url: '/service/tags'
        });
        return request.then(handleSuccess, handleError);
    }

    // Service delete item tag (DELETE)
    function removeTagItem(tagId) {
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
            url: '/service/tag/create',
            data: {
                name: tagName
            }
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
        removeTagItem: removeTagItem,
        createTag: createTag,
        editTag: editTag
    }


};
