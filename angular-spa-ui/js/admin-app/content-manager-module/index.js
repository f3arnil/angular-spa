"use strict";

module.exports = function (angular) {

    var contentManager = angular.module('app.contentManager', []);


    var contentManagerCtrl = require('./contentManager-ctrl'),
        contentManagerEditCtrl = require('./contentManagerEdit-ctrl'),
        contentStorageSrv = require('./contentStorage-srv'),
        contentManagerSrv = require('./contentManager-srv');

    contentManager
        .constant('contentManagerConfig', require('./contentManager-config'))
        .controller('contentManagerCtrl', contentManagerCtrl)
        .controller('contentManagerEditCtrl', contentManagerEditCtrl)
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
                        controller: 'contentManagerCtrl'
                    }
                }
            })
            .state('editDetails', {
                url: '/content/:searchIn/edit/:id',
                views: {
                    "module-content": {
                        templateUrl: '/recordsDetails.html',
                        controller: 'contentManagerEditCtrl'
                    }
                }
            });
    };

};
