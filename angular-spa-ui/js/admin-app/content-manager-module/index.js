"use strict";

module.exports = function (angular) {

    var contentManager = angular.module('app.contentManager', []);


    var cmCtrl = require('./contentManager-ctrl'),
        contentStorageSrv = require('./contentStorage-srv'),
        contentManagerSrv = require('./contentManager-srv'),
        recordsList = require('./recordsListDir')(contentManager)

    contentManager
        .config(configCb)
        .constant('contentManagerConfig', require('./contentManager-config'))
        .controller('cmCtrl', cmCtrl)
        .service('contentStorage', contentStorageSrv)
        .service('cmService', contentManagerSrv);

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
            });
    };

};
