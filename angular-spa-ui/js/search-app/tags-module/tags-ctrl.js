"use strict";

//var tagsCtrl = {};

module.exports = function($scope, $http) {

    var tagsCtrl = $scope;

    tagsCtrl.titlePage = 'Manage tags';

    // example tag = { 'name': 'Tag1', 'textColor': '', 'backgroundColor': '', 'glyph': '', 'published': '' }


    // app.get('/service/tags', getTagsRequest);
    $http.get('/service/tags').success(function(data) {
        //console.log(data.data);
        tagsCtrl.tags = data.data;
    });


    // app.get('/service/tag/get-by-id/:tagId', getTagByIdRequest);
    $http.get('/service/tag/get-by-id/:tagId').success(function(data) {
        //console.log(data);
    });


    // app.get('/service/tag/get-by-name/:tagName', getTagByNameRequest);
    $http.get('/service/tag/get-by-name/:tagName').success(function(data) {
        //console.log(data);
    });


    // app.get('/service/tag/get-by-article/:articleId', getTagByArticleIdRequest);
    $http.get('/service/tag/get-by-article/:articleId').success(function(data) {
        //console.log(data);
    });


    // app.put('/service/tag/create', createTagRequest);
    // $http.put('/service/tag/create').success(function(data) {
    //     console.log(data);
    // });


    // app.delete('/service/tag/delete/:tagId', deleteTagRequest);
    // $http.delete('/service/tag/delete/:tagId').success(function(data) {
    //     console.log(data);
    // });


    // app.get('/service/tag/autocomplete/:arg', autocompleteTagRequest);
    $http.get('/service/tag/autocomplete/:arg').success(function(data) {
        //console.log(data);
    });


    // // NodeJS.Express bug using HTTP.PUT with dynamical arguments...
    // app.get('/service/assign-article-tag/:articleId/:tagId', assignArticleTagRequest);
    $http.get('/service/assign-article-tag/:articleId/:tagId').success(function(data) {
        //console.log(data);
    });


    // app.delete('/service/remove-article-tag/:articleId/:tagId', removeArticleTagRequest);
    // $http.delete('/service/remove-article-tag/:articleId/:tagId').success(function(data) {
    //     console.log(data);
    // });


    // app.delete('/service/remove-article-tags/:articleId', removeArticleTagsRequest);
    // $http.delete('/service/remove-article-tags/:articleId').success(function(data) {
    //     console.log(data);
    // });


    // app.get('/service/tags/generate/:number', generateTagsRequest);
    $http.get('/service/tags/generate/:number').success(function(data) {
        //console.log(data);
    });

};
