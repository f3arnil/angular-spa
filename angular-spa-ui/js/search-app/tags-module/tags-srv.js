"use strict";

module.exports = function(tagsCtrl, $http) {

    tagsCtrl.titlePage = 'Manage tags';

    getTagsRequest(tagsCtrl, $http);

    function getTagsRequest(tagsCtrl, $http) {
        $http
            .get('/service/tags')
            .success(function(data) {
                tagsCtrl.tags = data.data;
            });
    }
    
}
