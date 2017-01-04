'use strict';

angular.module('angularRoadmappDashboard')
.controller('MarkerUpdateCtrl', function ($scope, $location, $routeParams, $route, leafletData, factory, $mdSidenav, comm, $mdDialog) {

  $scope.saveMarker = function() {
    toggleRightMenu('marker-update');
  };

  $scope.cancelMarker = function() {
    //get back to previous marker state
    $scope.markers[$scope.shared.currentMarker.mIndex] = $scope.shared.markerBackUp;

    toggleRightMenu('marker-update');
  };

  function deleteMarker() {
    //if marker exists in DB, keep its id for a later deletion
    var idToDelete = $scope.markers[$scope.shared.currentMarker.mIndex].id
    if(idToDelete != undefined){
      $scope.shared.markersIdsToDelete.push(idToDelete);
    }

    //delete marker
    delete $scope.markers[$scope.shared.currentMarker.mIndex];

    //delete waypoint for itinerary update
    $scope.deleteWayPoint($scope.shared.currentMarker.mIndex);

    updateMarkersIndexes();
    $scope.shared.currentMarkerIndex--;
  };

  function updateMarkersIndexes(){
    var i = 1;
    while($scope.markers[i] != undefined) i++;
    for(var j = i; j < $scope.shared.currentMarkerIndex; j++){
      $scope.markers[j] = $scope.markers[j + 1];
      $scope.markers[j].mIndex--;
    }
    delete $scope.markers[$scope.shared.currentMarkerIndex];
  }

  /*************************************************************/
  /****************** CONFIRM DELETE DIALOG ******$*************/

  var alert;

  // Show alert dialog and cache
  // reference to dialog instance
  $scope.showDialog = function(){

    alert = $mdDialog.confirm()
      .title('Delete this marker ?')
      .ok('Yes')
      .cancel('No, cancel');

    $mdDialog
        .show(alert)
        .then(
          function(){
            closeDialog();
            deleteMarker();
            toggleRightMenu('marker-update');
          },
          function(){
            closeDialog();
          });

  }
  // Close the specified dialog instance
  function closeDialog() {
    $mdDialog.hide( alert, "finished" );
    alert = undefined;
  }


  /*************************************************************/
  /************************* SIDE NAV **************************/

  function toggleRightMenu(id) {
    $mdSidenav(id).toggle();
  };

});
