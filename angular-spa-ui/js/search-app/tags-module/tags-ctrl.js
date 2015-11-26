"use strict";

module.exports = function(tags) {

    tags.controller('tagsCtrl', function($scope, $http, tagsService){

        $scope.tags = [];
        $scope.titlePage = tagsService.titlePageTags;

        $scope.form = {
            name: ""
        };

        loadRemoteData($http);

        $scope.createTag = function() {
           // console.log($http);
            tagsService.createTag($scope.form.tagName, $http)
                .then(
                    loadRemoteData($http),
                    function( errorMessage ) {
                        console.warn(errorMessage);
                    }
                );

            $scope.form.tagName = "";
        };

        $scope.editTag = function(tagName) {
            console.log(tagName.name);
            tagsService.editTag(tagName.name, $http)
                // .then(
                //     loadRemoteData($http),
                //     function( errorMessage ) {
                //         console.warn(errorMessage);
                //     }
                // );

            //$scope.form.tagName = "";
        };

        $scope.removeTag = function(tag) {
            console.log(tag);
            tagsService.removeTag(tag._id, $http)
                .then(loadRemoteData);
        };

        function applyRemoteData(tagsList) {
            console.log(tagsList);
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

    });

};
