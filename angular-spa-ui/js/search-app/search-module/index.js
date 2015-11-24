"use strict";

module.exports = function(angular) {

    require('./advanced-search')(angular);
        
    var search = angular.module('searchApp.Search', ['searchApp.Search.advanced'])
    var searchCtrl = require('./search-ctrl')(search);
    
    search.config(configCb);
    
    function configCb($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('search', {
                abstract: true,
                url: '/search',
                views:{
                    "module-content": {
                        template: '<div ui-view="content"></div>'
                    }
                }
            })
            .state('search.simple', {
                url: '/simple',
                views:{
                    "content": {
                        templateUrl: '/search.html',
                        controller : 'searchCtrl'
                    }
                }
            })
    };

}



// "use strict";

// module.exports = function(app) {

//     require('./advanced-search')(app);

//     //var searchCtrl = require('./search-ctrl');

//     app.config(configCb);

//     function configCb($stateProvider) {
//         $stateProvider
//             .state('search', {
//                 abstract: true,
//                 url: '/search',
//                 template: '<ui-view/>'
//             })
//             .state('search.simple', {
//                 url: '.simple',
//                 template: 'Hello world simple search'
//                 //controller: searchCtrl
//             });
//     };

// };
