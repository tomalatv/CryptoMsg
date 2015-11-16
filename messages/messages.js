'use strict';

angular.module('cryptoMsg.messages', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/messages', {
        templateUrl: 'messages/messages.html',
        controller: 'MessagesCtrl',
    });
}])

.controller('MessagesCtrl', function($scope, $firebaseArray) {
    var url = 'https://cryptomsg.firebaseio.com/msgs';
    var firebRef = new Firebase(url);
    $scope.e = '';
    $scope.dec = '';

    $scope.msgArray = $firebaseArray(firebRef);

    $scope.cryptMsg = function(msg, cryptKey) {
        var now = moment();
        if (cryptKey !== undefined && cryptKey !== '' && msg !== undefined && msg !== '') {
            var cryptedMsg = CryptoJS.AES.encrypt(msg, cryptKey);
            $scope.e = cryptedMsg.toString();
            var data = JSON.parse('{ "msg": "' + cryptedMsg.toString() + '", "send": "' + now + '" }');
            firebRef.push(data);
            $scope.message = '';
        }
    }

    $scope.decryptMsg = function(msg, cryptKey) {
        if (cryptKey !== undefined && cryptKey !== '' && msg !== undefined && msg !== '') {
            var decryptedMsg = CryptoJS.AES.decrypt(msg, cryptKey);
            if (decryptedMsg.toString() !== '' && decryptedMsg.toString() !== undefined) {
                $scope.dec = decryptedMsg.toString(CryptoJS.enc.Utf8);
            } else {
                $scope.dec = msg;
            }
        }
    }

    $scope.removeMsg = function(msgId) {
        console.log("REMOVE: ", msgId);
        firebRef.child(msgId).remove();
    }

});
