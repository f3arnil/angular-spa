"use strict";

function tagsCtrl($scope) {

    $scope.greeting = 'Hello! this is search controller!';

    $scope.tags = [
            { text: 'Tag1' },
            { text: 'Tag2' },
            { text: 'Tag3' },
            { text: 'Tag4' }
    ];

    function loadTags(query) {
        console.log(query);
        //return $http.get('/tags?query=' + query);
    };

}

module.exports = tagsCtrl;
