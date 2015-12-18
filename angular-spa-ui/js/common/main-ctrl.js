"use strict";

module.exports = function ($scope, promises, configService, appLocalStorage, commonService, getTemplate, $q) {
    var config = configService.getConfig('appConfig'),
        paths = config.paths,
        userData = appLocalStorage.getItem('userData') || {};

    paths.userPath += GLOBAL_USER_ID;

    // full way of promices action
    function checkAllSteps() {
        userData = {};
        config = configService.getConfig('appConfig');
        paths = config.paths;
        paths.userPath += GLOBAL_USER_ID;

        promises.getAsyncData('GET', paths.userPath)
            .then(
                function (data) {
                    if (data.status === 'error') {
                        return $q.reject({
                            status: data.error.name,
                            data: data.error.message
                        });
                    }
                    userData = commonService.initUserData(data, userData);
                    paths.rolePath += userData.userId;
                    paths.tokenPath += userData.userId;
                    return promises.getAll('GET', [paths.rolePath, paths.tokenPath])
                })
            .then(
                function (data) {
                    userData = commonService.getToken(data, userData, paths.tokenPath);
                    userData = commonService.getPermissions(data, userData);
                    paths.validatePath += userData.userId + '/' + userData.userToken;
                    return promises.getAsyncData('GET', paths.validatePath);
                })
            .then(
                function (data) {
                    if (data.status === 'ok' && data.data.result) {
                        commonService.successValidationAction(userData, $scope);
                    } else {
                        console.error('Validation of user data failed!');
                        var errorObj = $scope.$new(true);
                        errorObj.err = {
                            code: 'Validation Error',
                            data: 'Validation of user data failed!'
                        };
                        commonService.userDataCheckError(errorObj);
                    }

                })
            .catch(
                function (error) {
                    $scope.inited = false;
                    var errorObj = $scope.$new(true);
                    errorObj.err = {
                        code: error.status,
                        data: error.data
                    };
                    commonService.userDataCheckError(errorObj);
                });
    };

    if (_.has(userData, 'userId') && _.has(userData, 'userToken')) {
        paths.validatePath += userData.userId + '/' + userData.userToken;
        promises.getAsyncData('GET', paths.validatePath)
            .then(function (responce) {
                if (responce.status === 'ok' && responce.data.result && commonService.checkLocalStorageUserData(userData)) {
                    commonService.successValidationAction(userData, $scope);
                } else {
                    checkAllSteps();
                }
            })
            .catch(function (err) {
                checkAllSteps();
            })
    } else {
        checkAllSteps();
    }


};
