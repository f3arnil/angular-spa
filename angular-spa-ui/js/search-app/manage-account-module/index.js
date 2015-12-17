'use strict';

module.exports = function(angular) {

    // Dependency module tags
    var configCb = require('./manage-account-cfg');
    var accountModule = angular.module('app.account', []);
    var accountCtrl = require('./manage-account-ctrl');
    var accountSrv = require('./manage-account-srv');

    // Implementation dependency of module Tags
    accountModule
        .controller('accountController', accountCtrl)
        .service('accountService', accountSrv)
        .config(configCb);

};
