"use strict";

module.exports = function (angular) {

    var contentManager = angular.module('app.contentManager', []);


    var cmCtrl = require('./contentManager-ctrl'),
        contentStorageSrv = require('./contentStorage-srv'),
        contentManagerSrv = require('./contentManager-srv');
    var testCtrl = require('./TestCtrl');

    contentManager
        .constant('contentManagerConfig', require('./contentManager-config'))
        .controller('cmCtrl', cmCtrl)
        .controller('TestCtrl', testCtrl)
        .service('contentStorage', contentStorageSrv)
        .service('cmService', contentManagerSrv)
        .config(configCb);

    function configCb($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('content', {
                url: '/content/:searchIn/?limit&sortBy&offset',
                params: {
                    limit: {
                        squash: true,
                        value: '15'
                    },
                    sortBy: {
                        squash: true,
                        value: 'ASC'
                    },
                    offset: {
                        squash: true,
                        value: '0'
                    }
                },
                views: {
                    "module-content": {
                        templateUrl: '/admin.html',
                        controller: 'cmCtrl'
                    }
                }
            })
            .state('test', {
                url: '/test',
                views: {
                    "module-content": {
                        template: 'This is test url! {{test.content}} {{test.model.qwerty}}<div ng-click="test.privateApi.tttt(\'Our console log or alert text\')">Click here for this function</div><div ng-click="aaaa(\'Our console log or alert text\')">Click here for scope function</div>',
                        controller: 'TestCtrl',
                        controllerAs: 'test'
                    }
                }
            });
    };

};
