"use strict";

module.exports = function(advancedSearch) {
    advancedSearch.directive('rowsDir', function() {
        return {
            restrict: 'E',
            template: "<div>Hello!</div>",
            link: function(scope, element, attrs){
                //console.log('scope > ', scope);    
            },
            replace: false
        };
    });
};
