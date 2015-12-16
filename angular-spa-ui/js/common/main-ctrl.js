"use strict";

module.exports = function ($scope, promises, getTemplate, configService, appStorage, appLocalStorage) {

    var config = configService.getConfig('appConfig'),
        paths = config.paths,
        userData = appLocalStorage.getItem('userData') || {};
    paths.userPath += GLOBAL_USER_ID;

    function initUserData(data) {
        userData['userId'] = data.data._id;
        userData['userName'] = data.data.name;
        userData['userEmail'] = data.data.email;
        userData['published'] = data.data.published;
        paths.rolePath += userData.userId;
        paths.tokenPath += userData.userId;
    };

    // found token & permissions in response
    function initRTData(data) {

        getToken(data);
        getPermissions(data);
        paths.validatePath += userData.userId + '/' + userData.userToken;

        function getToken(data) {
            var userTokenResponce = data.filter(function (responce) {
                if (responce.url === paths.tokenPath) {
                    return responce;
                }
            });

            if (userTokenResponce.length === 1) {
                userData['userToken'] = userTokenResponce[0].data.token
            } else {
                console.warn('Found too match userToken objects in responce');
            }

        };

        function getPermissions(data) {
            var permissionsObj = data.filter(function (obj) {
                if (obj.operation === 'get user permissions') {
                    return obj;
                }
            });

            if (permissionsObj.length === 1) {
                userData['userPermissions'] = permissionsObj[0].data;
            } else {
                console.warn('Found too match permissions objects in responce')
            }
        };

    };

    // what to do if validation is ok
    function afterValidationAction() {
        appStorage.data['userData'] = userData;
        appLocalStorage.setItem('userData', userData);

        var element = angular.element(document.getElementsByTagName('header'));
        getTemplate.getByTrustedUrl('/header.html', element, $scope)
            .then(
                function () {
                    element = angular.element(document.getElementsByTagName('footer'));
                    return getTemplate.getByTrustedUrl('/footer.html', element, $scope);
                })
            .catch(
                function (err) {
                    console.log(err);
                });
    };

    // full way of promices action
    function checkAllSteps() {
        userData = {};
        config = configService.getConfig('appConfig');
        paths = config.paths;
        paths.userPath += GLOBAL_USER_ID;

        promises.getAsyncData('GET', paths.userPath)
            .then(
                function (data) {
                    initUserData(data);
                    return promises.getAll('GET', [paths.rolePath, paths.tokenPath])
                })
            .then(
                function (data) {
                    initRTData(data);
                    return promises.getAsyncData('GET', paths.validatePath);
                })
            .then(
                function (data) {
                    if (data.status === 'ok' && data.data.result) {
                        afterValidationAction();
                    } else {
                        console.error('Validation of user data failed!');
                        var element = angular.element(document.querySelector('#content'));
                        $scope.err = {
                            code: '404',
                            data: 'PAGE NOT FOUND'
                        };
                        getTemplate.getByTrustedUrl('/error.html', element, $scope);

                    }

                })
            .catch(
                function (error) {
                    $scope.inited = false;
                    $scope.err = {
                        code: error.status,
                        data: error.data
                    };
                    var element = angular.element(document.querySelector('#content'));
                    getTemplate.getByTrustedUrl('/error.html', element, $scope);
                });
    };

    // return true if userData has all required fields
    function checkLocalStorageData(obj) {
        var require = ['published', 'userEmail', 'userName', 'userPermissions'];

        return require.every(function (req) {
            if (_.has(obj, req)) {
                return true;
            } else {
                return false;
            }
        });
    }

    if (_.has(userData, 'userId') && _.has(userData, 'userToken')) {
        paths.validatePath += userData.userId + '/' + userData.userToken;
        promises.getAsyncData('GET', paths.validatePath)
            .then(function (responce) {
                if (responce.status === 'ok' && responce.data.result && checkLocalStorageData(userData)) {
                    afterValidationAction();
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
