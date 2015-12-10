'use strict';

// Declare app level module which depends on views, and components
angular.module('cryptoMsg', [
  'ngRoute',
  'ngAnimate',
  'cryptoMsg.messages',
  'cryptoMsg.cryptokeys',
  'cryptoMsg.menu',
  'cryptoMsg.decrypt-filter',
  'cryptoMsg.services',
  'ui.bootstrap'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/messages'});
}]);

