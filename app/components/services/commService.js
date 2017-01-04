'use strict';

angular.module('commService', [])
.service('comm', ['$q', '$http', function($q, $http) {

	var comm = {
		postRoadMapp: postRoadMapp,
		putRoadMapp: putRoadMapp,
		getRoadmapps: getRoadmapps,
		postMarker: postMarker,
		putMarker: putMarker,
		deleteMarker: deleteMarker,
		getMarker: getMarker,
		deleteRoadMapp: deleteRoadMapp
	};


	/** ROADMAPPS **/
	function postRoadMapp(roadmapp) {

		var resp = angular.toJson(roadmapp);
		var deferred = $q.defer();

		var req = {
			method: 'POST',
			url: 'http://localhost:8080/api/roadmapps',
			headers: {'Accept': 'application/json'},
			data: resp
		}

		$http(req).success(function (data) {
			deferred.resolve(data);
		}).
		error(function (err) {
			deferred.reject(err);
		});

		return deferred.promise;
	};

	function putRoadMapp(id, roadmapp) {

		var resp = angular.toJson(roadmapp);
		var deferred = $q.defer();

		var req = {
			method: 'PUT',
			url: 'http://localhost:8080/api/roadmapps/' + id,
			headers: {'Accept': 'application/json'},
			data: resp
		}

		$http(req).success(function (data) {
			deferred.resolve(data);
		}).
		error(function (err) {
			deferred.reject(err);
		});

		return deferred.promise;
	};

	function getRoadmapps(id){

		var deferred = $q.defer();

		if (id) {
			var req = {
				method: 'GET',
				url: 'http://localhost:8080/api/roadmapps/' + id,
				headers: {'Content-Type': 'application/json'}
			}
		}
		else {
			var req = {
				method: 'GET',
				url: 'http://localhost:8080/api/roadmapps/',
				headers: {'Content-Type': 'application/json'}
			}
		}
		$http(req).success(function (data) {
			deferred.resolve(data);
		}).
		error(function(err) {
			deferred.reject(err);
		});
		return deferred.promise;

	};

	function deleteRoadMapp(id) {

		var deferred = $q.defer();

		var req = {
			method: 'DELETE',
			url: 'http://localhost:8080/api/roadmapps/' + id,
			headers: {'Content-Type': 'application/json'}
		}

		$http(req).success(function (data) {
			deferred.resolve(data);
		}).
		error(function (err) {
			deferred.reject(err);
		});

		return deferred.promise;
	};

	/** MARKERS **/
	function postMarker(marker) {

		var resp = angular.toJson(marker);
		var deferred = $q.defer();

		var req = {
			method: 'POST',
			url: 'http://localhost:8080/api/markers',
			headers: {'Content-Type': 'application/json'},
			data: resp
		}

		$http(req).success(function (data) {
			deferred.resolve(data);
		}).
		error(function (err) {
			deferred.reject(err);
		});

		return deferred.promise;
	};

	function putMarker(id, marker) {

		var resp = angular.toJson(marker);
		var deferred = $q.defer();

		var req = {
			method: 'PUT',
			url: 'http://localhost:8080/api/markers/' + id,
			headers: {'Content-Type': 'application/json'},
			data: resp
		}

		$http(req).success(function (data) {
			deferred.resolve(data);
		}).
		error(function (err) {
			deferred.reject(err);
		});

		return deferred.promise;
	};

	function deleteMarker(id) {

		var deferred = $q.defer();

		var req = {
			method: 'DELETE',
			url: 'http://localhost:8080/api/markers/' + id,
			headers: {'Content-Type': 'application/json'}
		}

		$http(req).success(function (data) {
			deferred.resolve(data);
		}).
		error(function (err) {
			deferred.reject(err);
		});

		return deferred.promise;
	};

function getMarker(id){

	var deferred = $q.defer();

	if(id != null){
		var req = {
			method:'GET',
			url:'http://localhost:8080/api/markers/' + id ,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}
	}
	else {
		var req = {
			method:'GET',
			url:'http://localhost:8080/api/markers',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}
	}

	$http(req).success(function(marker, status, headers, config) {
		deferred.resolve(marker);
	}).
	error(function(marker, status, headers, config) {
		deferred.reject(status);
	});
	return deferred.promise;

};

	/** USERS **/
	/** TODO **/

	return comm;

}]);
