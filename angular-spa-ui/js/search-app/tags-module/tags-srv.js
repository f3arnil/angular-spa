"use strict";

module.exports = function(tags) {

    function getTags($http) {
        var request = $http({
            method: 'get',
            url: '/service/tags'
        });
        return(request.then(handleSuccess, handleError));
    }

    function createTag(tagName, $http) {
        var request = $http({
            method: "post",
            url: '/service/tag/create',
            data: {
                name: tagName
            }
        });
        return(request.then(handleSuccess, handleError));
    }

    function editTag(tagId, tagName, $http) {
        var request = $http({
            method: "put",
            url: '/service/tag/update/' + tagId,
            data: {
                name: tagName
            }
        });
        return(request.then(handleSuccess, handleError));
    }

    function removeTag(tagId, $http) {
        var request = $http({
            method: "delete",
            url: "/service/tag/delete/"+ tagId
        });
        return(request.then(handleSuccess, handleError));
    }

    function handleError(response) {
        if (
            ! angular.isObject( response.data ) ||
            ! response.data.message
            ) {
            return( $q.reject( "An unknown error occurred." ) );
        }
        return( $q.reject( response.data.message ) );
    }

    function handleSuccess( response ) {
        return( response.data );
    }

    tags.service('tagsService', function($http, $q) {
        return {
            titlePageTags: 'Manage tags',
            getTags: getTags,
            createTag: createTag,
            removeTag: removeTag,
            editTag: editTag
        };
    });

};
