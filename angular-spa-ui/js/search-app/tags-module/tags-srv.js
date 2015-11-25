"use strict";

module.exports = function(tags) {

    tags.service(getTagsRequest);


    function getTitlePage(title) {
        return {
            titlePage: function () {
                console.log('Hello2');
            }
            //'Manage tags'
        }
    }


    function getTagsRequest($http) {
        return {
            testFunc: function () {
                console.log('Hello');
            }
        }
    }

/*
    function getTagsRequest($http) {
        return {
            testFunc : function () {
                console.log('Hello');
            }
        }

        // $http
        //     .get('/service/tags')
        //     .success(function(data) {
        //         tagsCtrl.tags = data.data;
        //     });
    }
*/


   // function getTagsRequest(tagsCtrl, $http) {
    //     $http
    //         .get('/service/tags')
    //         .success(function(data) {
    //             tagsCtrl.tags = data.data;
    //         });
    // }



    // tagsCtrl.titlePage = 'Manage tags';

    // function getTagsRequest(tagsCtrl, $http) {
    //     $http
    //         .get('/service/tags')
    //         .success(function(data) {
    //             tagsCtrl.tags = data.data;
    //         });
    // }


}
