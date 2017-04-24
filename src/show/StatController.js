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


  ViewdbSearchService.getValues(link).then(
       function(results) {
           // on success
           var res = results.data;
           //Summarize the date results
           var num = (res.feed.entries).length;

           //type_arr holds all dates for type (cruise or fieldwork)
           var type_arr = Array.apply(null, Array(2)).map(Number.prototype.valueOf,0);

           for (var i = 0; i < num; i++) {
             var entry = res.feed.entries[i];

             // var activity_arr = [];
             let t_arr = entry.type === 'cruise' ?  0 : 1;

           //  console.log(res.feed.entries[i].activity[0].activity_type);
             //Create activity array counting up days per option
     /*        let a_arr = ( {
                "research": 1,
                "monitoring": 2,
                "mapping": 3,
                "outreach VIP": 4,
                "education": 5,
                "logistic operations": 6,
                "other": 7
              } )[ res.feed.entries[i].activity[0].activity_type ] || 0;
             console.log(a_arr);
             console.log("vvvvvv"); */

             //Find date diff between start and end date
             var diff =  Math.floor( ((Date.parse(entry.end_date)) - (Date.parse(entry.start_date))) / 86400000);

             //If people listed
             if (typeof entry.people !== 'undefined') {
               //Traverse through people
               for (var j = 0; j < entry.people.length; j++) {
                 type_arr[t_arr] =  type_arr[t_arr] + diff;

              } //for j
             }
             console.log(type_arr);
             $scope.type_arr = type_arr;


          } //for i
          $scope.query = results;
  });

};


module.exports = StatController;
