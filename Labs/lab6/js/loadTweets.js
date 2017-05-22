// Instantiate the myApp Angular application that we attached to out html tag
var app = angular.module("myApp", ['ngAnimate']);
var socket = io();

// Here is the Javascript for our controller which we linked (scoped) to the body tag
app.controller("mainController", ['$scope','$http','$timeout',function($scope, $http,$timeout) {
  var tweets = [];
  $scope.loadTweets = function() {
    //Send load signal to server when client triggers loadTweets event on button
    socket.emit('load', {'query':$scope.query,'quantity':$scope.quantity});
    socket.on('finishLoad',function(data){
      alert("Tweets recieved, press export to save tweets to a file");
      tweets = data;
      tweetLoop(0);

      function loadTweets(index){
        var done = false;
        if(index<data.length){
          $scope.tweet1 = data[index].text;
        }
        else{
          done = true;
        }
        if(index+1<data.length){
          $scope.tweet2 = data[index+1].text;
        }
        else{
          done = true;
        }
        if(index+2<data.length){
          $scope.tweet3 = data[index+2].text;
        }
        else{
          done = true;
        }
        if(index+3<data.length){
          $scope.tweet4 = data[index+3].text;
        }
        else{
          done = true;
        }
        if(index+4<data.length){
          $scope.tweet5 = data[index+4].text;
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
  };
  $scope.exportTweets = function(){
    if(tweets.length == 0){
      alert("Please load some tweets before exporting");
    }
    else{
      if($('#exportOption').val()=='json'){
        socket.emit('exportJSON',tweets);
      }
      if($('#exportOption').val()=='csv'){
        socket.emit('exportCSV',tweets);
      }
    }
  }

  socket.on('overwrite',function(data){
    alert("File being overwritten at "+ data);
  });

  socket.on('exportFinish',function(){
    alert("File has been created");
  });
}]);

