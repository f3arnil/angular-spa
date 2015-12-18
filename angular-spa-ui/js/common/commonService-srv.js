"use strict";

module.exports = function (appLocalStorage, getTemplate) {

    var initUserData = function (data, userData) {
        userData['userId'] = data.data._id;
        userData['userName'] = data.data.name;
        userData['userEmail'] = data.data.email;
        return userData;
    };

    var getToken = function (data, userData, tokenPath) {
        var userTokenResponce = data.filter(function (responce) {
            if (responce.url === tokenPath) {
                return responce;
            }
        });

        if (userTokenResponce.length === 1) {
            userData['userToken'] = userTokenResponce[0].data.token
        } else {
            console.warn('Found too match userToken objects in responce');
        }

        return userData;
    };

    var getPermissions = function (data, userData) {
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

        return userData;
    };

    var successValidationAction = function (userData, $scope) {

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

    // return true if userData has all required fields
    var checkLocalStorageUserData = function (obj) {
        var require = ['userEmail', 'userName', 'userPermissions'];

        return require.every(function (req) {
            if (_.has(obj, req)) {
                return true;
            } else {
                return false;
            }
        });
    };

    var userDataCheckError = function (err) {
        var element = angular.element(document.querySelector('#content'));
        getTemplate.getByTrustedUrl('/error.html', element, err);
    };

    return {
        initUserData: initUserData,
        getToken: getToken,
        getPermissions: getPermissions,
        successValidationAction: successValidationAction,
        checkLocalStorageUserData: checkLocalStorageUserData,
        userDataCheckError: userDataCheckError
    }
};
