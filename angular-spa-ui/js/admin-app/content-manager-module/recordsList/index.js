"use strict";

module.exports = function (app) {
    
    require('./recordsList-dir')(app);
    require('./recordsList-srv')(app);
    require('./recordsList-ctrl')(app);

};