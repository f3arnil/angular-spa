"use strict";

module.exports = function (search) {

    search.controller('searchCtrl', function ($scope, $http, searchConfig, $uibModal, $stateParams, $state, promises, queryParams, searchStorage) {
        
        //Change current searchIn
        $scope.setSearchIn = function (val) {
            $scope.searchIn = $scope.searchInList[findValue(val, $scope.searchInList)];
            $scope.queryParams.searchIn = $scope.searchIn.value;
            if ($scope.hasQuery()){
                $state.go(
                    'search.simpleQuery',
                    $scope.queryParams,
                    {
                        reload : true
                    }
                );
            }
            
        };
        
        // Function to find smth
        $scope.find = function () {
            if ($scope.hasQuery()){
                $scope.queryParams.query = $scope.query;
                $scope.showResults = false;
                $state.go(
                    'search.simpleQuery',
                    $scope.queryParams,
                    {
                        inherit : true,
                        reload : true
                    }
                );
            }
            
        };
        
        //Action when sortBy changed
        $scope.sortChange = function () {
            $scope.queryParams.sortBy = $scope.sortBy.value;
            $state.go(
                'search.simpleQuery',
                $scope.queryParams,
                {
                    reload : true
                }
            );
        };
        
        //Action when limit changed
        $scope.limitChange = function () {
            $scope.queryParams.limit = $scope.limit.value;
            $state.go(
                'search.simpleQuery',
                $scope.queryParams,
                {
                    reload : true
                }
            );
        };

        //Pagination change page
        $scope.goToPage = function () {
            $scope.queryParams.offset = $scope.currentPage * $scope.limit.value - $scope.limit.value;
            $state.go(
                'search.simpleQuery',
                $scope.queryParams,
                {
                    inherit : true,
                    reload : true
                }
            );
        };
        
        // Check has model "query" data or not - if yes returns true, else false
        $scope.hasQuery = function () {
            if ($scope.query) {
                return true;
            }
            return false;
        };
        
        //Set results data to controllers values
        function setCtrlData(publications) {
            $scope.sortBy = $scope.sortParams[findValue($scope.queryParams.sortBy, $scope.sortParams)];
            $scope.limit = $scope.resultsPerPages[findValue($scope.queryParams.limit, $scope.resultsPerPages)];
            $scope.query = $scope.queryParams.query;
            $scope.queryResult = publications.items;
            $scope.currentPage = publications.page;
            $scope.resultsFrom = ($scope.currentPage * $scope.limit.value) - $scope.limit.value + 1;
            $scope.resultsCount = publications.count;
            $scope.resultsTo = setResultsTo($scope.currentPage, $scope.limit.value, $scope.resultsCount);
            $scope.pagesCount = Math.ceil($scope.resultsCount / $scope.limit.value);
            $scope.showResults = true;
            searchStorage.data = publications;
            searchStorage.params = $scope.queryParams;
        }
        
        //Find value in objects list (for limits and sortBy) and returns its id
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

        //if object has no keys return true, else false
        function isEmptyObject(obj) {
            if (Object.keys(obj).length === 0) {
                return true;
            }
            return false;
        }

        //If query params is empty set it to default
        function setDefaultParams() {
            var params = {};
            params.searchIn = $scope.searchInList[0].value;
            params.limit = $scope.resultsPerPages[0].value;
            params.sortBy = $scope.sortParams[0].value;
            params.offset = '0';
            params.orderBy = 'title';
            params.query = '';
            return params;
        };
        
        var config = searchConfig.config;
        $scope.queryResult = '';
        $scope.showResults = false;
        $scope.queryParams = $stateParams;
        $scope.sortParams = config.sortParams;
        $scope.resultsPerPages = config.resultsPerPage;
        $scope.searchInList = config.searchIn;
        
        if (isEmptyObject($scope.queryParams) || $scope.queryParams.query === undefined) {
            $scope.queryParams = setDefaultParams();
            $scope.searchIn = $scope.searchInList[findValue($scope.queryParams.searchIn, $scope.searchInList)];
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
                console.log($scope.queryParams);
                var publications = result.data[$scope.searchIn.value];
                setCtrlData(publications);
            })
            .catch(function (err) {
                console.log('Error - cant get data!' + err);
            });
        };
        
        $scope.modal = function () {
            $state.go('search.advanced');
        };
    });

};
