'use strict';

angular.module('angularRoadmappDashboard', [
        'ngResource',
        'ngSanitize',
        'ngAnimate',
        'ngMessages',
        'ngRoute',
        'ngMaterial',
        'ngMdIcons',
        'nemLogging',
        'ui-leaflet',
        'factoryService',
        'commService',
        'LocalStorageModule',
        'httpInterceptorFactory'
    ])
    .config(function ($routeProvider, $httpProvider) {

        // Use factory httpInterceptor to check call to api and add token if needed.
        $httpProvider.interceptors.push('httpInterceptor');

        var resolveCurrentUser = {
            'currentUser': function ($http, localStorageService, $window, $rootScope) {
                $rootScope.ACCESS_TOKEN = 'Bearer ' + localStorageService.get("access_token");
                // To satisfy grant type password request we set data username with user email
                var req = {
                    method: 'GET',
                    url: "http://localhost:8080/api/users/current",
                    headers: {"Content-Type": "application/json"}
                }

                $http(req)
                    .success(function (data) {
                        $rootScope.CURRENT_USER = data;
                    })
                    .error(function (err) {
                        $window.location.href = "/login/";
                    });
            }
        }

        $routeProvider.
        when('/', {
            templateUrl: 'home/home.html',
            controller: 'HomeCtrl',
            resolve: resolveCurrentUser
        }).
        when('/roadmapps/list', {
            templateUrl: 'roadmapp/list/views/roadmapp.list.html',
            controller: 'RoadmappListCtrl',
            resolve: resolveCurrentUser
        }).
        when('/roadmapps/new', {
            templateUrl: 'roadmapp/edit/views/roadmapp-edit.html',
            controller: 'RoadmappEditCtrl',
            reloadOnSearch: false,
            resolve: resolveCurrentUser
        }).
        when('/roadmapps/:roadmappId', {
            templateUrl: 'roadmapp/edit/views/roadmapp-edit.html',
            controller: 'RoadmappEditCtrl',
            reloadOnSearch: false,
            resolve: resolveCurrentUser
        }).
        otherwise({
            redirectTo: '/'
        });

    });
