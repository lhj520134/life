'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.doctor',
    'myApp.question',
    'myApp.truancy',
    'myApp.version',
    'myApp.sign',
    'myApp.import',
    'myApp.student'

]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/view2'});
    }]). constant('SERVER', {
        // Local server
        URL: 'http://113.31.89.204:3030'
        // Public Heroku server
        //url: 'https://ionic-songhop.herokuapp.com'
    })

