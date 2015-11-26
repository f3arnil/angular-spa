"use strict";

module.exports = function(tags) {

    tags.service('tagsService', function($http, $q) {

        return({
            titlePageTags: 'Manage tags',
            urlBase: '/service/tags',
            getTags: getTags,
            createTag: createTag,
            removeTag: removeTag,
            editTag: editTag
        });

    });

    //app.get('/service/tags', getTagsRequest);
    function getTags($http) {
        //console.log($http);
        var request = $http({
            method: 'get',
            url: this.urlBase,
            params: {
                action: 'get'
            }
        });
        return( request.then( handleSuccess, handleError ) );
    }

    //app.put('/service/tag/create', createTagRequest);
    function createTag(tagName, $http) {
        console.log(tagName);
        console.log($http);

        var request = $http({
            method: "post",
            url: this.urlBase + "/create",
            params: {
                action: "save"
            },
            data: {
                tag: tagName
            }
        });
        return( request.then( handleSuccess, handleError ) );
    }

    function editTag(tagName, $http) {
        console.log(tagName);
    }

    function removeTag(id, $http) {
        console.log(id)
        var request = $http({
            method: "delete",
            url: this.urlBase + "/delete/" + ":" + id,
            params: {
                action: "delete"
            },
            data: {
                tagId: id
            }
        });
        return( request.then( handleSuccess, handleError ) );
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




};
