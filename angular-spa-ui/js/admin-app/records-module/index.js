"use strict";

module.exports = function (angular) {
        
    var records = angular.module('app.records', []);
    
    records.config(configCb);
    
    function configCb($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('records', {
                abstract: true,
                url: '/records',
                views:{
                    "module-content": {
                        template: '<div ui-view="content"></div>'
                    }
                }
            })
            .state('records.publications', {
                url: '/publications',
                views:{
                    "content": {
                        template: '<p>Hello from publications list',
                        controller : function () {
                            console.log('Rec publications');
                        }
                    }
                }
            })
            .state('records.articles', {
                url: '/articles',
                views:{
                    "content": {
                        template: '<p>Hello from articles list',
                        controller : function () {
                            console.log('Rec articles');
                        }
                    }
                }
            });
    };

};
