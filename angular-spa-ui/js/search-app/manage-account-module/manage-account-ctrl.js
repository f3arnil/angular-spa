'use strict';

module.exports = function($scope, $state, accountService, appLocalStorage) {

    console.log(this);
    console.log(arguments);


    var _optionsAPI = {

        isShowForm: true,
        isHideForm: false,

        getUserNameParam: function(userData) {
            var splitData = userData.split(' ');
            splitData = _.without(splitData, '');

            if (splitData.length === 2) {
                model.userNameParam.firstName = splitData[0];
                model.userNameParam.lastName = splitData[1];
            } else {
                model.userNameParam.firstName = userData;
                model.userNameParam.lastName = '';
            }
        },

        getUserById: function(userId) {
            accountService.getUserById(userId)
                .then(
                    function(userData) {
                        _optionsAPI.updateUserData(userData.data);
                    },
                    function(errorMessage) {
                        this.errorMessage(errorMessage);
                    }
                );
        },

        updateUserData: function(userData) {
            // Prepare functionality for update localstorage...
        },

        updateUserName: function(userId, userName) {
            accountService.updateUserName(userId, userName)
                .then(
                    function(result) {
                        var userData = appLocalStorage.getItem('userData');
                        userData.userName = userName;
                        appLocalStorage.setItem('userData', userData);
                    },
                    function(errorMessage) {
                        this.errorMessage(errorMessage);
                    }
                );
        },

        updateUserEmail: function(userId, userEmail) {
            accountService.updateUserEmail(userId, userEmail)
                .then(
                    function(result) {
                        var userData = appLocalStorage.getItem('userData');
                        userData.userEmail = userEmail;
                        appLocalStorage.setItem('userData', userData);
                    },
                    function(errorMessage) {
                        this.errorMessage(errorMessage);
                    }
                );
        },

        errorMessage: function(errorMsg) {
            console.warn(errorMsg);
        }

    };

    var initialize = function() {
        console.log(this)

        $scope.model = model;
        $scope.viewAPI = viewAPI;
    };


    // The model of the current scope
    var model = {
        pageTitle: $state.current.data.pageTitle,
        userData: appLocalStorage.getItem('userData'),
        userNameParam: {
            firstName: '',
            lastName: ''
        },
        userEmailNew: '',
        isVisibilityFormUserName: true,
        isVisibilityFormUserEmail: true,
    };

    // Action on the view (Events)
    var viewAPI = {

        editUserName: function() {

console.log(this)
console.log($scope)

            _optionsAPI.getUserNameParam(model.userData.userName);
            return model.isVisibilityFormUserName = _optionsAPI.isHideForm;
        },
        btnCancelUserName: function() {
            return model.isVisibilityFormUserName = _optionsAPI.isShowForm;
        },
        btnSaveUserName: function() {
            if (!_.isEmpty(model.userNameParam.firstName) || !_.isEmpty(model.userNameParam.lastName)) {
                model.userData.userName = _.values(model.userNameParam).join(' ');
                _optionsAPI.updateUserName(model.userData.userId, model.userData.userName);
                this.btnCancelUserName();
            } else {
                _optionsAPI.errorMessage('is not allowed');
            }
        },

        editUserEmail: function() {
            model.userEmailNew = model.userData.userEmail;
            return model.isVisibilityFormUserEmail = _optionsAPI.isHideForm;
        },
        btnCancelUserEmail: function() {
            return model.isVisibilityFormUserEmail = _optionsAPI.isShowForm;
        },
        btnSaveUserEmail: function() {
            if (!_.isEmpty(model.userEmailNew)) {
                model.userData.userEmail = model.userEmailNew;
                _optionsAPI.updateUserEmail(model.userData.userId, model.userData.userEmail);
                this.btnCancelUserEmail();
            } else {
                _optionsAPI.errorMessage('is not allowed');
            }
        },

        resetPassword: function() {
            _optionsAPI.errorMessage('is not allowed');
        }

    };

    initialize();

};
