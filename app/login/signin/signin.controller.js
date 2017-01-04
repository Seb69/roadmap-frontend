'use strict';

angular.module('angularRoadmappLogin')
    .controller('SigninCtrl', function ($scope, auth, $mdDialog, $window, localStorageService) {

        $scope.user = {
            email: "yo@admin.com",
            password: "admin"
        };

        $scope.signin = function () {
            //authentication process
            auth.grantPassword($scope.user).then(
                function (data) {
                    console.info("OAuth success");
                    localStorageService.set("access_token", data.access_token);
                    $window.location.href = "/dashboard/";
                },
                function (data) {
                    console.error("OAuth error");
                }
            );
        };

        $scope.signinGoogle = function () {
            $mdDialog.show(
                $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('Google SignIn')
                    .textContent('Will be implemented soon...')
                    .ok('Nice!')
                    .openFrom({top: -50, width: 30, height: 80})
                    .closeTo({left: 1500})
            );
        };

    });
