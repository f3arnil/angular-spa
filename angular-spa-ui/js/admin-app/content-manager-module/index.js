"use strict";

module.exports = function (angular) {

    var contentManager = angular.module('app.contentManager', []);

    contentManager.config(configCb);

    var cmCtrl = require('./cm-ctrl')(contentManager);
    var cmSrv = require('./cm-srv')(contentManager);
    var cmDir = require('./cm-dir')(contentManager);
    var recordsList = require('./recordsList')(contentManager)

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
