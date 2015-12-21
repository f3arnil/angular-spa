"use strict";

module.exports = function (search) {

    search.filter('validateDetailsRows', function (searchConfig) {

        // Check detail - if title accepted in config
        // and value not empty -> true, else -> false
        function isAccepted(detail) {
            var AcceptedArray = searchConfig.config.detailsAcceptedFields;
            return AcceptedArray.some(function (item) {
                if (detail.title === item && detail.value !== '') {
                    return true;
                }
            });
        };

        return function (details) {
            var data = [];
            angular.forEach(details, function (detail) {
                if (detail.title != 'title' && isAccepted(detail)) {
                    data.push(detail);
                }
            });

            return data;
        }
    });

}
