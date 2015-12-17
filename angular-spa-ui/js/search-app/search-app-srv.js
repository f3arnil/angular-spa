"use strict";

module.exports = function (app) {

    app.service('searchStorage', function () {
        return {
            data : {},
            params : {},
            details : {},
            searchType: {}
        }
    });
    
}
