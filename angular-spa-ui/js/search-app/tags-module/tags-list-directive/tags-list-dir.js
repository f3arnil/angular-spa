'use strict';

module.exports = function() {

    var tagsList = {
        restrict: 'E',
        transclude: true,
        scope: {
            inputParam: '=inputParam',
            msgWorning: '=msgWorning'
        },
        link: function(scope, element, attrs) {

            scope.viewAPI.getStateName();

            /**
            Produced by another solution implementation tasks

            Start downloading data for a directive
            scope.$emit('tagsDirLoad');
            scope.$on('tagsListLoadOfSearchPage', function(event, elem) {
                scope.getArticleItemByList(scope.inputParam);
            });

            Case for controller search
            $scope.$on('tagsDirLoad', function(event, elem) {
                $scope.$broadcast('tagsListLoadOfSearchPage');
            });

            */
        },
        controller: 'tagsListController',
        templateUrl: '/listTagsTemplate.html',
        replace: true
    };

    return tagsList;

};
