"use strict";

module.exports = function (configService) {

    return {
        generateQueryParams: function (path, stateParams) {
            var url = path,
                data = _.pairs(stateParams);

            _.each(data, function (pair) {
                url += pair[0] + '=' + pair[1] + '&';
            });

            return url;
        },
        isActiveTab: function (tabs, currentSection) {
            angular.forEach(tabs, function (tab) {
                if (tab.value === currentSection)
                    tab.active = true;
            });
            return tabs;
        }
    };

};
