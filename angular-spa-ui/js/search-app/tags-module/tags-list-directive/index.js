'use strict';

module.exports = function(tagModule) {

    // Dependency of directive tags-list
    var tagsListDir = require('./tags-list-dir');
    var tagsListCtrl = require('./tags-list-ctrl');
    var tagsListSrv = require('./tags-list-srv');

    // Implementation dependency of module Tags
    tagModule
        .controller('tagsListController', tagsListCtrl)
        .service('tagsListService', tagsListSrv)
        .directive('tagsList', tagsListDir); // <tags-list/>

};
