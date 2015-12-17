'use strict';

angular.module('cryptoMsg.messages', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/messages', {
        templateUrl: 'messages/messages.html',
        controller: 'MessagesCtrl',
    });
}])

.controller('MessagesCtrl', function($scope, $firebaseArray, $location, $anchorScroll, CookieStorage) {
    var url = 'https://cryptomsg.firebaseio.com/msgs';
    var firebRef = new Firebase(url);
    $scope.dec = '';
    $scope.scrollEnabled = true;

    var msg = $firebaseArray(firebRef);
    $scope.msgArray = '';
    msg.$loaded()
    .then(function(msgs) {
    	$scope.msgArray = msgs;
    })
    .catch(function(err) {
    	console.log('messages cannot loaded !!', err);
    });
	/**
	 * @param  {msg} add new message to firebase crypted or uncrypted 
	 * @return {void}
	 */
    $scope.sendCryptMsg = function(msg) {
        var _now = moment();
        var _msg = '';
        var _cryptKey = getCryptionKey();

        if (_cryptKey !== undefined && _cryptKey !== '' && msg !== undefined && msg !== '') {
            var _cryptedMsg = CryptoJS.AES.encrypt(msg, _cryptKey);
            _msg = JSON.parse('{ "msg": "' + _cryptedMsg.toString() + '", "send": "' + _now + '" }');
            firebRef.push(_msg);
            $scope.message = '';
        } else if(msg !== undefined && msg !== ''){
        	_msg = JSON.parse('{ "msg": "' + msg + '", "send": "' + _now + '" }');
            firebRef.push(_msg);
            $scope.message = '';
        }
    };
    /**
     * @param  {msgId} removes messages by message id form firebase
     * @return {void}
     */
    $scope.removeMsg = function(msgId) {
        firebRef.child(msgId).remove();
    };
    /**
     * scrolls to last message when view load's last message form firebase
     * @return {void}
     */
    $scope.scrollToLastMsg = function() {
        if ($scope.scrollEnabled) {
            $location.hash("lastmsg");
            $anchorScroll();
        }
    };

    $scope.decryptKeys = undefined;
    if(CookieStorage.getCryptoKeychain() !== undefined) {
        $scope.decryptKeys = CookieStorage.getCryptoKeychain();
    }
    /**
     * gets selected cryption key which is stored at cookie storage 
     * @return {string} encryption key
     */
    function getCryptionKey() {
        var _key = undefined;
        _.find($scope.decryptKeys, function(item){
            if(item.use === true){
                _key = item.key;
            } 
        });
        return _key;
    }
});
