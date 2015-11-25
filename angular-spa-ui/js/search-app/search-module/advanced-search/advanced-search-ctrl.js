"use strict";

module.exports = function (advancedSearch) {

    
    advancedSearch.controller('advancedSearchCtrl', function ($scope, $uibModalInstance, items, $state) {

        $scope.items = items;
        $scope.selected = {
            item: $scope.items[0]
        };

        $scope.ok = function () {
            $uibModalInstance.close($scope.selected.item);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });
    
}
