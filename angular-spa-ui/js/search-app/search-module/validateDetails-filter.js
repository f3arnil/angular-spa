"use strict";

module.exports = function (configService) {
    // Check detail - if title accepted in config
    // and value not empty -> true, else -> false
    function isAccepted(detail) {
        var AcceptedArray = configService.getConfig('searchConfig').detailsAcceptedFields;
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
};
