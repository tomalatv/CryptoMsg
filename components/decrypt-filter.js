'use strict';

angular.module('cryptoMsg.decrypt-filter', [])
    /**
     * decryption filter for decrypt crypted messages at application message view
     * @param msg crypted message string
     * @param cryptKey key string for encrypt messages can be contain multiple key separated by space
     * @return crypted/encrypted message string depence on crypto key value 
     */
    .filter('decrypt', [function() {
        return function(msg, cryptKeys) {
            if (cryptKeys !== undefined && cryptKeys !== '' &&
                cryptKeys.length > 0 && msg !== undefined && msg !== '') {
                var _dec = '';

                for (var i = 0; i < cryptKeys.length; i++) {
                    _dec = CryptoJS.AES.decrypt(msg, cryptKeys[i].key);

                    if (_dec.toString() !== '') {
                        break;
                    }
                }
                if (_dec.toString() !== '' && _dec.toString() !== undefined) {
                    return _dec.toString(CryptoJS.enc.Utf8);
                }
            }

            return msg;
        };
    }]);
