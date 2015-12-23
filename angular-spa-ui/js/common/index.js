"use strict";

module.exports = function (app) {

    // Page preload actions realized in mainCtrl
    var mainCtrl = require('./main-ctrl'),
        promisesSrv = require('./promises-srv'),
        getTemplateSrv = require('./getTemplate-srv'),
        configServiceSrv = require('./configService-srv'),
        appStorageSrv = require('./appStorage-srv'),
        commonServiceSrv = require('./commonService-srv');


    require('./recordsListDir')(app);
    require('./recordsEditDir')(app);

    var appLocalStorage = require('./localStorage-srv');

    app
        .service('appLocalStorage', appLocalStorage)
        .service('promises', promisesSrv)
        .service('getTemplate', getTemplateSrv)
        .service('configService', configServiceSrv)
        .service('appStorage', appStorageSrv)
        .service('commonService', commonServiceSrv)
        .constant('appConfig', require('./app-config'))
        .controller('mainCtrl', mainCtrl);

};
