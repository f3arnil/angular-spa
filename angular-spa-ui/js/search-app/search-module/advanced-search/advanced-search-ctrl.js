"use strict";

module.exports = function (advancedSearch) {

    
    advancedSearch.controller('advancedSearchCtrl', function ($scope, $uibModalInstance, $state, $uibModal, $controller, searchStorage) {

        //$controller('searchCtrl', {$scope: $scope});
                
        $scope.ok = function () {
            //$uibModalInstance.close($state.go('search.advancedQuery', { title: $scope.data.repeatSelect.name }, { inherit : false }));
            console.log($scope.fields);
        };

        $scope.cancel = function () {
            $uibModalInstance.close($state.go('search.simpleQuery', searchStorage.params));
        };
        
        $scope.data = {
            row: 0,
            text: null,
            options: [
                {id: '1', name: 'All fields'},
                {id: '2', name: 'Title'}
            ],
        };
        
        $scope.fields = [$scope.data];
        $scope.addNewField = function() {
            var newItemNo = $scope.fields.length+1;
            $scope.fields.push({'row': $scope.data.row+newItemNo, 'text':$scope.data.text, 'options': $scope.data.options});
        };
    });
    
}
