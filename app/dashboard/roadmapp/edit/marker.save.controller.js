'use strict';

angular.module('angularRoadmappDashboard')
.controller('markerSaveCtrl', function ($scope, $location, $routeParams, $route, leafletData, factory, $mdSidenav) {

  $scope.saveMarker = function() {
    toggleRightMenu('marker-save');
  };

  $scope.cancelMarker = function() {
      //delete marker just created (and itinerary if there is one)
      delete $scope.markers[$scope.shared.currentMarkerIndex];

      //delete waypoint for itinerary update
      $scope.deleteWayPoint($scope.shared.currentMarkerIndex);
      $scope.shared.currentMarkerIndex--;

    toggleRightMenu('marker-save');
  };

  /*************************************************************/
  /************************* SIDE NAV **************************/

  function toggleRightMenu(id) {
    $mdSidenav(id).toggle();
  };

});
