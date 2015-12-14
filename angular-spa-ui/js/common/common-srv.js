"use strict";

module.exports = function (app) {

    app.service('promises', function ($q, $http) {

        function getAsyncData(method, url) {

            var deferred = $q.defer();

            $http({
                    method: method,
                    url: url
                })
                .success(function (data) {
                    data.url = url;
                    deferred.resolve(data);
                })
                .error(function (data, status) {
                    deferred.reject({
                        data: data,
                        status: status
                    });
                });

            return deferred.promise;
        };

        function getALL(method, urlList) {
            var promiseList = [];
            for (var url in urlList) {
                promiseList.push(getAsyncData(method, urlList[url]))
            }

            var deferred = $q.defer();
            $q.all(promiseList)
                .then(
                    function (values) {
                        deferred.resolve(values)
                    },
                    function (values) {
                        deferred.reject(values);
                    }
                );

            return deferred.promise;
        };

        return {
            getAsyncData: getAsyncData,
            getAll: getALL
        };
    });

    // app service for templates
    app.service('getTemplate', function ($sce, $compile, $templateRequest, $q) {

        function getByTrustedUrl(url, element, scope) {
            var deferred = $q.defer();
            var templateUrl = $sce.getTrustedResourceUrl(url);
            $templateRequest(templateUrl)
                .then(
                    function (template) {
                        $compile(element.html(template).contents())(scope);
                        deferred.resolve()
                    },
                    function () {
                        deferred.reject('Can not get template!');
                    }
                );
            return deferred.promise;
        };

        return {
            getByTrustedUrl: getByTrustedUrl
        }

    });

    app.service('configService', function ($injector) {

        var getConfig = function (configName) {

            try {
                return angular.copy($injector.get(configName));
            } catch (err) {
                throw Error('Can not get config ' + configName);
            }

        };

        var getData = function (configName, keysPath) {

            var config = getConfig(configName),
                keysPathArray = keysPath.split('.'),
                lastKeyIndex = keysPathArray.length - 1;
            if (!keysPathArray.length && !_.isEmpty(config)) {
                return false;
            }

            var obj = config;

            for (var index in keysPathArray) {
                var data = keysPathArray[index];
                if (!_.has(obj, data)) {
                    console.warn('Element \'' + keysPath + '\' not found in ' + configName);
                    obj = false;

                    return false;
                }
                obj = obj[data];

                if (index == lastKeyIndex) {
                    return angular.copy(obj);
                }
            }

            return angular.copy(obj);
        };

        return {
            getData: getData,
            getConfig: getConfig
        }
    });

    app.service('appStorage', function () {
        return {
            data: {}
        }
    });
}
