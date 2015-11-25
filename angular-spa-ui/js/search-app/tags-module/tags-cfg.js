"use strict";

module.exports = function(tags) {

    tags
        .config(configCb);

    function configCb($stateProvider) {
        $stateProvider
            .state('tags', {
                url: '/tags',
                templateUrl: 'tagsListTemplate.html'
            });
    };

}
