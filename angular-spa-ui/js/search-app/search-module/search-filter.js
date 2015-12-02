"use strict";

module.exports = function (search) {
    
    search.filter('validateDetailsRows', function (searchConfig) {
        
        function isAssepted(field) {
            for ( var x in searchConfig.config.detailsAcceptedFields) {
                if (field === searchConfig.config.detailsAcceptedFields[x] ) {
                    return true;
                }
            }
            return false;
        };
        
        return function (details) {
            var data = [];
            angular.forEach(details, function(detail){
                if (isAssepted(detail.title) && detail.title !='title' && detail.value !=''){
                    data.push(detail);
                }
            });

            return data;
        }
    });
    
}
