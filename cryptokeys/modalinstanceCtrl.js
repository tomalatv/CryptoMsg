angular.module('cryptoMsg.cryptokeys', [])
  .controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, CookieStorage) {
  var _keys = [];
  $scope.keychain = undefined;
  if (CookieStorage.getCryptoKeychain() === undefined ? _keys = [] :_keys = CookieStorage.getCryptoKeychain());
  $scope.keychain = _keys;

  $scope.ok = function () {
    CookieStorage.setCryptoKeychain($scope.keychain);
    $scope.keychain = undefined;
    _keys = [];
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $scope.keychain = undefined;
    _keys = [];
    $uibModalInstance.dismiss('cancel');
  };

  $scope.addToKeychain = function() {
    $scope.keychain.push(JSON.parse('{ "id": "' + $scope.key.id +
      '", "key" : "' + $scope.key.value + 
      '", "use": ' +false +'}'));
    $scope.key.id = undefined;
    $scope.key.value = undefined;
  };

  $scope.selectCryptionKey = function (key) {
    _.find($scope.keychain, function(item) {
        if(item.id === key.id && key.use === false){
          item.use = true;
        }else {
          item.use = false;
        }
    });
  };

});