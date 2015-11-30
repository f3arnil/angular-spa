"use strict";

module.exports = function (advancedSearch) {
    
    advancedSearch.controller('advancedSearchCtrl', function ($scope, $uibModalInstance, $state, $uibModal, $controller, searchStorage, advancedSearchConfig) {

        var config = advancedSearchConfig.config;
        
        // The search function with parameters SearchAdvanced
        $scope.find = function () {
            console.log($scope.query);
        };
        
        // Function close modal window without request.
        $scope.cancel = function () {
            $uibModalInstance.close($state.go('search.simpleQuery', searchStorage.params));
        };
        
        $scope.data = config.tplRow;
        $scope.rows = config.baseRows;
        $scope.query = config.baseQuery;
        
        $scope.addNewRow = function() {
            var tmp = angular.copy($scope.data),
                id = $scope.rows.length,
                tmpResult = angular.copy(config.baseQuery[0]);
            tmp.id = id;
            tmpResult.id = id;
            $scope.rows.push(tmp);
            $scope.query.push(tmpResult);
        };
        
        $scope.changeAdvanced = function(index, val, param) {
            $scope.query[index][param] = val.value;
        }
        
        $scope.deleteRow = function(id) {
            delete($scope.rows[id]);
        };
        
    });
    
}
