"use strict";

module.exports = function (angular) {

    var contentManager = angular.module('app.contentManager', []);


    var cmCtrl = require('./contentManager-ctrl');
    var contentStorageSrv = require('./contentStorage-srv');
    var contentManagerSrv = require('./contentManager-srv');


    contentManager
        .constant('contentManagerConfig', require('./contentManager-config'))
        .controller('cmCtrl', cmCtrl)
        .service('contentStorage', contentStorageSrv)
        .service('cmService', contentManagerSrv)
        .config(configCb);

    function configCb($stateProvider, $urlRouterProvider) {
        console.log('recordsListConfig');
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
            });
    };

};
