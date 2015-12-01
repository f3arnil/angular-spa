"use strict";

module.exports = function(angular) {

    // Dependency
    var configCb = require('./tags-cfg');
    var tagModule = angular.module('app.tags', []);
    var tagCtrl = require('./tags-ctrl');
    var createTagCtrl = require('./create-tag-ctrl');
    var editTagCtrl = require('./edit-tag-ctrl');
    var tagsListCtrl = require('./tags-list-ctrl');
    var tagSrv = require('./tags-srv');
    var tagsListDir = require('./tags-list-dir');
    var createTagDir = require('./create-tag-dir');
    var editTagDir = require('./edit-tag-dir');

    // Implementation dependency of module Tags
    tagModule.controller('tagController', tagCtrl);
    tagModule.controller('createTagContrller', createTagCtrl);
    tagModule.controller('tagsListContrller', tagsListCtrl);
    tagModule.service('tagService', tagSrv);
    tagModule.directive('tagsList', tagsListDir); // use <tags-list/>

    // Prepared by the functional
    tagModule.directive('createTag', createTagDir); // use <create-tag/>
    tagModule.directive('editTag', editTagDir); // use <tag-edit/>

    configCb(tagModule);

};
