"use strict";

module.exports = function (app) {
    
    app.controller('mainCtrl', function ($scope, promises, getTemplate, configService, appStorage, $localStorage) {
        
        var config = configService.getConfig('appConfig'),
            paths = config.paths,
            userData = config.userData;
        $scope.$storage = $localStorage.$default({});
        paths.userPath += GLOBAL_USER_ID;

        function initUserData(data) {
            userData.responsePromises.push(data);
            userData.userId = data.data._id;
            paths.rolePath += userData.userId;
            paths.tokenPath += userData.userId;
            $scope.$storage.userId = data.data._id;
        };

        function initRTData(data) {
            for (var x in data){
                userData.responsePromises.push(data[x]);
            }
            
            getToken(data);
            
            function getToken(data) {
                for (var x in data){
                    if (data[x].url && (data[x].url === paths.tokenPath)){
                        userData.userToken = data[x].data.token;
                        $scope.$storage.userToken = data[x].data.token;
                    }
                }
            }

            paths.validatePath += userData.userId + '/' + userData.userToken;
        };
        
        if ($scope.$storage.userId && $scope.$storage.userToken) {
            console.log($scope.$storage.userId,$scope.$storage.userToken);
        }
        promises.getAsyncData('GET', paths.userPath)
            .then(
                function (data) {
                    initUserData(data);
                    return promises.getAll('GET', [paths.rolePath, paths.tokenPath] )
                })
            .then(
                function (data) {
                    initRTData(data);
                    return promises.getAsyncData('GET', paths.validatePath);
                })
            .then(
                function (data) {
                    userData.userValidateResult = data.data.result;
                    appStorage.data['userData'] = userData;
                    var element = angular.element(document.getElementsByTagName('header'));
                    getTemplate.getByTrustedUrl('/header.html', element, $scope)
                    .then(
                        function () { console.log(userData)
                        element = angular.element(document.getElementsByTagName('footer'));
                        return getTemplate.getByTrustedUrl('/footer.html', element, $scope);
                    })
                    .catch(
                        function (err) {
                        console.log(err);
                    });
                })
            .catch(
                function (error) {
                    $scope.inited = false;
                    $scope.err = { code : error.status, data : error.data};
                    var element = angular.element(document.querySelector('#app'));
                    getTemplate.getByTrustedUrl('/error.html', element, $scope);
                    console.log('Error '+ error.status);
                });
    });
    
}
