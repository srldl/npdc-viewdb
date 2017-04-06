'use strict';
var npdcCommon = require('npdc-common');
var AutoConfig = npdcCommon.AutoConfig;

var angular = require('angular');
require('npdc-common/src/wrappers/leaflet');

var npdcViewdbApp = angular.module('npdcViewdbApp', ['npdcCommon','leaflet']);

npdcViewdbApp.controller('ViewdbShowController', require('./show/ViewdbShowController'));
npdcViewdbApp.controller('ViewdbSearchController', require('./search/ViewdbSearchController'));
npdcViewdbApp.directive('viewdbCoverage', require('./edit/coverage/coverageDirective'));

// Bootstrap ngResource models using NpolarApiResource
var resources = [
  {'path': '/', 'resource': 'NpolarApi'},
  {'path': '/user', 'resource': 'User'},
  {'path': '/viewdb', 'resource': 'ViewdbResource'}
];

resources.forEach(service => {
  // Expressive DI syntax is needed here
  npdcViewdbApp.factory(service.resource, ['NpolarApiResource', function (NpolarApiResource) {
  return NpolarApiResource.resource(service);
  }]);
});

// Routing
npdcViewdbApp.config(require('./router'));

npdcViewdbApp.config(($httpProvider, npolarApiConfig) => {
  var autoconfig = new AutoConfig("production");
  angular.extend(npolarApiConfig, autoconfig, { resources });
  console.debug("npolarApiConfig", npolarApiConfig);

  $httpProvider.interceptors.push('npolarApiInterceptor');
});

npdcViewdbApp.run(( npdcAppConfig, NpolarTranslate) => {
  npdcAppConfig.help = { uri: 'https://github.com/npolar/npdc-viewdb/wiki' };
  NpolarTranslate.loadBundles('npdc-viewdb');
});

//  NpolarTranslate.loadBundles('npdc-geology');
//  npdcAppConfig.toolbarTitle = NpolarTranslate.translate('Norwegian polar geological sample archive');
//});
