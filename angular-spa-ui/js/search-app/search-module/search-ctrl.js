"use strict";

module.exports = function (search) {

    search.controller('searchCtrl', function ($scope, $http, searchConfig, $uibModal, $stateParams, $state, promises, queryParams, searchStorage) {
        var config = searchConfig.config;
        $scope.queryResult = '';
        $scope.showResults = false;
        $scope.queryParams = $stateParams;
        $scope.sortParams = config.sortParams;
        $scope.resultsPerPages = config.resultsPerPage;
        $scope.searchInList = config.searchIn;
        
        //Change current searchIn
        $scope.setSearchIn = function (val){
            $scope.searchIn = $scope.searchInList[findValue(val, $scope.searchInList)];
            $state.go(
                'search.simpleQuery', 
                { query: $scope.query, searchIn : $scope.searchIn.value }, 
                { reload : true }
            );
        };
        
        // Function to find smth
        $scope.find = function () {
            $scope.showResults = false;
            $stateParams = {};
            $state.go(
                'search.simpleQuery', 
                { query: $scope.query, limit : $scope.limit.value, sortBy : $scope.sortBy.value, searchIn : $scope.searchIn.value }, 
                { inherit : false, reload : true }
            );
        };
        
        //Action when sortBy changed
        $scope.sortChange = function () {
            $state.go(
                'search.simpleQuery', 
                { query: $scope.query, sortBy : $scope.sortBy.value }, 
                { reload : true }
            );
        };
        
        //Action when limit changed
        $scope.limitChange = function () {
            $state.go(
                'search.simpleQuery', 
                { query: $scope.query, limit : $scope.limit.value }, 
                { reload : false }
            );
        };

        //Pagination change page
        $scope.goToPage = function () {
            var offset = $scope.currentPage * $scope.limit.value - $scope.limit.value;
            $state.go(
                'search.simpleQuery', 
                { query: $scope.query, offset : offset }, 
                { inherit : true }
            );
        };
        
        //Set results data to controllers values
        function setCtrlData(publications) {
            $scope.sortBy = $scope.sortParams[findValue($scope.queryParams.sortBy, $scope.sortParams)];
            $scope.limit = $scope.resultsPerPages[findValue($scope.queryParams.limit, $scope.resultsPerPages)];
            $scope.query = $scope.queryParams.query;
            $scope.queryResult = publications.items;
            $scope.currentPage = publications.page;
            $scope.searchIn = $scope.searchInList[findValue($scope.queryParams.searchIn, $scope.searchInList)];
            $scope.resultsFrom = ($scope.currentPage * $scope.limit.value) - $scope.limit.value + 1;
            $scope.resultsCount = publications.count;
            $scope.resultsTo = setResultsTo($scope.currentPage, $scope.limit.value, $scope.resultsCount);
            $scope.pagesCount = Math.ceil($scope.resultsCount / $scope.limit.value);
            $scope.showResults = true;
            searchStorage.data = publications;
            searchStorage.params = $scope.queryParams;
        }
        
        //Find value in objects list (for limits and sortBy)
        function findValue(val, object) {
            for (var x in object) {
                if (object[x].value === val ) {
                    return x;
                }
            }
        };
        
        //Generate fount results "to" (RESULTS $from - $to )
        function setResultsTo(currentPage, pubPerPage, resultsCount) {
            var resultsTo = currentPage * pubPerPage;
            if (resultsTo > resultsCount){
                resultsTo = resultsCount;
            }
            return resultsTo;
        }

        function isEmptyObject(obj) {
            if (Object.keys(obj).length === 0) {
                return true;
            } else {
                return false;
            }
        }

        if (isEmptyObject($scope.queryParams) || $scope.queryParams.query === undefined) {
            $scope.queryParams = null;
            $scope.sortBy = $scope.sortParams[0];
            $scope.limit = $scope.resultsPerPages[0];
            $scope.searchIn = $scope.searchInList[0];
            if (!isEmptyObject(searchStorage.data) && !isEmptyObject(searchStorage.params)) {
                $scope.queryParams = searchStorage.params;
                setCtrlData(searchStorage.data);
            }
        } else {
            //Do when we have params in $stateParams - means that it is search action
            var queryUrl = queryParams.generateQueryParams(config.paths.simpleSearchPath, $scope.queryParams);
            $scope.searchIn = $scope.searchInList[findValue($scope.queryParams.searchIn, $scope.searchInList)];
            promises.getAsyncData('GET', queryUrl)
            .then(function (result) {
                var publications = result.data[$scope.searchIn.value];
                setCtrlData(publications);
            })
            .catch(function (err) {
                console.log('Error - cant get data!' + err);
            });
        };
        
        $scope.modal = function () {
            $state.go('search.advanced',searchStorage.params,{
                // prevent the events onStart and onSuccess from firing
                notify:false,
                // prevent reload of the current state
                reload:false, 
                // replace the last record when changing the params so you don't hit the back button and get old params
                location:'replace', 
                // inherit the current params on the url
                inherit:true
            });
        }
    });
};
