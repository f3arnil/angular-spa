"use strict";

module.exports = function(app){

    require('./search-app-srv')(app);
    require('./search-app-ctrl')(app);

};
