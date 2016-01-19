"use strict";

module.exports = function () {

    var currentModule = 'simple';
    var searchModulesList = [];
    var searchModulesMethods = [];
    
    var getSearchModulesList = function() {
        return searchModulesList;
    };
    
    var getCurrentModule = function () {
        return currentModule;
    };

    var setCurrentModule = function (moduleName) {
        if (!hasModule(moduleName)) {
            console.warn('Can\'t find module ' + moduleName + ' in registered modules list!');
            return false;
        }

        currentModule = moduleName;
        return true;
    };
    
    var hasModule = function (moduleName) {
        return searchModulesList.some(function (module) {
            return module === moduleName;
        })
    };

    var initModule = function (moduleName, methodsObject) {
            if (hasModule(moduleName)) {
                console.warn('Module ' + moduleName + ' is already exist');
                return;
            }
            searchModulesList.push(moduleName);
            searchModulesMethods.push(methodsObject);
            setCurrentModule(moduleName);


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

    return {
        getCurrentModule: getCurrentModule,
        setCurrentModule: setCurrentModule,
        getMethod: getMethod,
        initModule: initModule,
        getModulesList: getSearchModulesList,
        hasModule: hasModule
    }


};
