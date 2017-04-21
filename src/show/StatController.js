'use strict';

var StatController = function($controller, $routeParams,
  $scope, $q, Viewdb, npdcAppConfig, ViewdbSearchService, $location) {
    'ngInject';


  $controller('NpolarBaseController', {
    $scope: $scope
  });
  $scope.resource = Viewdb;

   let db = $location.path();
   var link =  'https://api.npolar.no' + db.replace("-api/stat","") + '/?q=';
   console.log(link);


  ViewdbSearchService.getValues(link).then(
       function(results) {
          // on success
          var res = results.data;
          //Summarize the date results
          var i = 0;
           var num = (res.feed.entries).length;
            while (i < num) {
             console.log(res.feed.entries[i].start_date);
             console.log(res.feed.entries[i].end_date);
             console.log(res.feed.entries[i].people);
             i++;

          }
          $scope.query = results;
  });

};


module.exports = StatController;
