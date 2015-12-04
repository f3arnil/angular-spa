"use strict";

module.exports = function (cm) {
    
    cm.directive('recordsList', function () {
        return {
            scope : {
                name : '='
            },
            transclude : true,
            templateUrl : '/results.html',
            link : function($scope, element, attrs) {
                console.log(attrs);
                console.log($scope);
                
            }
        }
    });
    
}