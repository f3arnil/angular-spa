"use strict";

module.exports = function (app) {

    require('./common-srv')(app);

    // Page preload actions realized in mainCtrl
    var mainCtrl = require('./main-ctrl');
    var promisesSrv = require('./promises-srv');
    var getTemplateSrv = require('./getTemplate-srv');
    var configServiceSrv = require('./configService-srv');
    var appStorageSrv = require('./appStorage-srv');

    require('./recordsListDir')(app);

    var appLocalStorage = require('./localStorage-srv');

    app
        .service('appLocalStorage', appLocalStorage)
        .service('promises', promisesSrv)
        .service('getTemplate', getTemplateSrv)
        .service('configService', configServiceSrv)
        .service('appStorage', appStorageSrv)
        .constant('appConfig', require('./app-config'))
        .controller('mainCtrl', mainCtrl);


};
