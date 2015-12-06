'use strict';

angular.module('cryptoMsg.menu', [])
.directive('navMenu', [ function(){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: 'menu/menu.html',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {
			$scope.showMenu = false;
		},
		controller: function($scope, $element, $attrs, $transclude, CookieStorage) {
			$scope.scrollEnabled = CookieStorage.getAutoScroll();

			$scope.setAutoScroll = function (){
				$scope.scrollEnabled = !$scope.scrollEnabled;
				CookieStorage.setAutoScroll($scope.scrollEnabled);
			}
		},
	};
}]);