"use strict";

module.exports = function(ngModule){

    ngModule.factory('Promises', function($q, $http){

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
    
    ngModule.factory('getTemplate', function($sce, $compile, $templateRequest){
        function getByTrustedUrl(url, element, scope) {
            var templateUrl = $sce.getTrustedResourceUrl(url);
            $templateRequest(templateUrl)
                .then(
                    function(template) {
                        $compile(element.html(template).contents())(scope);
                    },
                    function() {
                        console.log('Can not get template!');
                    }
                )
        };

        return {
            getByTrustedUrl : getByTrustedUrl
        }

    });
        
    ngModule.controller('mainCtrl', function( $scope, Promises, $q, getTemplate, $compile) {

        var responsePromises    = new Array(),
            getMethod           = 'GET',
            postMethod          = 'POST',
            putMethod           = 'PUT',
            putMethod           = 'DELETE',
            getUserPath         = '/user/' + GLOBAL_USER_ID,
            getRolePath         = '/role/',
            getTokenPath        = '/user-token/',
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
                    var element = angular.element( document.querySelector( '#app' ) );
                    getTemplate.getByTrustedUrl('/main.html', element, $scope);
                    // all good
                })
            .catch(
                function(error){
                    $scope.inited = false;
                    $scope.err = { code : error.status, data : error.data};
                    var element = angular.element( document.querySelector( '#app' ) );
                    getTemplate.getByTrustedUrl('/error.html', element, $scope);
                    console.log('Error '+ error.status);
                    });
    });
 
};
 