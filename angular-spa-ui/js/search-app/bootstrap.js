"use strict";

module.exports = function(app){

    require('./search-app-srv')(app);
    require('./search-app-ctrl')(app);

};


// module.exports = function(app){

//     var searchSrv = require('./search-srv');
//     var searchSrv = require('./search-ctrl');

//     searchSrv(app);
//     searchCtrl(app);

// };
