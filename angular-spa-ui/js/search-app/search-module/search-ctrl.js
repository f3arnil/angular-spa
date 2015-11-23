"use strict";

module.exports = function(app) {
    
    app.controller('searchCtrl', function($scope, $http, appConfig) {
        $scope.greeting = 'Hello world from search simple!';
    });

}