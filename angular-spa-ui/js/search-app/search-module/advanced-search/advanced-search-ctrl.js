"use strict";

module.exports = function (advancedSearch) {

    
    advancedSearch.controller('advancedSearchCtrl', function ($scope, $uibModalInstance, $state, $uibModal, $controller) {

        $controller('searchCtrl', {$scope: $scope});
                
        $scope.ok = function () {
            $uibModalInstance.close($state.go('search.advancedQuery', { query: $scope.data.repeatSelect, test: $scope.inputAdvancedSearch.text }, { inherit : false }));
        };

        $scope.cancel = function () {
            $uibModalInstance.close($state.go('search.simple'));
        };
        
        $scope.data = {
            repeatSelect: null,
            availableOptions: [
                {id: '1', name: 'All fields'},
                {id: '2', name: 'Title'}
            ],
        };
        
    });
    
}
