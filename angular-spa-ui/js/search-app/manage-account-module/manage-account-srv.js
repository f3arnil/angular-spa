'use strict';

module.exports = function($http, $q) {

    // // Service get user by id (GET request)
    // function getUserById(id) {
    //     var request = $http({
    //         method: 'GET',
    //         url: '/user/' + id
    //     });
    //     return request.then(handleSuccess, handleError);
    // };


    // // Request ERROR
    // function handleError(response) {
    //     if ( !angular.isObject(response.data) || !response.data.message ) {
    //         return $q.reject('An unknown error occurred.');
    //     }
    //     return $q.reject(response.data.message);
    // }

    // // Request Success
    // function handleSuccess(response) {
    //     return response.data;
    // }


    return {

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




/*

    // Returns user by unique identifier
    app.get('/user/:id', getUserRequest);

    // Returns a list of users
    app.get('/users', getUsersRequest);

    // Creates a new user
    app.put('/user/create', createUserRequest);

    // Updating existing user
    app.put('/user/:id/update', updateUserRequest);

    // Deleting existing user
    app.delete('/user/:id/delete', deleteUserRequest);

    // That is a JUNK function for training JS Promices
    app.get('/user-token/:id', getUserTokenRequest);

    // That is a JUNK function for training JS Promices
    app.get('/user-validate/:id/:token', validateUserTokenRequest);


*/
