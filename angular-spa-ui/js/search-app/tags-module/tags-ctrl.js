"use strict";

function tagsCtrl($scope) {

    $scope.greeting = 'Hello! this is search controller!';

    $scope.tags = [
        { 'name': 'Tag1', 'textColor': '', 'backgroundColor': '', 'glyph': '', 'published': '' },
        { 'name': 'Tag2', 'textColor': '', 'backgroundColor': '', 'glyph': '', 'published': '' },
        { 'name': 'Tag3', 'textColor': '', 'backgroundColor': '', 'glyph': '', 'published': '' },
        { 'name': 'Tag4', 'textColor': '', 'backgroundColor': '', 'glyph': '', 'published': '' },
        { 'name': 'Tag5', 'textColor': '', 'backgroundColor': '', 'glyph': '', 'published': '' }
    ];

}

module.exports = tagsCtrl;
