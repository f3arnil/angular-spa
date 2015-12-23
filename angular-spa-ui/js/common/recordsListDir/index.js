"use strict";

module.exports = function (parentModule) {
    
    var recordsListDir = require('./recordsList-dir'),
        recordsListSrv = require('./recordsList-srv'),
        recordsListCtrl = require('./recordsList-ctrl');

    parentModule
        .constant('recordsListConfig', require('./recordsList-config'))
        .directive('recordsList', recordsListDir)
        .service('rlService', recordsListSrv)
};
