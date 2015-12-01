"use strict";

module.exports = function(angular) {

    // Dependency
    var configCb = require('./tags-cfg');
    var tagModule = angular.module('app.tags', []);
    var tagCtrl = require('./tags-ctrl');
    var createTagCtrl = require('./create-tag-ctrl');
    var tagsListCtrl = require('./tags-list-ctrl');
    var tagSrv = require('./tags-srv');
    var tagsListDir = require('./tags-list-dir');
    var createTagDir = require('./create-tag-dir');

    // Implementation dependency of module Tags
    tagModule
        .controller('tagController', tagCtrl)
        .controller('createTagContrller', createTagCtrl)
        .controller('tagsListContrller', tagsListCtrl)
        .service('tagService', tagSrv)
        .directive('tagsList', tagsListDir)
        .directive('createTag', createTagDir);

    configCb(tagModule);

};
