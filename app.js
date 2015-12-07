'use strict';

// Declare app level module which depends on views, and components
angular.module('cryptoMsg', [
  'ngRoute',
  'cryptoMsg.messages',
  'cryptoMsg.menu',
  'cryptoMsg.decrypt-filter',
  'cryptoMsg.services'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/messages'});
}]);

