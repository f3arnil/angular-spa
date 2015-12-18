'use strict';

module.exports = function($http, $q) {

    return {

        updateUserName: function(id, userName) {
            var request = $http({
                method: 'PUT',
                url: '/user/' + id +'/update',
                data: {
                    name: userName
                }
            });
            return request.then(this.handleSuccess, this.handleError);
        },

        updateUserEmail: function(id, userEmail) {
            var request = $http({
                method: 'PUT',
                url: '/user/' + id +'/update',
                data: {
                    email: userEmail
                }
            });
            return request.then(this.handleSuccess, this.handleError);
        },

        getUserById: function(id) {
            var request = $http({
                method: 'GET',
                url: '/user/' + id
            });
            return request.then(this.handleSuccess, this.handleError);
        },

        handleError: function(response) {
            if ( !angular.isObject(response.data) || !response.data.message ) {
                return $q.reject('An unknown error occurred.');
            }
            return $q.reject(response.data.message);
        },

        handleSuccess: function(response) {
            return response.data;
        }

    };

};
