'use strict';

var ViewController = function($controller, $routeParams,
  $scope, $q, Viewdb, npdcAppConfig, ViewdbSearchService, $location) {
    'ngInject';


  $controller('NpolarBaseController', {
    $scope: $scope
  });
  $scope.resource = Viewdb;

   let db = $location.path();
   var link =  'https://api.npolar.no' + db.replace("-api","") + '/?q=';
   console.log(link);


  ViewdbSearchService.getValues(link).then(
       function(results) {
          // on success
          $scope.query = results.data;
  });


};


module.exports = ViewController;
