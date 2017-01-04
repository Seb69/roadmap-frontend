'use strict';

angular.module('angularRoadmappDashboard')
.controller('RoadmappSaveUpdateCtrl', function ($scope, $location, $routeParams, $route, leafletData, factory, $mdSidenav, comm, $mdDialog, leafletMarkerEvents, leafletLogger, $mdToast) {

  $scope.saveRoadMapp = function() {
    $scope.error = false;

    //send rm ro server
    //if roadmapp has no id yet, save it
    if(!$scope.shared.roadmapp.id){
      comm.postRoadMapp($scope.shared.roadmapp).then(
        function(data){
          $scope.shared.roadmapp = data;
          saveMarkers();
          notifyUser();
        },
        function(err){
          $scope.error = true;
          notifyUser();
        }
      );
    }
    //update it otherwise
    else{
      var roadmappId = $scope.shared.roadmapp.id;
      var userId = $scope.shared.roadmapp.userId;
      $scope.shared.roadmapp = factory.roadMappCreation($scope.shared.roadmapp.title, $scope.shared.roadmapp.description);
      $scope.shared.roadmapp.userId = userId;
      comm.putRoadMapp(roadmappId, $scope.shared.roadmapp).then(
        function(data){
          $scope.shared.roadmapp = data;
          saveMarkers();
          notifyUser();
        },
        function(err){
          $scope.error = true;
          notifyUser();
        }
      );

      //delete markers in DB
      for(var i = 0; i < $scope.shared.markersIdsToDelete.length; i++){
        comm.deleteMarker($scope.shared.markersIdsToDelete[i]).then(
          function(data){
          },
          function(err){
          }
        );
      }
      //reset markers to delete array
      while($scope.shared.markersIdsToDelete.length > 0){
        $scope.shared.markersIdsToDelete.pop();
      }
    }

  };

  /*************************************************************/
  /******************* SAVE/UPDATE MARKERS ********************/

  function saveMarkers() {
    var marker;
    angular.forEach($scope.markers, function(marker, index) {

      //if marker doesnt exist yet, save it
      if(marker.id === undefined){

        //format marker to send it to server
        var markerToSend = factory.markerCreation(marker.lat, marker.lng, marker.title, marker.mIndex);
        markerToSend.roadmappId = $scope.shared.roadmapp.id;

        comm.postMarker(markerToSend).then(
          function(data){
            $scope.markers[index] = factory.workingMarkerCreation(data.lat, data.lng, data.title, data.mIndex);
            $scope.markers[index].id = data.id;
          },
          function(err){
            $scope.error = true;
          });
      }
      //update it otherwise
      else {
        var markerToSend = factory.markerCreation(marker.lat, marker.lng, marker.title, marker.mIndex);

        comm.putMarker(marker.id, markerToSend).then(
          function(data){
            $scope.markers[index] = factory.workingMarkerCreation(data.lat, data.lng, data.title, data.mIndex);
            $scope.markers[index].id = data.id;
          },
          function(err){
            $scope.error = true;
          });
      }
    });

  };

  //notify the user of success, ... or failure
  function notifyUser(){
    if(!$scope.error){
      $mdToast.show($mdToast.simple().textContent('RoadMapp saved!').hideDelay(350));
    }
    else {
      $mdToast.show($mdToast.simple().textContent('Error'));
    }
  }


  /*************************************************************/
  /************************* SIDE NAV **************************/

  function toggleRightMenu(id) {
    $mdSidenav('roadmapp-save').toggle();
    $mdSidenav(id).toggle();
  };

});
