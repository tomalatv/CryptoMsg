'use strict';

// Declare app level module which depends on views, and components
angular.module('cryptoMsg', [
  'ngRoute',
  'cryptoMsg.messages',
  'cryptoMsg.menu',
  'cryptoMsg.decrypt-filter'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/messages'});
}]);

