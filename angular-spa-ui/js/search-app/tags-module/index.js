"use strict";

module.exports = function (angular) {

    // Dependency
    var configCb = require('./tags-cfg');
    var tagModule = angular.module('app.tags', []);
    var tCtrl = require('./tags-ctrl');
    var tSrv = require('./tags-srv');
    var tDir = require('./tags-dir');

    // Implement
    tagModule
        .controller('mainTagCtrl', tCtrl)
        .service('resultTagPageSrv', tSrv)
        .directive('tagItem', tDir);

    configCb(tagModule);

};
