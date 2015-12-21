"use strict";

module.exports = function (parentModule) {

    var recordsListDir = require('./recordsList-dir'),
        recordsListSrv = require('./recordsList-srv'),
        recordsListCtrl = require('./recordsList-ctrl');

    parentModule
        .constant('recordsListConfig', require('./recordsList-config'))
        .directive('recordsList', recordsListDir)
        .service('rlService', recordsListSrv)


    parentModule.provider('test', function (recordsListConfig) {
        var thisIsPrivate = recordsListConfig;
        console.log('!', recordsListConfig);
        return {

            setPrivate: function (newVal) {
                thisIsPrivate = newVal;
            },

            $get: function () {
                function getPrivate() {
                    return thisIsPrivate;
                }

                return {
                    variable: "This is public",
                    getPrivate: getPrivate
                };
            }

        };
    });
};
