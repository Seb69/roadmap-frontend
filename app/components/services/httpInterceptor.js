"use strict";

angular.module('httpInterceptorFactory', [])
.factory('httpInterceptor', ['$log', '$rootScope', function($log, $rootScope) {
    $log.debug('$log is here to show you that this is a regular factory with injection');

    var myInterceptor = {
        request: function(config) {
            if(config.url.indexOf("/api/") !== -1) {
                $log.info("====> " + config.url);
            }
            config.headers['Authorization'] = $rootScope.ACCESS_TOKEN;
            return config;
        },
        response: function(response) {
            if(response.config.url.indexOf("/api/") !== -1) {
                $log.info("<==== " + response.config.url);
            }
            return response;
        }
    };

    return myInterceptor;
}]);
