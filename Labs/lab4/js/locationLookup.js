var app = angular.module("myApp", []);
app.controller("mainController", ['$scope','$http',function($scope, $http) {
  $scope.loc;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
      $scope.$apply(function(){
        $scope.loc = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
      });
    });
  }

  function cycleResults(results){

  }

  function callback(results, status) {
    console.log(results);
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      //Since websites might not be available in a result, we first check and see if it exists, otherwise output "No website"
      var websites = [results[0].website,results[1].website,results[2].website,results[3].website,results[4].website,results[5].website,results[6].website];
      for(i = 0; i < 6; i++){
        if(websites[i]===undefined){
          websites[i] = "No website"
        }
      }
      $("#result1").text(results[0].name+" "+results[0].formatted_address+" "+websites[i]);
      $("#result2").animate({top: '131px'});
      $("#result2").text(results[0].name+" "+results[0].formatted_address+" "+websites[i]);
      $("#result3").animate({top: '262px'});
      $("#result4").animate({top: '393px'});
      $("#result5").animate({top: '524px'});
      $("#result6").animate({top: '655px'});
    }

    cycleResults(results);
  }
  $( "#searchButton" ).click(function() {
    $scope.lookup = $("#search").val();
    map = new google.maps.Map(document.getElementById('map'), {
      center: $scope.loc,
      zoom: 15
    });
    $scope.request = {
      location: $scope.loc,
      radius: '9656',
      query: $scope.lookup
    };
    $scope.service = new google.maps.places.PlacesService(map);
    $scope.service.textSearch($scope.request,callback);
  });
} ]);

