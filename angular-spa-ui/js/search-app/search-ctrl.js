"use strict";

module.exports = function(app) {
    
    app.controller('mainCtrl', function( $scope, promises, $q, getTemplate, appConfig) {

        var config = appConfig.config;
        var path = config.path;
        var methods = config.methods;
        var userData = config.userData;
        
        path.getUserPath = path.getUserPath + GLOBAL_USER_ID;
        
        function initUserData(data) {
            userData.responsePromises.push(data);
            userData.userId = data.data._id;
            path.getRolePath = path.getRolePath + userData.userId;
            path.getTokenPath = path.getTokenPath + userData.userId;
        };

        function initRTData(data) {
            for (var x in data){
                userData.responsePromises.push(data[x]);
            }
            
            getToken(data);

            function getToken(data) {
                for (var x in data){
                    if (data[x].url && (data[x].url === path.getTokenPath)){
                        userData.userToken = data[x].data.token;
                    }
                }
            }

            path.getValidatePath = path.getValidatePath + userData.userId + '/' + userData.userToken;
        };

        promises.getAsyncData(methods.getMethod, path.getUserPath)
            .then(
                function(data) {
                    initUserData(data);
                    return promises.getAll(methods.getMethod, [path.getRolePath, path.getTokenPath] )
                })
            .then(
                function(data) {
                    initRTData(data);
                    return promises.getAsyncData(methods.getMethod, path.getValidatePath);
                })
            .then(
                function(data) {
                    userData.userValidate = data.data.result;
                    var element = angular.element( document.querySelector( '#main' ) );
                    getTemplate.getByTrustedUrl('/main.html', element, $scope);
                    // all good
                })
            .catch(
                function(error){
                    $scope.inited = false;
                    $scope.err = { code : error.status, data : error.data};
                    var element = angular.element( document.querySelector( '#main' ) );
                    getTemplate.getByTrustedUrl('/error.html', element, $scope);
                    console.log('Error '+ error.status);
                    });
    });

}
