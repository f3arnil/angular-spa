'use strict';

module.exports = function(angular) {

    // Dependency module tags
    var configCb = require('./tags-cfg');
    var tagModule = angular.module('app.tags', []);
    var tagCtrl = require('./tags-ctrl');
    var tagListDirective = require('./tags-list-directive');

    // Implementation dependency of module Tags
    tagModule
        .controller('tagController', tagCtrl)
        .config(configCb);

    tagListDirective(tagModule);

};
