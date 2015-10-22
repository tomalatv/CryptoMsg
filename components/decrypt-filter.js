'use strict';

angular.module('myApp.decrypt-filter', [])

.filter('decrypt', [ function() {
  return function(msg, cryptKey) {
  	if(cryptKey !== undefined &&  cryptKey !== '' 
			&& msg !== undefined && msg !== '') {
			var dec = CryptoJS.AES.decrypt(msg, cryptKey);
			if(dec.toString() !== '' && dec.toString() !== undefined){
				return dec.toString(CryptoJS.enc.Utf8);
			} else {
				return msg;
			}
		}
		return msg;
  };
}]);
