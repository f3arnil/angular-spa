module.exports = function ($q, $http) {

    function getAsyncData(method, url, params) {
        params = params || {};
        var httpObj = {
            method: method,
            url: url
        };
        if (method === 'POST') httpObj.data = params;
        var deferred = $q.defer();
        $http(httpObj)
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
};
