'use strict';

var router = function($routeProvider, $locationProvider) {
  'ngInject';

  $locationProvider.html5Mode(true).hashPrefix('!');

  var $route = $routeProvider.$get[$routeProvider.$get.length-1]({$on:function(){}});


  $routeProvider.when('/viewdb', {
    templateUrl: 'show/viewdb.html',
    controller: 'ViewdbShowController',
    reloadOnSearch: false
  }).when('/', {
    templateUrl: 'search/search.html',
    controller: 'ViewdbSearchController',
    reloadOnSearch: false
  }).when('/db/stat', {
    templateUrl: 'show/stat.html',
    controller: 'StatController',
    reloadOnSearch: false
  }).when('/db', {
    templateUrl: 'show/viewdb.html',
    controller: 'ViewdbShowController',
    reloadOnSearch: false
  });

  //Make route accept different database names
  $route.routes['/db'].regexp = /^\/(([A-Za-z0-9_-]+))$/;
  $route.routes['/db/'].regexp = /^\/(([A-Za-z0-9_-]+))\/$/;
  $route.routes['/db/stat'].regexp = /^\/(([A-Za-z0-9_-]+))\/([stat]+)$/ ;
  $route.routes['/db/stat/'].regexp = /^\/(([A-Za-z0-9_-]+))\/([stat]+)\/$/ ;
};




module.exports = router;
