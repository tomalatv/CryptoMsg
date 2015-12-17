/**
 * Controller for adding and removing cryprion keys to cookie storage
 */
angular.module('cryptoMsg.cryptokeys', [])
  .controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, CookieStorage) {
  var _keys = [];
  $scope.keychain = undefined;
  if (CookieStorage.getCryptoKeychain() === undefined ? _keys = [] :_keys = CookieStorage.getCryptoKeychain());
  $scope.keychain = _keys;
  /**
   * closes modal dialog with ok button click
   * @return {void} 
   */
  $scope.ok = function () {
    CookieStorage.setCryptoKeychain($scope.keychain);
    $scope.keychain = undefined;
    _keys = [];
    $uibModalInstance.close();
  };
  /**
   * Closes modal dialog with cancel button click
   * @return {void} 
   */
  $scope.cancel = function () {
    $scope.keychain = undefined;
    _keys = [];
    $uibModalInstance.dismiss('cancel');
  };
  /**
   * adds new key to keychain variable as json object
   * @return {void}
   */
  $scope.addToKeychain = function() {
    $scope.keychain.push(JSON.parse('{ "id": "' + $scope.key.id +
      '", "key" : "' + $scope.key.value + 
      '", "use": ' +false +'}'));
    $scope.key.id = undefined;
    $scope.key.value = undefined;
  };
  /**
   * set cryption key use value to true or false 
   * when checkbox is clicked in modal window
   * @param  {Json object} selected key json object to be modified it's use value
   * @return {void} 
   */
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