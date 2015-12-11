"use strict";

module.exports = function (rlService, configService) {
    return {
        restrict: "E",
        scope: {
            items: '=itemslist',
            header: '=headerSettings',
            itemsConfig: '=itemsSettings',
        },
        templateUrl: '/results.html',
        controller: function ($scope) {

            $scope.model = rlService.setDefaultModel();

            // Records List actions
            $scope.goToPage = function () {
                $scope.$emit('goToPage', $scope.model.currentPage);
            };

            $scope.sortChange = function () {
                $scope.$emit('SetSortBy', $scope.model.sortBy.value);
            };

            $scope.limitChange = function () {
                $scope.$emit('SetLimit', $scope.model.limit.value);
            };

        },
        link: function (scope, element, attrs) {

            scope.$watchCollection('header', function (newValue, oldValue) {
                if (!_.isEqual(oldValue, newValue))
                    scope.model = rlService.setModelValues(newValue, scope.model);
            })

        }
    }
};
