'use strict';

angular.module('cryptoMsg.menu', [])
    .directive('navMenu', [function() {
        // Runs during compile
        return {
            // name: '',
            // priority: 1,
            // terminal: true,
            // scope: {
            // 	decryptKeys: '=',
            // 	scrollEnabled: '='
            // }, // {} = isolate, true = child, false/undefined = no change
            // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
            restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
            templateUrl: 'menu/menu.html',
            // replace: true,
            // transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            link: function($scope, iElm, iAttrs, controller) {
                $scope.showMenu = false;
            },
            controller: function($scope, $element, $attrs, $transclude, CookieStorage, $uibModal) {
                $scope.scrollEnabled = CookieStorage.getAutoScroll();
                $scope.keysInchain = [];

                $scope.setAutoScroll = function() {
                    $scope.scrollEnabled = !$scope.scrollEnabled;
                    CookieStorage.setAutoScroll($scope.scrollEnabled);
                };

                $scope.openCryptoKeys = function() {
                    $scope.showMenu = false;
                    var modalInstance = $uibModal.open({
                        animation: true,
                        controller: 'ModalInstanceCtrl',
                        templateUrl: 'cryptokeys/keysmodal.html',
                    });

                    modalInstance.result.then(function() {
                        // console.log('modal ok close');
                        checkKeychain();
                    }, function() {
                        // console.log('Modal dismissed at: ' + new Date());
                    });
                };

                function checkKeychain() {
	                if (CookieStorage.getCryptoKeychain() !== undefined){
	                	$scope.keysInchain = CookieStorage.getCryptoKeychain();
	                	$scope.decryptKeys = $scope.keysInchain;
	                } else {
	                	$scope.keysInchain = [];
	                	$scope.decryptKeys = [];
	                }
                };

                checkKeychain();
            },
        };
    }]);
