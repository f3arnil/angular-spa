"use strict";

module.exports = function(app){

    require('./search-srv')(app);
    require('./search-ctrl')(app);

};
