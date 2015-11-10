"use strict";

module.exports = function () {
  var searchCtrl = require(__dirname + '/search-ctrl.js');
  // require('search-dir.js');
  // require('search-srv.js');

  // var search = angular.module('search',[]);

  //var searchCtrl = require('search-ctrl');
  // var sDir = require('search-dir');

   angular.module('search.ctrl', []).controller(searchCtrl);
  //locals.way+'../common/angular-ui-router.js'
}
