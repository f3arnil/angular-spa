"use strict";

module.exports = function (search) {

    search.controller('searchCtrl', function ($scope, searchConfig, $uibModal, $stateParams, $state, promises, queryParams, searchStorage, searchService) {
        
        $scope.goToDetails = function (data) {
            searchStorage.details = { type : $scope.searchIn.value, data : data };
            
            $state.go(
                    'search.details',
                    { id : data._id, type : $scope.searchIn.value, backUrl : location.hash },
                    {
                        inherit : true,
                        reload : true
                    }
                );
        };
        
        //Change current searchIn
        $scope.setSearchIn = function (val) {
            $scope.searchIn = $scope.searchInList[searchService.findValueId(val, $scope.searchInList)];
            $scope.queryParams.searchIn = $scope.searchIn.value;
            $scope.queryParams.offset = 0;
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
                        inherit : false,
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
            $scope.sortBy = $scope.sortParams[searchService.findValueId($scope.queryParams.sortBy, $scope.sortParams)];
            $scope.limit = $scope.resultsPerPages[searchService.findValueId($scope.queryParams.limit, $scope.resultsPerPages)];
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
            searchStorage.searchType = { type : 'simple' };
        }
        
        //Generate fount results "to" (RESULTS $from - $to )
        function setResultsTo(currentPage, pubPerPage, resultsCount) {
            var resultsTo = currentPage * pubPerPage;
            if (resultsTo > resultsCount){
                resultsTo = resultsCount;
            }
            return resultsTo;
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
        console.log($stateParams);
        $scope.queryParams = $stateParams;
        $scope.sortParams = config.sortParams;
        $scope.resultsPerPages = config.resultsPerPage;
        $scope.searchInList = config.searchIn;
        
        if (searchService.isEmptyObject($scope.queryParams) || $scope.queryParams.query === undefined) {
            $scope.queryParams = setDefaultParams();
            $scope.searchIn = $scope.searchInList[searchService.findValueId($scope.queryParams.searchIn, $scope.searchInList)];
            if (!searchService.isEmptyObject(searchStorage.data) && !searchService.isEmptyObject(searchStorage.params)) {
                $scope.queryParams = searchStorage.params;
                $scope.searchIn = $scope.searchInList[searchService.findValueId($scope.queryParams.searchIn, $scope.searchInList)];
                setCtrlData(searchStorage.data);
            }
        } else {
            //Do when we have params in $stateParams - means that it is search action
            var queryUrl = queryParams.generateQueryParams(config.paths.simpleSearchPath, $scope.queryParams);
            $scope.searchIn = $scope.searchInList[searchService.findValueId($scope.queryParams.searchIn, $scope.searchInList)];
            
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
    
    search.controller('searchDetailsCtrl', function($scope, searchConfig, searchStorage, $stateParams, $state, promises, searchService) {
        
        // Convert details data for ng-repeat
        function convertDetails(details) {
            var data = [];
            for (var x in details) {
                data.push({ title : x, value : details[x] })
            }
            return data;
        }
        
        // Return to result action
        $scope.back = function () {
            if (!searchService.isEmptyObject(searchStorage.data))
                history.back();
            else {
                //$state.go('search.simple');
                location.href = $stateParams.backUrl;
                
            }
        };
        
        // Capitalize field name
        $scope.capitalize = function (data) {
            return data[0].toUpperCase() + data.slice(1);
        };
        
        var config = searchConfig.config;
        if (!searchService.isEmptyObject(searchStorage.details)) {
            $scope.title = searchStorage.details.data.title;
            $scope.detailsData = convertDetails(searchStorage.details.data);
        } else {
            var path = $stateParams.type + 'Detail';
            var queryUrl = config.paths[path] + $stateParams.id;
            promises.getAsyncData('GET', queryUrl)
            .then(
                function (result) {
                    $scope.title = result.data.title;
                    $scope.detailsData = convertDetails(result.data);
                }
            )
            .catch(
                function (err) {
                    console.log('Error ' + err.status);
                }
            )
        }
    });
};
