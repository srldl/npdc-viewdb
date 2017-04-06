'use strict';

var ViewdbShowController = function($controller, $routeParams,
  $scope, $q, Viewdb, npdcAppConfig) {
    'ngInject';


  $controller('NpolarBaseController', {
    $scope: $scope
  });
  $scope.resource = Viewdb;


  //Show map in Antarctica
  $scope.mapOptions = {};
  $scope.mapOptions.color = "#FF0000";


  let show = function() {

    $scope.show().$promise.then((viewdb) => {

      //Overlay the map with lat,lng
      $scope.mapOptions.coverage = [[[viewdb.latitude,geologySample.longitude],[geologySample.latitude,geologySample.longitude]]];
      $scope.mapOptions.geojson = "geojson";

      $scope.document.lithology =  convert($scope.document.lithology);

    });

  };

  show();

};

/* convert from camelCase to lower case text*/
function convert(str) {
       var  positions = '';

       for(var i=0; i<(str).length; i++){
           if(str[i].match(/[A-Z]/) !== null){
             positions += " ";
             positions += str[i].toLowerCase();
        } else {
            positions += str[i];
        }
      }
        return positions;
}

module.exports = ViewdbShowController;
