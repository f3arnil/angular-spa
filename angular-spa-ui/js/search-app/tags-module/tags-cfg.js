var tagsCtrl = require('./tags-ctrl');

var stateProvider = function($stateProvider) {
    $stateProvider
        .state('tags', {
            url: '/tags',
            templateUrl: '/js/search-app/tags-module/tags.jade',
            controller: tagsCtrl
        });
}

module.exports = stateProvider;
