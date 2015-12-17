/**
 * Service for storing crytion keychain to cookie 
 */
angular.module('cryptoMsg.services', ['ngCookies'])
    .service('CookieStorage', function($cookies) {
        /**
         * stores autoscroll value to cookie
         * @param {boolen} value 
         */
        this.setAutoScroll = function(value) {
            $cookies.put('autoScroll', value);
        };
        /**
         * retrieve autoscroll value from cookie
         * @return {boolean} true/false 
         */
        this.getAutoScroll = function() {
            var _scroll = $cookies.get('autoScroll');
            switch (_scroll) {
                case 'true':
                    _scroll = true;
                    break;
                case 'false':
                    _scroll = false;
                    break;
                default:
                    _scroll = true;
                    break;
            }
            return _scroll;
        };
        /**
         * retrieve crytokeychain from cookie
         * @return {Json array} array of crypto key json objects
         */
        this.getCryptoKeychain = function () {
            return $cookies.getObject('cryptoKeychain');
        };
        /**
         * save cryptokeys chain array to cookie
         * @param {JSON Array} keys array of key JSON objects
         */
        this.setCryptoKeychain = function (keys){
            $cookies.putObject('cryptoKeychain', keys);
        };
    });
