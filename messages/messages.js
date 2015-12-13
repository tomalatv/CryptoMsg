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
    $scope.cryptEnabled = true;
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
	 * @param  {msg} user writen message to be crypted 
	 * @param  {cryptKey} user seted crypting key for message
	 * @return {void}
	 */
    $scope.sendCryptMsg = function(msg, cryptKey) {
        var _now = moment();
        var _msg = '';
        if (cryptKey !== undefined && cryptKey !== '' && msg !== undefined && msg !== '') {
            var cryptedMsg = CryptoJS.AES.encrypt(msg, cryptKey);
            _msg = JSON.parse('{ "msg": "' + cryptedMsg.toString() + '", "send": "' + _now + '" }');
            firebRef.push(_msg);
            $scope.message = '';
        } else if(msg !== undefined && msg !== ''){
        	_msg = JSON.parse('{ "msg": "' + msg + '", "send": "' + _now + '" }');
            firebRef.push(_msg);
            $scope.message = '';
        }
    };

    $scope.decryptMsg = function(msg, cryptKey) {
        if (cryptKey !== undefined && cryptKey !== '' && msg !== undefined && msg !== '') {
            var decryptedMsg = CryptoJS.AES.decrypt(msg, cryptKey);
            if (decryptedMsg.toString() !== '' && decryptedMsg.toString() !== undefined) {
                $scope.dec = decryptedMsg.toString(CryptoJS.enc.Utf8);
            } else {
                $scope.dec = msg;
            }
        }
    };
    /**
     * @param  {msgId} messages id to be removed form firebase
     * @return {void}
     */
    $scope.removeMsg = function(msgId) {
        console.log("REMOVE: ", msgId);
        firebRef.child(msgId).remove();
    };
    /**
     * scroll end of messagas when view load's last message form firebase
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
});
