"use strict";

module.exports = function (advancedSearch) {
    
    advancedSearch.controller('advancedSearchCtrl', function ($scope, $uibModalInstance, $state, $uibModal, $controller, searchStorage, advancedSearchConfig) {

        var config = advancedSearchConfig.config;
        var prevId = 0;
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
        
        $scope.addNewRow = function(index) {
            prevId += 1;
            var tmp = angular.copy($scope.data),
                id = prevId,  //$scope.rows.length,
                tmpResult = angular.copy(config.baseQuery[0]);
            console.log(index, prevId);
            tmp.id = id;
            tmpResult.id = id;
            $scope.rows.push(tmp);
            $scope.query.push(tmpResult); 
            $scope.rows[index].buttonFields[0].value = false;
        };
        
        $scope.changeAdvanced = function(index, val, param) {
            $scope.query[index][param] = val.value;
        }
        
        $scope.deleteRow = function(id, index) {
            $scope.rows.splice(id, 1);
            $scope.query.splice(id, 1);
            $scope.rows[index-1].buttonFields[0].value = true; 
        };
        
    });
    
}
