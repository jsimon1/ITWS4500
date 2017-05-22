var app = angular.module("myApp", []);
app.controller("mainController", ['$scope','$http',function($scope, $http) {
  $scope.loc;
  //Get the location of the user and set the location variable
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
      $scope.$apply(function(){
        $scope.loc = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
      });
    });
  }

  //Handles the weather API JSONP call and sets the variables for angular to apply to the view
  function weatherLookup(){
    var urlCall = "https://api.darksky.net/forecast/0d17dd4babb710edb8f4ce2adf5bb4c2/"+$scope.loc.lat()+","+$scope.loc.lng()+"?callback=JSON_CALLBACK";
    $http.jsonp(urlCall).then(function(results){
      $scope.summText = "Report: "+results.data.currently.summary;
      $scope.temp = results.data.currently.temperature+" "+String.fromCharCode(176) + "F";
      $scope.precipProb = results.data.currently.precipProbability*100+"%";
      $scope.humidity = results.data.currently.humidity*100+"%";
      $scope.windSpeed = results.data.currently.windSpeed+" miles/hour"
      if(!$scope.$$phase) {
        $scope.$apply();
      }
    });
  }

  function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      //Since websites might not be available in a result, we first check and see if it exists, otherwise output "No website"
      var websites = [results[0].website,results[1].website,results[2].website,results[3].website,results[4].website,results[5].website,results[6].website];
      for(i = 0; i < 6; i++){
        if(angular.isUndefined(websites[i])){
          websites[i] = "No website";
        }
      }
      //Setting all of the fields to be pushed by angular
      $scope.name = results[0].name;
      $scope.address = results[0].formatted_address;
      $scope.website = websites[i];

      $scope.name1 = results[1].name;
      $scope.address1 = results[1].formatted_address;
      $scope.website1 = websites[i+1];

      $scope.name2 = results[2].name;
      $scope.address2 = results[2].formatted_address;
      $scope.website2 = websites[i+2];

      $scope.name3 = results[3].name;
      $scope.address3 = results[3].formatted_address;
      $scope.website3 = websites[i+3];

      $scope.name4 = results[4].name;
      $scope.address4 = results[4].formatted_address;
      $scope.website4 = websites[i+4];

      $scope.name5 = results[5].name;
      $scope.address5 = results[5].formatted_address;
      $scope.website5 = websites[i+5];
      $("#result1").animate({top: '131px'});
      $("#result2").animate({top: '262px'});
      $("#result3").animate({top: '393px'});
      $("#result4").animate({top: '524px'});
      $("#result5").animate({top: '655px'});
      if(!$scope.$$phase) {
        $scope.$apply();
      }
    }
  }
  //When button is clicked, run weather and google  maps APIs
  $scope.searchButton = function(){
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

    weatherLookup();
    $scope.service = new google.maps.places.PlacesService(map);
    $scope.service.textSearch($scope.request,callback);
  }
} ]);

