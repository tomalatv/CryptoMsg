'use strict';

angular.module('cryptoMsg.menu', [])
    .directive('navMenu', [function() {
        return {
            restrict: 'E', 
            templateUrl: 'menu/menu.html',
            link: function($scope, iElm, iAttrs, controller) {
                $scope.showMenu = false;
            },
            controller: function($scope, $element, $attrs, $transclude, CookieStorage, $uibModal) {
                $scope.scrollEnabled = CookieStorage.getAutoScroll();
                $scope.keysInchain = [];
                /**
                 * enables/disables automatic message view scrolling
                 */
                $scope.setAutoScroll = function() {
                    $scope.scrollEnabled = !$scope.scrollEnabled;
                    CookieStorage.setAutoScroll($scope.scrollEnabled);
                };
                /**
                 * Opens crypto keys manipulation modal
                 * @return {void} 
                 */
                $scope.openCryptoKeys = function() {
                    $scope.showMenu = false;
                    var modalInstance = $uibModal.open({
                        animation: true,
                        controller: 'ModalInstanceCtrl',
                        templateUrl: 'cryptokeys/keysmodal.html',
                    });

                    modalInstance.result.then(function() {
                        checkKeychain();
                    }, function() {
                    });
                };
                /**
                 * check the crytion keychain for updating view values 
                 * @return {[type]} [description]
                 */
                function checkKeychain() {
                    if (CookieStorage.getCryptoKeychain() !== undefined) {
                        $scope.keysInchain = CookieStorage.getCryptoKeychain();
                        $scope.decryptKeys = $scope.keysInchain;
                    } else {
                        $scope.keysInchain = [];
                        $scope.decryptKeys = [];
                    }
                };

                checkKeychain();
                /**
                 * changes use value at cryption key object 
                 * when it is clicked at menu and update it to
                 * cookie storage
                 * @param  {Json object} key json object
                 * @return {void}
                 */
                $scope.useAtCryption = function(key) {
                    var _keys = CookieStorage.getCryptoKeychain();
                    _.find(_keys, function(item) {
                        if (item.id === key.id && key.use === false) {
                            item.use = true;
                        } else {
                            item.use = false;
                        }
                    });
                    CookieStorage.setCryptoKeychain(_keys);
                    checkKeychain();
                };
            },
        };
    }]);
