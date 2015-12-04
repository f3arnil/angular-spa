"use strict";

module.exports = function (cm) {
    
    cm.service('cmConfig', function () {
        
        var config = require('./cm-config');
        
        return {
            config : config
        }
    });
    
    cm.service('contentStorage', function () {
        return {
            data : {},
            params : {},
            details : {},
            searchType: {}
        }
    });
}