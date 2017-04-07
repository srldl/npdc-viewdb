'use strict';

var ViewdbShowController = function($controller, $routeParams,
  $scope, $q, Viewdb, npdcAppConfig, ViewdbSearchService) {
    'ngInject';


  $controller('NpolarBaseController', {
    $scope: $scope
  });
  $scope.resource = Viewdb;


  let show = function() {
       console.log("hei");

      //  var link = 'https://apptest.data.npolar.no:3000/service/_ids.json';
      var link = "https://api.npolar.no/expedition/?q=&facets=topics,code";


     ViewdbSearchService.getValues(link).then(
       function(results) {
        return(results.data);
  });

  };

var pp = show();
console.log(pp);

};


module.exports = ViewdbShowController;
