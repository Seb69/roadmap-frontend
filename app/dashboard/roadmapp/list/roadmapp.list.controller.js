'use strict';

angular.module('angularRoadmappDashboard')
.controller('RoadmappListCtrl', function ($scope, $location, $routeParams, $route, leafletData, factory, $mdSidenav, comm, $window, $mdDialog, leafletMarkerEvents, leafletLogger) {


$scope.roadmapps = [];
$scope.custumroadmapp = {};
//marker array
$scope.markers = new Array();

  //roadmapp

	$scope.onAllRoadMap = function() {

		comm.getRoadmapps().then(
			function(data){
				$scope.roadmapps = data;
				console.log(data);
			},
			function(err){
				console.error(err);
			}
		);
	}

	$scope.editRoadmapp = function(roadmappId) {
		$window.location.href = "#/roadmapps/" + roadmappId;
	}

	$scope.onDelete = function(id) {
		console.log("delete function");

		comm.deleteRoadMapp(id).then(
			function(data){
				$scope.onAllRoadMap();
			},
			function(err){
				console.error(err);
			}
		);
	}

});
