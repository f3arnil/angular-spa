"use strict";

require('angular-ui-router');

var tags = angular.module('tags', ['ui.router']);
var stateProvider = require('./tags-cfg');
//var tagDirective = require('./tags-dir');

tags
    .config(stateProvider)
    .directive('tagItem', tagItem);
    //.directive('tagsList', tagsList)
    //.factory('tags', ['$resource', tagFactory]);

    // Define directive - tag item
    function tagItem() {
        return {
            restrict: 'A',
            templateUrl: 'tagTemplate.html',
            link: function ( $scope, $element, $attrs ) {

                // This adds the new tag to the tags array
                $scope.add = function() {
                    console.log(arguments);
                    //$scope.tags.push( $scope.new_value );
                    //$scope.new_value = "";
                };
                
                // This is the ng-click handler to remove an item
                // $scope.remove = function ( idx ) {
                //     $scope.tags.splice( idx, 1 );
                // };
                
                // Capture all keypresses
                // input.bind( 'keypress', function ( event ) {
                //     // But we only care when Enter was pressed
                //     if ( event.keyCode == 13 ) {
                //         // There's probably a better way to handle this...
                //         $scope.$apply( $scope.add );
                //     }
                // });

            }
        };
    }


    // Define factory
    function tagFactory($resource) {
        //app.get('/service/tag/get-by-id/:tagId', getTagByIdRequest);
        return $resource('/service/tag/get-by-id/:tagId', {}, {
            getTagByIdRequest: { method: 'GET', params: { dest: 'GetTagByIdRequest' }, isArray: true }
        });
    }

module.exports = tags;
