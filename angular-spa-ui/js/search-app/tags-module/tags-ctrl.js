"use strict";

module.exports = function($scope, $http) {

    var tagsCtrl = $scope;

    tagsCtrl.titlePage = 'Manage tags';

    $http
        .get('/service/tags')
        .success(function(data) {
            tagsCtrl.tags = data.data;
        });

};
