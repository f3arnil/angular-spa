"use strict";

module.exports = function (app) {

    app.directive('recordsList', function (rlService, recordsListConfig) {
        return {
            restrict: "E",
            scope: {
                items: '=itemslist',
                header: '=headerSettings',
                itemsConfig: '=itemsSettings',
            },
            templateUrl: '/results.html',
            controller: function ($scope) {
                // Set default params
                $scope.header = recordsListConfig.header;
                $scope.sortParams = recordsListConfig.sortParams;
                $scope.sortBy = $scope.sortParams[0];
                $scope.resultsPerPages = recordsListConfig.resultsPerPage;
                $scope.limit = $scope.resultsPerPages[0];

                // Records List actions
                $scope.goToPage = function () {
                    $scope.$emit('goToPage', $scope.currentPage);
                };

                $scope.sortChange = function () {
                    $scope.$emit('SetSortBy', $scope.sortBy.value);
                };

                $scope.limitChange = function () {
                    $scope.$emit('SetLimit', $scope.limit.value);
                };

            },
            link: function (scope, element, attrs) {

                //Find value in objects list (for limits and sortBy) and returns its id
                scope.findValueId = function (val, object) {
                    for (var x in object) {
                        if (object[x].value === val) {
                            return x;
                        }
                    }
                };

                scope.setResultsTo = function (currentPage, pubPerPage, resultsCount) {
                    var resultsTo = currentPage * pubPerPage;
                    if (resultsTo > resultsCount) {
                        resultsTo = resultsCount;
                    }
                    return resultsTo;
                }
                scope.setValues = function (data) {
                    scope.showResults = data.visibility;
                    var sortById = rlService.findValueId(data.params.sortBy.params.value, scope.sortParams);
                    if (sortById && data.params.sortBy.visibility) {
                        scope.sortBy = scope.sortParams[sortById];
                        scope.showSortBy = data.params.sortBy.visibility;
                    } else {
                        scope.showSortBy = sortById;
                    }
                    
                    var limitId = rlService.findValueId(data.params.resultsPerPage.params.value, scope.resultsPerPages);
                    console.log(limitId);
                    if (limitId && data.params.resultsPerPage.visibility) {
                        scope.limit = scope.resultsPerPages[limitId];
                        scope.showLimit = data.params.resultsPerPage.visibility;
                        console.log(scope.showLimit)
                    } else {
                        scope.showLimit = false;
                    }
                    
                    
                    scope.currentPage = data.page;
                    scope.resultsFrom = (scope.currentPage * scope.limit.value) - scope.limit.value + 1;
                    scope.resultsCount = data.params.resultsCount.params.count;
                    scope.resultsTo = scope.setResultsTo(scope.currentPage, scope.limit.value, scope.resultsCount);
                    scope.pagesCount = Math.ceil(scope.resultsCount / scope.limit.value);

                }

                scope.$watchCollection('header', function (newValue, oldValue) {
                    console.log('changed!');
                    console.log(newValue, oldValue);
                    scope.setValues(newValue);
                })

                scope.query = function () {
                    console.log(scope);
                    console.log(scope.header);
                    console.log(attrs);
                }

            }
        }
    });

}
