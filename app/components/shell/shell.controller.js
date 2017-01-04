'use strict';

angular.module('angularRoadmappDashboard')
    .controller('ShellCtrl', function ($mdSidenav, $mdDialog, $scope, $rootScope, localStorageService, $window) {

        $scope.toggleLeft = function () {
            $mdSidenav('left').toggle();
        };

        $scope.logout = function () {
            $rootScope.ACCESS_TOKEN = "";
            localStorageService.set("access_token", "");
            $window.location.href = "/login/";
        };

    });
