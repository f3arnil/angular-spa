"use strict";

module.exports = function(tags) {

    tags.controller('tagsCtrl', function($scope, $http, tagsService){

        $scope.tags = {};
        $scope.titlePage = tagsService.titlePageTags;

        $scope.formCreate = {
            name: ""
        };

        $scope.formEditName = {
            name: ""
        };

        loadRemoteData($http);

        $scope.createTag = function() {
            tagsService.createTag($scope.formCreate.tagName, $http)
                .then(
                    loadRemoteData($http),
                    function( errorMessage ) {
                        console.warn(errorMessage);
                    }
                );

            $scope.formCreate.tagName = "";
        };

        $scope.editorEnabled = false;

        $scope.editTag = function(tag, $http) {
        //     console.log(tag);
        //     //tagsService.editTag(tag._id, tag.name, $http);
        };

        /*
        // $scope.enableEditor = function() {
        //     $scope.editorEnabled = true;
        // };

        // $scope.disableEditor = function() {
        //     $scope.editorEnabled = false;
        // };
        */

        $scope.removeTag = function(tag) {
            tagsService.removeTag(tag._id, $http)
                .then(loadRemoteData($http),
                    function( errorMessage ) {
                        console.warn(errorMessage);
                    }
                );

            loadRemoteData($http)
        };

        function applyRemoteData(tagsList) {
            $scope.tags = tagsList.data;
        };

        function loadRemoteData(serv) {
            tagsService.getTags(serv)
                .then(
                    function(tags) {
                        applyRemoteData(tags);
                    }
                );
        };

    });

};
