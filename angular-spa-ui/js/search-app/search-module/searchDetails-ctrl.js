"use strict";

module.exports = function ($scope, configService, searchStorage, $stateParams, $state, promises, searchService) {

    var vm = this;

    var privateApi = {
        convertDetails: function (details) {
            var data = [];
            for (var x in details) {
                data.push({
                    title: x,
                    value: details[x]
                })
            }
            return data;
        }
    };

    vm.viewApi = {
        back: function () {
            if (!searchService.isEmptyObject(searchStorage.data))
                history.back();
            else {
                //$state.go('search.simple');
                location.href = $stateParams.backUrl;

            }
        },
        capitalize: function (data) {
            return data[0].toUpperCase() + data.slice(1);
        }
    };

    var config = configService.getConfig('searchConfig');

    vm.model = {};

    if (!searchService.isEmptyObject(searchStorage.details)) {
        vm.model.title = searchStorage.details.data.title;
        vm.model.detailsData = privateApi.convertDetails(searchStorage.details.data);
    } else {
        var path = $stateParams.type + 'Detail';
        var queryUrl = config.paths[path] + $stateParams.id;
        promises.getAsyncData('GET', queryUrl)
            .then(
                function (result) {
                    vm.model.title = result.data.title;
                    vm.model.detailsData = privateApi.convertDetails(result.data);
                }
            )
            .catch(
                function (err) {
                    console.log('Error ' + err.status);
                }
            )
    }
};
