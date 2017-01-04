'use strict';

angular.module('angularRoadmappDashboard')
.controller('RoadmappEditCtrl', function ($scope, $location, $routeParams, $route, leafletData, factory, $mdSidenav, comm, $mdDialog, leafletMarkerEvents) {

  //marker map
  $scope.markers = {};

  //shared variables
  $scope.shared = {};
  //itinerary map
  $scope.shared.itinerary = {};
  //itinerary waypoints
  $scope.shared.wayPoints = [];
  //marker being edited
  $scope.shared.currentMarker = {};
  //index for markers
  $scope.shared.currentMarkerIndex = 0;
  //roadmapp
  $scope.shared.roadmapp = factory.roadMappCreation("", "");
  //id markers to be deleted
  $scope.shared.markersIdsToDelete = [];

  $scope.lineOptions = {
    styles: [
      {
        color: 'white', opacity: 0.15, weight: 9
      },
      {
        color: 'red', opacity: 0.8, weight: 6
      },
      {
        color: 'white', opacity: 1, weight: 2
      }
    ]
  };


  //saved marker in case of cancelation
  $scope.shared.markerBackUp = {};

  //booleans allowing to show stuff
  $scope.show = {};


  /******* LOAD ROADMAPP IF NECESSARY **************************/


  $scope.custumroadmapp = {};

var roadmapp_Id = $location.path().split("/")[2];

if(roadmapp_Id != undefined && roadmapp_Id != null){
  comm.getRoadmapps(roadmapp_Id).then(
      function (data) {

          $scope.custumroadmapp = data;

          var count = 1;

          $scope.custumroadmapp.markersIds.forEach(function(markerId, index) {

              comm.getMarker(markerId).then(
                  function (marker) {
                      $scope.markers[marker.mIndex] = factory.workingMarkerCreation(marker.lat, marker.lng, marker.title, marker.mIndex);
                      $scope.markers[marker.mIndex].id = marker.id;
                      if($scope.custumroadmapp.markersIds.length == count){
                        $scope.updateWayPoints();
                      }
                      count++;
                  },
                  function (err) {
                      console.error("comm FAIL");
                  }
              );
          });

          $scope.shared.currentMarkerIndex = $scope.custumroadmapp.markersIds.length;
          $scope.shared.roadmapp = factory.roadMappCreation($scope.custumroadmapp.title,$scope.custumroadmapp.description);
          $scope.shared.roadmapp.id = data.id;
          $scope.shared.roadmapp.userId = data.userId;

      },
      function (err) {
          console.error("comm FAIL");
      }
  );
}

  /******* DIALOG **********************************************/
  //not used yet
  //missing inputs

  var alert;

  $scope.hasAlert = function() { return !!alert };

  // Show alert dialog and cache
  // reference to dialog instance
  function showDialog() {
    alert = $mdDialog.alert()
      .title('About your brand new RoadMapp!')
      .content('Please choose a name and description')
      .ok('OK');

    $mdDialog
        .show( alert )
        .finally(function() {
          alert = undefined;
        });

  }
  // Close the specified dialog instance
  function closeDialog() {
    $mdDialog.hide( alert, "finished" );
    alert = undefined;
  }

  /*************************************************************/
  /****************** MAP **************************************/

  $scope.map = {};

  //retreive map
  leafletData.getMap().then(function(map) {
          $scope.map = map;
      //set itinerary
      $scope.shared.itinerary = L.Routing.control({
          //no waypoints yet
          waypoints: [
              null
          ],
          //lineOptions: $scope.lineOptions,
          //allows us not to instanciate marker when creating an itinerary
          createMarker: function() { return null; },
          //hide instructions list
          show: false
      }).addTo($scope.map);
  });

  var center = {
    x : 29,
    y : -4,
    z : 3
  };

  if($routeParams.c) {
    var newCenter = $routeParams.c.split(":");
    center.x = newCenter[0];
    center.y = newCenter[1];
    center.z = newCenter[2];
  }

  $scope.$on("centerUrlHash", function(event, centerHash) {
    $location.search({ c : centerHash });
  });

  angular.extend($scope, {
     defaults: {
          tileLayer: 'http://tile.mapsquare.io/{z}/{x}/{y}.png',
          minZoom: 3,
          zoomControl: true,
          zoomControlPosition: 'topright',
          bounceAtZoomLimits: true
      },
      layers: {
          baselayers: {
              xyz: {
                  name: 'normal',
                  url: 'http://tile.mapsquare.io/{z}/{x}/{y}.png',
                  type: 'xyz'
              },
              streets: {
                  name: "Streets",
                  type: "agsBase",
                  layer: "Streets",
                  visible: false
              },
              topo: {
                  name: "World Topographic",
                  type: "agsBase",
                  layer: "Topographic",
                  visible: false
              },
              national: {
                  name: "National Geographic",
                  type: "agsBase",
                  layer: "NationalGeographic",
                  maxZoom: 12,
                  visible: false
              },
              oceans: {
                  name: "Oceans",
                  type: "agsBase",
                  layer: "Oceans",
                  maxZoom: 10,
                  visible: false
              },
              gray: {
                  name: "Gray",
                  type: "agsBase",
                  layer: "Gray",
                  visible: false
              },
              darkgray: {
                  name: "DarkGray",
                  type: "agsBase",
                  layer: "DarkGray",
                  visible: false
              },
              imagery: {
                  name: "Imagery",
                  type: "agsBase",
                  layer: "Imagery",
                  maxZoom: 18,
                  visible: false
              },
              shadedrelief: {
                  name: "ShadedRelief",
                  type: "agsBase",
                  layer: "ShadedRelief",
                  visible: false
              },
              terrain: {
                  name: "Terrain",
                  type: "agsBase",
                  layer: "Terrain",
                  maxZoom: 9,
                  visible: false
              }
          }
      },
      center: {
          lat: 48.86,
          lng: 2.34,
          zoom: 6
      },
      events: {
        markers: {
            enable: leafletMarkerEvents.getAvailableEvents(),
        }
      }
  });

  //markers event manager
  $scope.eventDetected = "none";
  var markerEvents = leafletMarkerEvents.getAvailableEvents();
  for (var k in markerEvents){
      var eventName = 'leafletDirectiveMarker.' + markerEvents[k];
      $scope.$on(eventName, function(event, args){
          $scope.eventDetected = event.name;
          switch($scope.eventDetected) {
              case 'leafletDirectiveMarker.click':
                  //get targeted markerl and open edit menu
                  $scope.shared.currentMarker = $scope.markers[args.leafletObject.options.mIndex];
                  //save marker in case of cancelation
                  $scope.shared.markerBackUp = angular.copy($scope.shared.currentMarker);
                  //open edit menu
                  toggleRightMenu('marker-update');
                  break;
              case 'leafletDirectiveMarker.mouseover':
                  break;
              default:
          }

      });
  }

  //click-on-map managger
  $scope.$on("leafletDirectiveMap.click", function(event, args){

    var leafEvent = args.leafletEvent;

    //create marker
    $scope.shared.currentMarkerIndex++;
    $scope.shared.currentMarker = factory.workingMarkerCreation(leafEvent.latlng.lat,leafEvent.latlng.lng, "no name", $scope.shared.currentMarkerIndex);

    //add marker to array
    $scope.markers[$scope.shared.currentMarkerIndex] = $scope.shared.currentMarker;

    $scope.addWayPoint($scope.shared.currentMarker);

    //open marker edit menu
    toggleRightMenu('marker-save');

  });

  /*************************************************************/
  /******************* ITINERARY *******************************/

  $scope.updateWayPoints = function(){

    $scope.shared.wayPoints = [];

    for(var key in $scope.markers){
      var marker = $scope.markers[key];
      var latlng = [marker.lat, marker.lng];
      $scope.shared.wayPoints.push(latlng);
    }

    $scope.shared.itinerary.setWaypoints($scope.shared.wayPoints);

  }

    $scope.deleteWayPoint = function(markerIndex){

        $scope.shared.wayPoints.splice(markerIndex - 1, 1);

        $scope.shared.itinerary.setWaypoints($scope.shared.wayPoints);

    }

    $scope.addWayPoint = function(marker){

        var latlng = [marker.lat, marker.lng];
        $scope.shared.wayPoints.push(latlng);

        $scope.shared.itinerary.setWaypoints($scope.shared.wayPoints);

    }

    $scope.displayInstructions = function(isDisplayed){
      if(isDisplayed){
        $scope.shared.itinerary.show();
      }
      else {
        $scope.shared.itinerary.hide();
      }
    }

  /*************************************************************/
  /******************* SAVE/UPDATE ROADMAPP ********************/

  $scope.saveRoadMapp = function() {
    toggleRightMenu('roadmapp-save');
  };

  /*************************************************************/
  /************************* MARKERS **************************/

  $scope.editMarker = function(marker){
    //set marker as current one and open edit panel
    $scope.shared.currentMarker = marker;
    $scope.shared.markerBackUp = angular.copy($scope.shared.currentMarker);
    toggleRightMenu('marker-update');
  }

  /*************************************************************/
  /************************* SIDE NAV **************************/

  function toggleRightMenu(id) {
    $mdSidenav(id).toggle();
  };

});
