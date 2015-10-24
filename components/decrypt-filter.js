'use strict';

angular.module('myApp.decrypt-filter', [])
/**
* decryption filter for decrypt crypted messages at application message view
* @param msg crypted message string
* @param cryptKey key string for encrypt messages can be contain multiple key separated by space
* @return crypted/encrypted message string depence on crypto key value 
*/
.filter('decrypt', [ function() {
  return function(msg, cryptKey) {
  	var cryptKeys = [];

  	if(cryptKey !== undefined &&  cryptKey !== '' && 
  	    msg !== undefined && msg !== '') {
			var dec = '';
		  	
		  	if (cryptKey.indexOf(' ') !== -1){
		  		cryptKeys = cryptKey.split(' ');
		  	}
  			
  			if(cryptKeys.length >1){
  				for (var i = 0; i < cryptKeys.length; i++){
					dec = CryptoJS.AES.decrypt(msg, cryptKeys[i].trim());
					if(dec.toString() !== ''){
						break;
					}  					
  				}
  			} else {
				dec = CryptoJS.AES.decrypt(msg, cryptKey);
  			}

			if(dec.toString() !== '' && dec.toString() !== undefined){
				return dec.toString(CryptoJS.enc.Utf8);
			} 
			else {
				return msg;
			}
		}
	
	return msg;
  };
}]);
