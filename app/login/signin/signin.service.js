'use strict';

angular.module('loginService', [])
.service('auth', function($http, $q, $httpParamSerializer) {

	var container={
		grantPassword:grantPassword
	};


	function grantPassword(user) {
		var deferred = $q.defer();

		// request parameters
		var data =	{
			grant_type:"password",
			username: user.email,
			password: user.password,
			client_id: "client"
		};

		// client_id and client_secret encoded base64
		var encoded = btoa("client:secret");

		// To satisfy grant type password request we set data username with user email
		var req = {
			method: 'POST',
			url: "http://localhost:8080/oauth/token",
			headers: {
				"Authorization": "Basic " + encoded,
				"Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
			},
			data: $httpParamSerializer(data)
		}

		$http(req)
		.success(function(data){
			deferred.resolve(data);
		})
		.error(function(err){
			deferred.reject(err);
		});

		return deferred.promise;

	}

	return container;

});
