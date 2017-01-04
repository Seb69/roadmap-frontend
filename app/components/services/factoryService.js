'use strict';

angular.module('factoryService', [])
.factory('factory', function () {

	var factory = {
		roadMappCreation: roadMappCreation,
		workingMarkerCreation: workingMarkerCreation,
		markerCreation: markerCreation,
		mapToArray: mapToArray
	};

	function roadMappCreation(title,description){
		var roadMapp = {};
		// Title of roadmapp
		roadMapp.title = title;
		// Description of roadmapp
		roadMapp.description = description;

		return roadMapp;
	};

	// Marker formated for server communication
	function markerCreation(lat, lng, title, index){
		var marker = {};
		// Roadmapp id
		marker.roadmappId = "";
		// Lat
		marker.lat = lat;
		// Long
		marker.lng = lng;
		// Description
		marker.title = title;
		// Marker index
		marker.mIndex = index;
		return marker;
	}

	// Marker to play with on client side
	function workingMarkerCreation(lat, lng, title, index){
		var wMarker = {};
		// Marker id
		wMarker.id = undefined;
		// Roadmapp id
		wMarker.roadmappId = "";
		// Lat
		wMarker.lat = lat;
		// Long
		wMarker.lng = lng;
		// Marker title
		wMarker.title = title;
		// Marker description
		wMarker.description = "";
		// Marker index
		wMarker.mIndex = index;

		wMarker.isPartofRM = false;

		/**** possible options for the marker ***/
		wMarker.focus = true;
		wMarker.draggable = false;

		wMarker.icon = {};
		wMarker.icon = {
        markerColor: 'red'
    }

		return wMarker;
	}

	function mapToArray(map){
		var contentArray=[];
		var key;
		for(key in map) {
			contentArray.push(map[key]);
		}
		return contentArray;
	};

	return factory;
});
