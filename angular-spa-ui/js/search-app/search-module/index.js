"use strict";

module.exports = function () {

	var searchCtrl = require('./search-ctrl.js');

	console.log('Search-module');

	angular
		.module('searchApp', [])
		.controller(searchCtrl);

}
