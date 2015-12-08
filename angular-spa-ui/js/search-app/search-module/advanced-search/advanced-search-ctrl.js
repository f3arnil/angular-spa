"use strict";

module.exports = function (advancedSearch) {
    
    advancedSearch.controller('advancedSearchCtrl', function ($stateParams, searchService, $http, $scope, $uibModalInstance, $state, $uibModal, $controller, searchStorage, advancedSearchConfig) {

        var config = advancedSearchConfig.config;
        var prevId = 1;
        searchStorage.objQuery = config.tplQuery;
        
        $controller('searchCtrl', { $scope: $scope });
        $scope.queryParams = $stateParams;

        $scope.find = function() {
            searchStorage.searchState = 'search.advancedQuery';
            searchStorage.searchType = 'POST';
            searchStorage
                .objQuery
                    .context
                        .publication
                            .conditions = $scope.query;
            if ($scope.hasQuery()){
                $scope.showResults = false;
                $uibModalInstance.close();
                $state.go(
                    searchStorage.searchState,
                    $scope.queryParams,
                    {
                        inherit : false,
                        reload: true
                    }
                );
            }
        };

        // Function close modal window without request.
        $scope.cancel = function () {
            //$uibModalInstance.close($state.go('search.simpleQuery', searchStorage.params));
        };

        $scope.data = config.tplRow;
        $scope.rows = [];

        // First row in modal window
        $scope.rows.push(angular.copy(config.tplRow));
        // First <select> is always delete 
        $scope.rows[0].selectFields.splice(0,1);

        // First element in array query
        $scope.query = [];
        $scope.query.push(angular.copy(config.baseQuery));
        // First <select> is always has the option NONE
        $scope.query[0].condition_op = 'NONE';
        
        // Function add row for modal window
        $scope.addNewRow = function(index) {
            var rowObj = angular.copy(config.tplRow),
                rowObjResult = angular.copy(config.baseQuery);
            rowObj.id = prevId;
            $scope.rows.push(rowObj);
            $scope.query.push(rowObjResult);
            prevId++;
        };
        
        // Function change all fields
        $scope.changeAdvanced = function(ids, val, param) {
            param == 'query' ? $scope.query[ids][param] = val : $scope.query[ids][param] = val.value;
        };
        
        // Function delete row for modal window
        $scope.deleteRow = function(index) {
            $scope.rows.splice(index, 1);
            $scope.query.splice(index, 1);
        };

    });
    
}
