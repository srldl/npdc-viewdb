'use strict';

var router = function($routeProvider, $locationProvider) {
  'ngInject';

  $locationProvider.html5Mode(true).hashPrefix('!');

  $routeProvider.when('/geology/sample', {
    templateUrl: 'show/viewdb.html',
    controller: 'ViewdbShowController'
  }).when('/course', {
    templateUrl: 'show/viewdb.html',
    controller: 'ViewdbShowController',
    reloadOnSearch: false
  }).when('/expedition', {
    templateUrl: 'show/viewdb.html',
    controller: 'ViewdbShowController',
    reloadOnSearch: false
  }).when('/viewdb', {
    templateUrl: 'show/viewdb.html',
    controller: 'ViewdbShowController',
    reloadOnSearch: false
  }).when('/', {
    templateUrl: 'search/search.html',
    controller: 'ViewdbSearchController',
    reloadOnSearch: false
  });
};

module.exports = router;
