"use strict";

module.exports = function(angular) {

    // Dependency module tags
    var configCb = require('./tags-cfg');
    var tagModule = angular.module('app.tags', []);
    var tagCtrl = require('./tags-ctrl');
    var tagSrv = require('./tags-srv');
    //var tagFact = require('./tags-fact');

    // Additional controllers
    var listTagsCtrl = require('./list-tags-ctrl');
    var createTagCtrl = require('./create-tag-ctrl');
    var editTagCtrl = require('./edit-tag-ctrl');

    // Additional directives
    var listTagsDir = require('./list-tags-dir');
    var createTagDir = require('./create-tag-dir');
    var editTagDir = require('./edit-tag-dir');

    // Implementation dependency of module Tags
    // Initialize code
    tagModule.service('tagService', tagSrv);
    //tagModule.factory('getTagAttrFactory', tagFact);

    tagModule.controller('tagController', tagCtrl);
    tagModule.controller('listTagsContrller', listTagsCtrl);
    tagModule.controller('createTagContrller', createTagCtrl);
    tagModule.controller('editTagContrller', editTagCtrl);
    tagModule.directive('listTags', listTagsDir); // use <list-tags/>

    // Prepared by the functional
    tagModule.directive('createTag', createTagDir); // use <create-tag/>
    tagModule.directive('editTag', editTagDir); // use <edit-tag/>

    configCb(tagModule);

};
