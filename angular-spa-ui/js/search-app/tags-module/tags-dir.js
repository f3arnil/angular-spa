"use strict";

module.exports = function() {

    var tagsList = {
        restrict: 'E',
        transclude: true,
        scope: {

        },
        controller: function($scope, tagService) {

            // Property of current scope
            $scope.tags = {};
            $scope.visiblilityList = 'empty';

            // Get list tags
            $scope.loadRemoteData = function () {
                tagService.getTags()
                    .then(
                        function(tagsList) {
                            applyRemoteData(tagsList);
                        }
                    );
            };

            // Remove tag
            $scope.removeTagItem = function(tag) {
                tagService.removeTagItem(tag._id)
                    .then(
                        $scope.loadRemoteData(),
                        function(errorMessage) {
                            console.warn(errorMessage);
                        }
                    );

                $scope.loadRemoteData();
            };

            // Update list tag of scope
            function applyRemoteData(tagsList) {
                $scope.tags = tagsList.data;
                visiblilityList($scope.tags);
            };

            // Visibility (show/hide) list tags
            function visiblilityList(tagsList) {
                if (tagsList.length === 0) {
                    $scope.visiblilityList = 'empty';
                } else {
                    $scope.visiblilityList = '';
                }
            };

            // Start module tag
            $scope.loadRemoteData();

        },
        templateUrl: '/listTagsTemplate.html',
        replace: true
    };

    return tagsList;

};
