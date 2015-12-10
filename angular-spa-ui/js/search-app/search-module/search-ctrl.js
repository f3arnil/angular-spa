"use strict";

module.exports = function (search) {

    search.controller('searchCtrl', function ($scope, searchConfig, $uibModal, $stateParams, $state, promises, queryParams, searchStorage, searchService) {

        $scope.goToDetails = function (data) {
            searchStorage.details = {
                type: $scope.searchIn.value,
                data: data
            };

            $state.go(
                'search.details', {
                    id: data._id,
                    type: $scope.searchIn.value,
                    backUrl: location.hash
                }, {
                    inherit: true,
                    reload: true
                }
            );
        };


        $scope.setObjectQuery = function (source, dest) {
            var obj = searchStorage.objQuery.context[source];
            delete(searchStorage.objQuery.context[source]);
            searchStorage.objQuery.context[dest] = obj;
        }

        //Change current searchIn
        $scope.setSearchIn = function (val) {

            $scope.searchIn = $scope.searchInList[searchService.findValueId(val, $scope.searchInList)];
            $scope.setObjectQuery($scope.queryParams.searchIn, $scope.searchIn.value);
            $scope.queryParams.searchIn = $scope.searchIn.value;
            $scope.queryParams.offset = 0;

            if ($scope.hasQuery()) {
                $state.go(
                    searchStorage.searchState,
                    $scope.queryParams, {
                        reload: true
                    }
                );
            }

        };

        // Function to find smth
        $scope.find = function () {
            searchStorage.searchState = 'search.simpleQuery';
            searchStorage.searchType = 'GET';
            if ($scope.hasQuery()) {
                $scope.queryParams.query = $scope.query;
                $scope.showResults = false;
                $state.go(
                    searchStorage.searchState,
                    $scope.queryParams, {
                        inherit: false,
                        reload: true
                    }
                );
            }

        };

        //Action when sortBy changed
        $scope.sortChange = function () {
            if (!_.isEmpty(searchStorage.objQuery))
                searchStorage
                .objQuery
                .context[$scope.queryParams.searchIn]
                .sortingOrder = $scope.sortBy.value;

            $scope.queryParams.sortBy = $scope.sortBy.value;
            $state.go(
                searchStorage.searchState,
                $scope.queryParams, {
                    reload: true
                }
            );
        };

        //Action when limit changed
        $scope.limitChange = function () {
            if (!_.isEmpty(searchStorage.objQuery))
                searchStorage
                .objQuery
                .limits
                .limit = $scope.limit.value;

            $scope.queryParams.limit = $scope.limit.value;

            $state.go(
                searchStorage.searchState,
                $scope.queryParams, {
                    reload: true
                }
            );
        };

        //Pagination change page
        $scope.goToPage = function () {
            if (!_.isEmpty(searchStorage.objQuery))
                searchStorage.objQuery.limits.offset = $scope.currentPage * searchStorage.objQuery.limits.limit - searchStorage.objQuery.limits.limit;

            $scope.queryParams.offset = $scope.currentPage * $scope.limit.value - $scope.limit.value;

            $state.go(
                searchStorage.searchState,
                $scope.queryParams, {
                    inherit: true,
                    reload: true
                }
            );
        };

        // Check has model "query" data or not - if yes returns true, else false
        $scope.hasQuery = function () {
            if ($scope.query || !_.isEmpty(searchStorage.objQuery)) {
                return true;
            }
            return false;
        };

        //Set results data to controllers values
        $scope.setCtrlData = function (publications) {
            $scope.sortBy = $scope.sortParams[searchService.findValueId($scope.queryParams.sortBy, $scope.sortParams)];
            $scope.limit = $scope.resultsPerPages[searchService.findValueId($scope.queryParams.limit, $scope.resultsPerPages)];
            $scope.query = $scope.queryParams.query;
            $scope.queryResult = publications.items;
            $scope.currentPage = publications.page;
            $scope.resultsFrom = ($scope.currentPage * $scope.limit.value) - $scope.limit.value + 1;
            $scope.resultsCount = publications.count;
            $scope.resultsTo = $scope.setResultsTo($scope.currentPage, $scope.limit.value, $scope.resultsCount);
            $scope.pagesCount = Math.ceil($scope.resultsCount / $scope.limit.value);
            $scope.showResults = true;
            searchStorage.data = publications;
            searchStorage.params = $scope.queryParams;
        }

        //Generate fount results "to" (RESULTS $from - $to )
        $scope.setResultsTo = function (currentPage, pubPerPage, resultsCount) {
            var resultsTo = currentPage * pubPerPage;
            if (resultsTo > resultsCount) {
                resultsTo = resultsCount;
            }
            return resultsTo;
        }

        //If query params is empty set it to default
        $scope.setDefaultParams = function () {
            var params = {};
            params.searchIn = $scope.searchInList[0].value;
            params.limit = $scope.resultsPerPages[0].value;
            params.sortBy = $scope.sortParams[0].value;
            params.offset = '0';
            params.orderBy = 'title';
            params.query = '';
            params.objQuery = {};
            return params;
        };


        //searchStorage.searchState = 'search.simpleQuery';
        var config = searchConfig.config;
        $scope.queryResult = '';
        $scope.showResults = false;
        $scope.queryParams = $stateParams;
        $scope.sortParams = config.sortParams;
        $scope.resultsPerPages = config.resultsPerPage;
        $scope.searchInList = config.searchIn;

        if (searchService.isEmptyObject($scope.queryParams) || $scope.queryParams.query === undefined) {
            $scope.queryParams = $scope.setDefaultParams();
            $scope.searchIn = $scope.searchInList[searchService.findValueId($scope.queryParams.searchIn, $scope.searchInList)];
            if (!searchService.isEmptyObject(searchStorage.data) && !searchService.isEmptyObject(searchStorage.params)) {
                $scope.queryParams = searchStorage.params;
                $scope.searchIn = $scope.searchInList[searchService.findValueId($scope.queryParams.searchIn, $scope.searchInList)];
                $scope.setCtrlData(searchStorage.data);
            }
        } else {
            //Do when we have params in $stateParams - means that it is search action
            if (searchStorage.searchType === 'GET') {
                var queryUrl = queryParams
                    .generateQueryParams(
                        config.paths.simpleSearchPath,
                        $scope.queryParams
                    );
            } else {
                var queryUrl = config.paths.advancedSearchPath;
            }
            $scope.searchIn = $scope.searchInList[searchService.findValueId($scope.queryParams.searchIn, $scope.searchInList)];

            promises.getAsyncData(searchStorage.searchType, queryUrl, searchStorage.objQuery)
                .then(function (result) {
                    var publications = result.data[$scope.searchIn.value];
                    $scope.setCtrlData(publications);
                })
                .catch(function (err) {
                    console.log('Error - cant get data!' + err);
                });
        };

        $scope.modal = function () {
            $state.go('search.advanced', searchStorage.params, {
                // prevent the events onStart and onSuccess from firing
                notify: false,
                // prevent reload of the current state
                reload: true,
                // replace the last record when changing the params so you don't hit the back button and get old params
                location: 'replace',
                // inherit the current params on the url
                inherit: true
            });
        }
    });

    search.controller('searchDetailsCtrl', function ($scope, searchConfig, searchStorage, $stateParams, $state, promises, searchService) {

        var params = {};

        // Convert details data for ng-repeat
        function convertDetails(details) {
            var data = [];
            for (var x in details) {
                data.push({
                    title: x,
                    value: details[x]
                })
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
            promises.getAsyncData('GET', queryUrl, params)
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
