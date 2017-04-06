'use strict';


var ViewdbSearchController = function ($scope, $location, $controller, $filter, NpolarApiSecurity, Viewdb, npdcAppConfig,  NpdcSearchService, NpolarTranslate) {
  'ngInject';

  $controller('NpolarBaseController', { $scope: $scope });
  $scope.resource = Viewdb;

   npdcAppConfig.search.local.results.detail = (entry) => {
     let r = (entry.title) + " - " +(entry.placename) + ", " + (entry.collected_year);
     return r;
 };

  npdcAppConfig.search.local.results.subtitle = "type";

  //replace with get
  let query = function() {
    let defaults = {
      limit: "50",
      sort: "-draft='no',updated", //non-drafts should be viewed first
      fields: 'lithology,title,id,collected_year,collection,@placename,files,draft',
      facets: 'lithology,title,collected_year'};

    let invariants = $scope.security.isAuthenticated() ? {} : {} ;
    return Object.assign({}, defaults, invariants);
  };

  $scope.search(query());

  $scope.security = NpolarApiSecurity;
  $scope.base_user = NpolarApiSecurity.canonicalUri('/geology');


  $scope.$on('$locationChangeSuccess', (event, data) => {
    $scope.search(query());
  });

};

module.exports = ViewdbSearchController;
