angular.module('cryptoMsg.services', ['ngCookies'])
    .service('CookieStorage', function($cookies) {

        this.setAutoScroll = function(value) {
            $cookies.put('autoScroll', value);
        }

        this.getAutoScroll = function() {
            var _scroll = $cookies.get('autoScroll');
            console.log('GET Auto Scroll', _scroll);
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
        }
    });
