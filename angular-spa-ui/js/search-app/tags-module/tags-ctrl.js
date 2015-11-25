"use strict";

module.exports = function(tags) {

    //tags.controller('tagsCtrl');
    tags.controller('titlePage');

    function titlePage($scope, getTitlePage) {
        $scope.titlePage = getTitlePage.titlePage();
    }

    function tagsCtrl($http, getTagsRequest){
        getTagsRequest.testFunc();
    }




    // var tagsCtrl = $scope;

    // tagsCtrl.titlePage = GetTitleService.getText();

    // tagsCtrl.titlePage = 'Manage tags';

};
