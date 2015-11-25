"use strict";

module.exports = function($scope, $http) {

    var tagsSrv = require('./tags-srv');

    var tagsCtrl = $scope;

    tagsSrv(tagsCtrl, $http);

};
