"use strict";

module.exports = function (app) {
    
    app.directive('recordsList', function () {
        return {
            restrict: "E",
            scope : {
                items : '=itemslist',
                header : '=headerSettings',
                itemsConfig : '=itemsSettings',
            },
            templateUrl : '/results.html',
            controller: function($scope, recodrsListConfig){
                $scope.header = recodrsListConfig.headerConfig;
                
                $scope.sortParams = recodrsListConfig.sortParams;
                $scope.sortBy = $scope.sortParams[0];
                
                $scope.resultsPerPages = recodrsListConfig.resultsPerPage;
                $scope.limit = $scope.resultsPerPages[0];
                
                $scope.goToPage = function () {
                    console.log('Lets go to page' + $scope.currentPage);
                    $scope.$emit('goToPage', $scope.currentPage);
                };
                
                $scope.sortChange = function () {
                    console.log('Set sort to ' + $scope.sortBy.value);
                    $scope.$emit('SetSortBy', $scope.sortBy.value);
                };
                
                $scope.limitChange = function () {
                    console.log('Set limit to ' + $scope.limit.value);
                    $scope.$emit('SetLimit', $scope.limit.value);
                };
                
            },
            link : function(scope, element, attrs) {
                
                //Find value in objects list (for limits and sortBy) and returns its id
                scope.findValueId = function (val, object) {
                    for (var x in object) {
                        if (object[x].value === val ) {
                            return x;
                        }
                    }
                };
                
                scope.setResultsTo = function (currentPage, pubPerPage, resultsCount) {
                    var resultsTo = currentPage * pubPerPage;
                    if (resultsTo > resultsCount){
                        resultsTo = resultsCount;
                    }
                    return resultsTo;
                }
                scope.setValues = function (data) {
                    scope.showResults = data.visibility;
                    scope.sortBy = scope.sortParams[scope.findValueId(data.params.sortBy.params.value, scope.sortParams)];
                    scope.limit = scope.resultsPerPages[scope.findValueId(data.params.resultsPerPage.params.value, scope.resultsPerPages)];
                    
                    scope.currentPage = data.page;
                    scope.resultsFrom = (scope.currentPage * scope.limit.value) - scope.limit.value + 1;
                    scope.resultsCount = data.params.resultsCount.params.count;
                    scope.resultsTo = scope.setResultsTo(scope.currentPage, scope.limit.value, scope.resultsCount);
                    scope.pagesCount = Math.ceil(scope.resultsCount / scope.limit.value);
                    
                }
                
                scope.$watchCollection('header', function(newValue, oldValue) {
                        console.log('changed!');
                        console.log(newValue,oldValue);
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