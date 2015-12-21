"use strict";

module.exports = function ($scope, configService, $uibModal, $stateParams, $state, promises, queryParams, searchStorage, searchService) {

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

    //Change current searchIn
    $scope.setSearchIn = function (val) {
        $scope.searchIn = $scope.searchInList[searchService.findValueId(val, $scope.searchInList)];
        $scope.queryParams.searchIn = $scope.searchIn.value;
        $scope.queryParams.offset = 0;
        if ($scope.hasQuery()) {
            $state.go(
                'search.simpleQuery',
                $scope.queryParams, {
                    reload: true
                }
            );
        }

    };

    // Function to find smth
    $scope.find = function () {
        if ($scope.hasQuery()) {
            $scope.queryParams.query = $scope.query;
            $scope.showResults = false;
            $state.go(
                'search.simpleQuery',
                $scope.queryParams, {
                    inherit: false,
                    reload: true
                }
            );
        }

    };

    //Action when sortBy changed
    $scope.sortChange = function () {
        $scope.queryParams.sortBy = $scope.sortBy.value;
        $state.go(
            'search.simpleQuery',
            $scope.queryParams, {
                reload: true
            }
        );
    };

    //Action when limit changed
    $scope.limitChange = function () {
        $scope.queryParams.limit = $scope.limit.value;
        $state.go(
            'search.simpleQuery',
            $scope.queryParams, {
                reload: true
            }
        );
    };

    //Pagination change page
    $scope.goToPage = function () {
        $scope.queryParams.offset = $scope.currentPage * $scope.limit.value - $scope.limit.value;
        $state.go(
            'search.simpleQuery',
            $scope.queryParams, {
                inherit: true,
                reload: true
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

    var vm = this;

    var privateApi = {
        setDefaultParams: function () {
            var params = {};
            params.searchIn = vm.model.searchInList[0].value;
            params.limit = vm.model.resultsPerPages[0].value;
            params.sortBy = vm.model.sortParams[0].value;
            params.offset = '0';
            params.orderBy = 'title';
            params.query = '';
            return params;
        },
        setResultsTo: function (currentPage, pubPerPage, resultsCount) {
            var resultsTo = currentPage * pubPerPage;
            if (resultsTo > resultsCount) {
                resultsTo = resultsCount;
            }
            return resultsTo;
        },
        setCtrlData: function setCtrlData(publications) {
            vm.model.sortBy = vm.model.sortParams[searchService.findValueId(vm.model.queryParams.sortBy, vm.model.sortParams)];
            vm.model.limit = vm.model.resultsPerPages[searchService.findValueId(vm.model.queryParams.limit, vm.model.resultsPerPages)];
            vm.model.query = vm.model.queryParams.query;
            vm.model.queryResult = publications.items;
            vm.model.currentPage = publications.page;
            vm.model.resultsFrom = (vm.model.currentPage * vm.model.limit.value) - vm.model.limit.value + 1;
            vm.model.resultsCount = publications.count;
            $scope.resultsTo = privateApi.setResultsTo(vm.model.currentPage, vm.model.limit.value, vm.model.resultsCount);
            vm.model.pagesCount = Math.ceil(vm.model.resultsCount / vm.model.limit.value);
            vm.model.showResults = true;
            searchStorage.data = publications;
            searchStorage.params = vm.model.queryParams;
            searchStorage.searchType = {
                type: 'simple'
            };
        }
    };

    vm.viewApi = {
        goToDetails: function (data) {
            searchStorage.details = {
                type: vm.model.searchIn.value,
                data: data
            };

            $state.go(
                'search.details', {
                    id: data._id,
                    type: vm.model.searchIn.value,
                    backUrl: location.hash
                }, {
                    inherit: true,
                    reload: true
                }
            );
        },
        setSearchIn: function (val) {
            vm.model.searchIn = vm.model.searchInList[searchService.findValueId(val, vm.model.searchInList)];
            vm.model.queryParams.searchIn = vm.model.searchIn.value;
            vm.model.queryParams.offset = 0;
            if (vm.viewApi.hasQuery()) {
                $state.go(
                    'search.simpleQuery',
                    vm.model.queryParams, {
                        reload: true
                    }
                );
            }

        },
        find: function () {
            if (vm.viewApi.hasQuery()) {
                vm.model.queryParams.query = vm.model.query;
                vm.model.showResults = false;
                $state.go(
                    'search.simpleQuery',
                    vm.model.queryParams, {
                        inherit: false,
                        reload: true
                    }
                );
            }

        },
        sortChange: function () {
            vm.model.queryParams.sortBy = vm.model.sortBy.value;
            $state.go(
                'search.simpleQuery',
                vm.model.queryParams, {
                    reload: true
                }
            );
        },
        limitChange: function () {
            vm.model.queryParams.limit = vm.model.limit.value;
            $state.go(
                'search.simpleQuery',
                vm.model.queryParams, {
                    reload: true
                }
            );
        },
        goToPage: function () {
            vm.model.queryParams.offset = vm.model.currentPage * vm.model.limit.value - vm.model.limit.value;
            $state.go(
                'search.simpleQuery',
                vm.model.queryParams, {
                    inherit: true,
                    reload: true
                }
            );
        },
        hasQuery: function () {
            if (vm.model.query) {
                return true;
            }
            return false;
        }
    };

    //Set results data to controllers values
//    function setCtrlData(publications) {
//        $scope.sortBy = $scope.sortParams[searchService.findValueId($scope.queryParams.sortBy, $scope.sortParams)];
//        $scope.limit = $scope.resultsPerPages[searchService.findValueId($scope.queryParams.limit, $scope.resultsPerPages)];
//        $scope.query = $scope.queryParams.query;
//        $scope.queryResult = publications.items;
//        $scope.currentPage = publications.page;
//        $scope.resultsFrom = ($scope.currentPage * $scope.limit.value) - $scope.limit.value + 1;
//        $scope.resultsCount = publications.count;
//        $scope.resultsTo = setResultsTo($scope.currentPage, $scope.limit.value, $scope.resultsCount);
//        $scope.pagesCount = Math.ceil($scope.resultsCount / $scope.limit.value);
//        $scope.showResults = true;
//        searchStorage.data = publications;
//        searchStorage.params = $scope.queryParams;
//        searchStorage.searchType = {
//            type: 'simple'
//        };
//    }
//
//    //Generate fount results "to" (RESULTS $from - $to )
//    function setResultsTo(currentPage, pubPerPage, resultsCount) {
//        var resultsTo = currentPage * pubPerPage;
//        if (resultsTo > resultsCount) {
//            resultsTo = resultsCount;
//        }
//        return resultsTo;
//    }
//
//    //If query params is empty set it to default
//    function setDefaultParams() {
//        var params = {};
//        params.searchIn = $scope.searchInList[0].value;
//        params.limit = $scope.resultsPerPages[0].value;
//        params.sortBy = $scope.sortParams[0].value;
//        params.offset = '0';
//        params.orderBy = 'title';
//        params.query = '';
//        return params;
//    };

    var config = configService.getConfig('searchConfig');

    vm.model = {
        queryResult: '',
        showResults: false,
        queryParams: $stateParams,
        sortParams: config.sortParams,
        resultsPerPages: config.resultsPerPage,
        searchInList: config.searchIn
    }


//    $scope.queryResult = '';
//    $scope.showResults = false;
//    $scope.queryParams = $stateParams;
//    $scope.sortParams = config.sortParams;
//    $scope.resultsPerPages = config.resultsPerPage;
//    $scope.searchInList = config.searchIn;

    if (searchService.isEmptyObject(vm.model.queryParams) || vm.model.queryParams.query === undefined) {
        vm.model.queryParams = privateApi.setDefaultParams();
        vm.model.searchIn = vm.model.searchInList[searchService.findValueId(vm.model.queryParams.searchIn, vm.model.searchInList)];
        if (!searchService.isEmptyObject(searchStorage.data) && !searchService.isEmptyObject(searchStorage.params)) {

            vm.model.queryParams = searchStorage.params;
            vm.model.searchIn = vm.model.searchInList[searchService.findValueId(vm.model.queryParams.searchIn, vm.model.searchInList)];
            privateApi.setCtrlData(searchStorage.data);
        }
    } else {
        //Do when we have params in $stateParams - means that it is search action
        var queryUrl = queryParams.generateQueryParams(config.paths.simpleSearchPath, vm.model.queryParams);
        vm.model.searchIn = vm.model.searchInList[searchService.findValueId(vm.model.queryParams.searchIn, vm.model.searchInList)];

        promises.getAsyncData('GET', queryUrl)
            .then(function (result) {
                var publications = result.data[vm.model.searchIn.value];
                //setCtrlData(publications);
                privateApi.setCtrlData(publications);
                console.log(vm.model);
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
            reload: false,
            // replace the last record when changing the params so you don't hit the back button and get old params
            location: 'replace',
            // inherit the current params on the url
            inherit: true
        });
    }
};
