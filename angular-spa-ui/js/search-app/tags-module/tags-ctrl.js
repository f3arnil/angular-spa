'use strict';

module.exports = function($scope, $state) {

    // Implementation controller of 'module tags'
    $scope.pageTitle = $state.current.data.pageTitle;

};
