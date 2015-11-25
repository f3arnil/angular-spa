"use strict";

module.exports = function (angular) {

    var configCb = require('./tags-cfg');

    var tags = angular.module('app.tags', []);

    var tagsCtrl = require('./tags-ctrl')(tags);
    var tagsSrv = require('./tags-srv')(tags);
    var tagsDirs = require('./tags-dir')(tags);

    configCb(tags);

};
