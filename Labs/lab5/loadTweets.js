// Instantiate the myApp Angular application that we attached to out html tag
var app = angular.module("myApp", ['ngAnimate']);
var socket = io();

// Here is the Javascript for our controller which we linked (scoped) to the body tag
app.controller("mainController", ['$scope','$http','$timeout',function($scope, $http,$timeout) {
  $scope.loadTweets = function() {
    //Send load signal to server when client triggers loadTweets event on button
    socket.emit('load', {'query':$scope.query,'quantity':$scope.quantity});
    socket.on('finishLoad',function(){
      //get JSON file when server sends finish signal
      $http({
        method: 'GET',
        url: '/tweets.json'
      }).then(function successCallback(data) {
        console.log(data);
        tweetLoop(0);

      function loadTweets(index){
        var done = false;
        if(index<data.data.length){
          $scope.tweet1 = data.data[index].text;
        }
        else{
          done = true;
        }
        if(index+1<data.data.length){
          $scope.tweet2 = data.data[index+1].text;
        }
        else{
          done = true;
        }
        if(index+2<data.data.length){
          $scope.tweet3 = data.data[index+2].text;
        }
        else{
          done = true;
        }
        if(index+3<data.data.length){
          $scope.tweet4 = data.data[index+3].text;
        }
        else{
          done = true;
        }
        if(index+4<data.data.length){
          $scope.tweet5 = data.data[index+4].text;
        }
        else{
          done = true;
        }
        if(!$scope.$$phase) {
          $scope.$apply();
        }
        return done;
      }
      //tweetLoop is a function that calls other functions and pauses 3 seconds at the end before repeating
      function tweetLoop(x){
        var reset = loadTweets(x);
        if(reset){
          x = 0;
        }
        setTimeout(function(){
         tweetLoop(x+5)
        }, 3000);
      }

     }, function errorCallback(response) {});
    });
  };
}]);

