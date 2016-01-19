"use strict";

module.exports = function () {

    var hasModule = function (moduleName) {
        return searchModulesList.some(function (module) {
            return module === moduleName;
        })
    };

    var searchModulesList = [];

    var searchModulesMethods = [];

    var initModule = function (moduleName, methodsObject) {
        searchModulesList.push(moduleName);
        searchModulesMethods.push(methodsObject);
    }
    // return method from searchModulesMethods
    var getMethod = function (moduleName, methodName) {
        if (!hasModule(moduleName)) {
            console.warn('Can\'t find ' + moduleName + ' in search observer modules list');
            return new Function();
        }
        var found = false;
        for (var i = 0; i < searchModulesMethods.length; i++) {
            var obj = searchModulesMethods[i];
            if (obj.type === moduleName && obj.methods.hasOwnProperty(methodName)) {
                found = true;
                return obj.methods[methodName];
            }
        }
        if (!found) {
            console.warn('Cant find method ' + methodName + ' in ' + moduleName);
            return new Function();
        }
    };

    var currentModule = 'simple';

    return {
        currentModule: currentModule,
        getMethod: getMethod,
        initModule: initModule,
        modulesList: searchModulesList
    }


};
