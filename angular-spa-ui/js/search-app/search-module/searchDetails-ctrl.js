"use strict";

module.exports = function ($scope, searchConfig, searchStorage, $stateParams, $state, promises, searchService) {

    // Convert details data for ng-repeat
    function convertDetails(details) {
        var data = [];
        for (var x in details) {
            data.push({
                title: x,
                value: details[x]
            })
        }
        return data;
    }

    // Return to result action
    $scope.back = function () {
        if (!searchService.isEmptyObject(searchStorage.data))
            history.back();
        else {
            //$state.go('search.simple');
            location.href = $stateParams.backUrl;

        }
    };

    // Capitalize field name
    $scope.capitalize = function (data) {
        return data[0].toUpperCase() + data.slice(1);
    };

    var config = searchConfig.config;
    if (!searchService.isEmptyObject(searchStorage.details)) {
        $scope.title = searchStorage.details.data.title;
        $scope.detailsData = convertDetails(searchStorage.details.data);
    } else {
        var path = $stateParams.type + 'Detail';
        var queryUrl = config.paths[path] + $stateParams.id;
        promises.getAsyncData('GET', queryUrl)
            .then(
                function (result) {
                    $scope.title = result.data.title;
                    $scope.detailsData = convertDetails(result.data);
                }
            )
            .catch(
                function (err) {
                    console.log('Error ' + err.status);
                }
            )
    }
};
