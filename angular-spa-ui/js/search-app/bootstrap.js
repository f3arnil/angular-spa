"use strict";

module.exports = function(application, angular){

    var cartModule = require('./cart-module')(angular);
    var searchModule = require('./search-module')(angular);
    var tagsModule = require('./tags-module')(angular);
    
    application.factory('Promises', function($q, $http){

        function getAsyncData(method, url) {
            var deferred = $q.defer();
            
            $http({ method: method, url: url })
                .success(function(data){
                    data.url = url;
                    deferred.resolve(data);
                })
                .error(function(data,status){
                    deferred.reject({ data : data, status : status });
                });

            return deferred.promise;
        };

        function getALL(method) {
            var promiseList = new Array();  
            for ( var i=1; i<arguments.length; i++ ) {
                promiseList.push(getAsyncData(method, arguments[i]))
            }

            var deferred = $q.defer();
            $q.all(promiseList)
                .then(
                    function(values) {
                        deferred.resolve(values)
                    },
                    function(values) {
                        deferred.reject(values);
                    }
                );
            
            return deferred.promise;
        };

        return {
            getAsyncData: getAsyncData,
            getAll : getALL
        };
    });
    
    application.factory('getTemplate', function($sce, $compile, $templateRequest){
        
        function getByTrustedUrl(url, element, scope) {
            var templateUrl = $sce.getTrustedResourceUrl(url);
            $templateRequest(templateUrl)
                .then(
                    function(template) {
                        // template is the HTML template as a string
                        // Let's put it into an HTML element and parse any directives and expressions
                        // in the code. (Note: This is just an example, modifying the DOM from within
                        // a controller is considered bad style.)
                        //return template;
                        $compile(element.html(template).contents())(scope);
                    }, 
                    function() {
                        // An error has occurred
                        console.log('Can not get template!');
                    }
                )
        };
        
        return {
            getByTrustedUrl : getByTrustedUrl
        }
    });
//    application.controller('errorCtrl', function($scope, $rootScope){
//        $scope.err = { code : '404', data : 'Oops.. problems!'};
//        console.log($scope.err);
//    });
    
    application.controller('mainCtrl', function( $scope, Promises, $q, getTemplate, $compile) {

        var responsePromises    = new Array(),
            getMethod           = 'GET',
            postMethod          = 'POST',
            putMethod           = 'PUT',
            putMethod           = 'DELETE',
            getUserPath         = '/user/' + GLOBAL_USER_ID,
            getRolePath         = '/role/',
            getTokenPath        = '/user-token1/',
            getValidatePath     = '/user-validate/',
            userId,
            userToken,
            userValidate;

        function initUserData(data) {
            console.log(data);
            responsePromises.push(data);
            userId = data.data._id;
            console.log(userId);
            getRolePath = getRolePath + userId;
            getTokenPath = getTokenPath + userId;
        };

        function initRTData(data) {
            for (var i=0; i< data.length; i++){
                responsePromises.push(data[i]);
            }
            getToken(data);

            function getToken(data) {
                for (var i=0; i<data.length; i++){
                    if (data[i].url && (data[i].url === getTokenPath)){
                        userToken = data[i].data.token;
                    }
                }
            }

            getValidatePath = getValidatePath + userId + '/' + userToken;
            console.log(data);
            console.log(userToken);
        };

        Promises.getAsyncData(getMethod, getUserPath)
            .then(
                function(data) {
                    initUserData(data);
                    return Promises.getAll(getMethod, getRolePath, getTokenPath )
                })
            .then(
                function(data) {
                    initRTData(data);
                    return Promises.getAsyncData(getMethod, getValidatePath);
                })
            .then(
                function(data) {
                    console.log(data);
                    userValidate = data.data.result;
                    console.log(userValidate);
                    $scope.inited = userValidate;
                    // all good
                })
            .catch(
                function(error){
                    $scope.inited = false;
                    $scope.err = { code : error.status, data : error.data};
                    var element = angular.element( document.querySelector( '#app' ) );
                    getTemplate.getByTrustedUrl('/error.html', element, $scope);
                    //$compile(element.html(template).contents())($scope);
                    //console.log('Error '+ error.status + ' with message ' + error.data);
                    //return $q.reject(data,status);
                    });
    });
    
    return application;

};
