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

    // app.get('/service/tag/get-by-name/:tagName', getTagByNameRequest);

    // app.get('/service/tag/get-by-article/:articleId', getTagByArticleIdRequest);

    // app.put('/service/tag/create', createTagRequest);

    // app.delete('/service/tag/delete/:tagId', deleteTagRequest);

    // app.get('/service/tag/autocomplete/:arg', autocompleteTagRequest);

    // // NodeJS.Express bug using HTTP.PUT with dynamical arguments...
    // app.get('/service/assign-article-tag/:articleId/:tagId', assignArticleTagRequest);

    // app.delete('/service/remove-article-tag/:articleId/:tagId', removeArticleTagRequest);

    // app.delete('/service/remove-article-tags/:articleId', removeArticleTagsRequest);

    // app.get('/service/tags/generate/:number', generateTagsRequest);

};
