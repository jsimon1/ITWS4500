// Instantiate the myApp Angular application that we attached to out html tag
var app = angular.module("myApp", ['ngAnimate']);
var socket = io();

// Here is the Javascript for our controller which we linked (scoped) to the body tag
app.controller("mainController", ['$scope','$http','$timeout',function($scope, $http,$timeout) {
  var tweets = [];

  //Send load signal to server when client triggers loadTweets event on button, helper function for displayTweets() and loadTweets()
  function streamTweets(cmd){
    //If we haven't streamed the tweets yet, do that and wait until they are recieved, then return them, otherwise just return tweets
    if(tweets.length == 0){
      socket.emit('load', {'query':$scope.query,'quantity':$scope.quantity});
      $('#loading').html("<img width:'2px' height: '2px' src='/css/loading.gif'>");
      socket.on('finishLoad',function(data){
        $('#loading').html("");
        alert("Tweets recieved and loaded into database, press export to save tweets to a file");
        tweets = data;
        if(cmd == 'display'){
          tweetLoop(0);
        }
      });
    }
    if(cmd == 'display'){
      tweetLoop(0);
    }
  }

  //Calls streamTweets with a command to display once tweets are loaded
  $scope.displayTweets = function() {
    //Since either displayTweets() or buildDatabase() can be called first, we check to see if we need to recieve the tweets first
    streamTweets('display');
  };

  $scope.buildDatabase = function(){
    streamTweets('buildDatabase');
  };

  //Called by tweetLoop, will load tweets into the angular variables and applies the changes so they are displayed on the screen
  function loadTweets(index){
    var done = false;
    if(index<tweets.length){
      $scope.tweet1 = tweets[index].text;
    }
    else{
      done = true;
    }
    if(index+1<tweets.length){
      $scope.tweet2 = tweets[index+1].text;
    }
    else{

    }
    if(index+2<tweets.length){
      $scope.tweet3 = tweets[index+2].text;
    }
    else{
      done = true;
    }
    if(index+3<tweets.length){
      $scope.tweet4 = tweets[index+3].text;
    }
    else{
      done = true;
    }
    if(index+4<tweets.length){
      $scope.tweet5 = tweets[index+4].text;
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

  //Resets the page
  $scope.reset = function(){
    location.reload();
  }
  //Handles the event for a user exporting tweets
  $scope.exportTweets = function(){
    var fname = $('#fName').val();
    if (fname.length==0){
      fname = 'simonj10-tweets';
    }
    //Data being passed is the user input file name, the output type they selected, and the query for the tweets
    var data = []
    if($('#exportOption').val()=='json'){
      data = [fname,'json',$scope.query];
    }
    if($('#exportOption').val()=='csv'){
      data = [fname,'csv',$scope.query];
    }
    if($('#exportOption').val()=='xml'){
      data = [fname,'xml',$scope.query];
    }
    
    socket.emit('export',data);
  }

  socket.on('overwrite',function(data){
    alert("File being overwritten at "+ data);
  });

  socket.on('exportFinish',function(data){
    alert("File has been created at "+data);
  });
}]);

