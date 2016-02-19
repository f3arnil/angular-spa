"use strict";
module.exports = function (parentModule) {
    
    var headerCtrl = require('./header-ctrl');
    
    parentModule
        .controller('headerCtrl', headerCtrl)
}