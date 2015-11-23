"use strict";

module.exports = function(app) {

    app.config(function ($stateProvider) {
            $stateProvider
                .state('search.advanced', {
                    url: '/advanced',
                    views:{
                    "content": {
                        templateUrl: '/search.html',
                        controller : function($scope){
                            $scope.greeting = 'Hello world from search advanced!';
                        }
                    }
                }
            });
        });

}
