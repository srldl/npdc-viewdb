'use strict';

var ViewdbShowController = function($controller, $routeParams,
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
          $scope.query =  results.data;
          console.log($scope.query);
  });

  let show = function() {
    //  var link = 'https://apptest.data.npolar.no:3000/service/_ids.json';
    // var link = "http://dbmaster.data.npolar.no:5984/_utils/document.html?api_service/" + db - get next link from this doc
    ViewdbSearchService.getValues(link).then(
       function(results) {
        console.log(results.data);
        return(results.data);
    });
  };

//var pp = show();
//console.log(pp);

};


module.exports = ViewdbShowController;
