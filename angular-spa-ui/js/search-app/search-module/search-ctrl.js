"use strict";

module.exports = function (search) {

    search.controller('searchCtrl', function ($scope, $http, appConfig, $uibModal, $stateParams, $state, promises) {
        
        var config = appConfig.config;
        $scope.queryResult = '';
        $scope.showResults = false;
        $scope.queryParams = $stateParams;
        
        // will be in config file
        $scope.sortParams = [
            {name :'sort by A-Z', value :'ASC'},
            {name :'sort by Z-A', value : 'DESC'}
        ];
        $scope.resultsPerPages = [
            {name :'15 Results/page', value :'15'},
            {name :'20 Results/page', value : '20'},
            {name :'25 Results/page', value :'25'},
            {name :'30 Results/page', value : '30'}
        ];
        //
        
        // Function to find smth
        $scope.find = function () {
            $scope.showResults = false;
            $stateParams = {};
            $state.go(
                'search.simpleQuery', 
                { query: $scope.query, limit : $scope.resultCount.value, sortBy : $scope.sortBy.value }, 
                { inherit : false, reload : true }
            );
        };
        
        $scope.sortChange = function () {
            $state.go(
                'search.simpleQuery', 
                { query: $scope.query, sortBy : $scope.sortBy.value }, 
                { reload : true }
            );
        };
        
        $scope.resultsCountChange = function () {
            $state.go(
                'search.simpleQuery', 
                { query: $scope.query, limit : $scope.resultCount.value }, 
                { reload : true }
            );
        };

        $scope.goToPage = function () {
            console.log($scope.currentPage);
            var offset = $scope.currentPage * $scope.pubPerPage - $scope.pubPerPage;
            console.log(offset);
            $state.go(
                'search.simpleQuery', 
                { query: $scope.query, offset : offset }, 
                { inherit : false }
            );
        };
        
        function findValue(val, object) {
            for (var x in object) {
                if (object[x].value === val ) {
                    return x;
                }
            }
        };
                
        function setResultsTo(currentPage, pubPerPage, resultsCount) {
            var resultsTo = currentPage * pubPerPage;
            if (resultsTo > resultsCount){
                resultsTo = resultsCount;
            }
            return resultsTo;
        }

        var countParams = Object.keys($scope.queryParams).length;
        
        if (countParams === 0) {
            $scope.queryParams = null;
            $scope.sortBy = $scope.sortParams[0];
            $scope.resultCount = $scope.resultsPerPages[0];
        } else {
            var params = $scope.queryParams,
                queryUrl = '/service/search/?query='+params.query
                        +'&offset='+params.offset+'&limit='
                        +params.limit+'&sortBy='+params.sortBy+'&orderBy='+params.orderBy;
            
            $scope.sortBy = $scope.sortParams[findValue(params.sortBy, $scope.sortParams)];
            $scope.resultCount = $scope.resultsPerPages[findValue(params.limit, $scope.resultsPerPages)];
            $scope.query = params.query;
            promises.getAsyncData(config.methods.GET, queryUrl)
            .then(function (result) {
                var publications = result.data.publication;
                $scope.queryResult = publications.items;
                $scope.pubPerPage = publications.perPage;
                $scope.currentPage = publications.page;
                
                $scope.resultsFrom = ($scope.currentPage * $scope.pubPerPage) - $scope.pubPerPage + 1;
                $scope.resultsTo = setResultsTo($scope.currentPage, $scope.pubPerPage, $scope.resultCount);
                
                $scope.resultsCount = publications.count;
                $scope.pagesCount = Math.ceil($scope.resultsCount / $scope.pubPerPage);
                $scope.showResults = true;
            })
            .catch(function (err) {
                console.log('Error - cant get data!' + err);
            });
        };
        
        $scope.modal = function () {
            $state.go('search.advanced',params,{
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
