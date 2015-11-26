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
        }

        function loadRemoteData(serv) {
            tagsService.getTags(serv)
                .then(
                    function(tags) {
                        applyRemoteData(tags);
                    }
                );
        }


        // $scope.editTag = function(tag) {
        //     console.log(tag);
        //     console.log(this);
        //     tagsService.editTag(tag._id, tag.name, $http);

        //     //$scope.showStatus = function() {
        //     ClickToEditCtrl();
        //         // .then(
        //         //     loadRemoteData($http),
        //         //     function( errorMessage ) {
        //         //         console.warn(errorMessage);
        //         //     }
        //         // );

        //     //$scope.form.tagName = "";
        // };

        // $scope.editorEnabled = false;

        // $scope.enableEditor = function(tag) {
        //     console.log(tag)
        //     $scope.editorEnabled = true;
        //     //$scope.editableTitle = $scope.title;
        // };

        // $scope.disableEditor = function() {
        //     console.log(arguments)
        //     $scope.editorEnabled = false;
        // };

        // $scope.save = function(tag) {
        //     console.log(arguments)
        //     $scope.title = $scope.editableTitle;
        //     $scope.disableEditor();
        // };


    });

};
