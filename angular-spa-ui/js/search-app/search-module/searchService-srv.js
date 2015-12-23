"use strict";
// to delete ...all
module.exports = function () {

    //Find value in objects list (for limits and sortBy) and returns its id
    function findValueId(val, object) {
        for (var x in object) {
            if (object[x].value === val) {
                return x;
            }
        }
    };

    //if object has no keys return true, else false
    function isEmptyObject(obj) {
        if (angular.equals({}, obj)) {
            return true;
        }
        return false;
    }

    return {
        findValueId: findValueId,
        isEmptyObject: isEmptyObject
    }


};
