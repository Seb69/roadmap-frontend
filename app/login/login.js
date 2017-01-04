'use strict';

angular.module('angularRoadmappLogin', [
        'ngAnimate',
        'ngRoute',
        'ngMaterial',
        'ngMdIcons',
        'loginService',
        'ngResource',
        'LocalStorageModule'
    ])
    .config(function ($routeProvider) {

        $routeProvider.
        when('/signin', {
            templateUrl: 'signin/signin.html',
            controller: 'SigninCtrl'
        }).
        when('/signup', {
            templateUrl: 'signup/signup.html',
            controller: 'SignupCtrl'
        }).
        when('/test', {
            templateUrl: 'test/test.html',
            controller: 'TestCtrl'
        }).
        otherwise({
            redirectTo: '/signin'
        });

    });
