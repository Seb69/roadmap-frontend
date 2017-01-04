'use strict';

angular.module('angularRoadmappLogin')
.controller('SignupCtrl', function ($scope, $mdDialog, $http){

  $scope.signinGoogle = function() {
    $mdDialog.show(
      $mdDialog.alert()
        .clickOutsideToClose(true)
        .title('Google SignIn')
        .textContent('Will be implemented soon...')
        .ok('Nice!')
        .openFrom({top: -50, width: 30,height: 80})
        .closeTo({left: 1500})
    );
  };

});
