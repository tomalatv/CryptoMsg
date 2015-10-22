'use strict';

angular.module('myApp.view1', ['ngRoute', 'firebase'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl',
  });
}])

.controller('View1Ctrl', function ($scope, $firebaseArray)  {
	var url = 'https://cryptomsg.firebaseio.com/msgs';
	var firebRef = new Firebase(url);
	$scope.e  = '';
	$scope.dec  = '';
	
	$scope.msgArray = $firebaseArray(firebRef);

	$scope.cryptMsg = function (msg, cryptKey) {
		console.log('crypt ', cryptKey);
		if(cryptKey !== undefined &&  cryptKey !== ''
			&& msg !== undefined && msg !== '') {
			var cryptedMsg = CryptoJS.AES.encrypt(msg, cryptKey);
			$scope.e = cryptedMsg.toString();
			var data = JSON.parse('{ "msg": "' + cryptedMsg.toString() + '"}');
			firebRef.push(data);
		}
	}

	$scope.decryptMsg = function (msg, cryptKey) {
		if(cryptKey !== undefined &&  cryptKey !== '' 
			&& msg !== undefined && msg !== '') {
			var decryptedMsg = CryptoJS.AES.decrypt(msg, cryptKey);
			if(decryptedMsg.toString() !== '' && decryptedMsg.toString() !== undefined){
				$scope.dec = decryptedMsg.toString(CryptoJS.enc.Utf8);
			} else {
				$scope.dec = msg;
			}
		}	
	}

	$scope.removeMsg = function (msgId) {
		console.log("REMOVE: ", msgId);
		firebRef.child(msgId).remove();
	}

});