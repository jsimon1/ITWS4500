// Server Initialization
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var TwitterStream = require('twitter-stream-api');
var jsonfile = require('jsonfile');
var file = __dirname + '/tweets.json';

var keys = {
  consumer_key: "Y7jCwzLvbpFhPycBHAbQhrPXX",
  consumer_secret: "mhNWtWfYpCShqOI5xVpHIDJAkmHl3I9ooecF4rNQiUKH7FAbQa",
  token: "93556211-5ZhDPOVtMtUbHZ1i4Dnk2QnrI5zI7D5bPbRrcSPmf",
  token_secret: "F3vC3cVIpDX8aVUD45eRpjeRy5rSAremr4GDIccqPMXOv"
};

// Server Routing
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/loadTweets.js', function(req, res){
  res.sendFile(__dirname + '/js/loadTweets.js');
});

app.get('/tweets.json', function(req, res){
  res.sendFile(__dirname + '/tweets.json');
});

app.get('/css/bootstrap.css', function(req, res){
  res.sendFile(__dirname + '/css/bootstrap.css');
});

app.get('/css/styles.css', function(req, res){
  res.sendFile(__dirname + '/css/styles.css');
});

// Socket Handlers
io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  //Kick off connectTwitter function when load is triggered from client
  socket.on('load', function(data){
    connectTwitter(data['query'],data['quantity']);
  });
});


function connectTwitter(query,quantity){
  //Open up twitter stream
  var Twitter = new TwitterStream(keys);
  if(query){
    Twitter.stream('statuses/filter', {
      track: query
    });
  }
  else{
    console.log("nothing");
    Twitter.stream('statuses/filter', {
      locations: [-73.68,42.72,-73.67,42.73]
    });
  }
  Twitter.on('connection success', function (uri) {
    console.log('connection success', uri);
  });

  //Counter for tweets retrieved from stream and array of those tweets
  var twitter_count = 0;
  var tweets = [];
  //Triggers whenever the Twitter object recieves a new tweet
  Twitter.on('data', function (obj) {
    //Sometimes the API retrieves a null object, lets ignore that
    if(obj){
      tweets.push(obj);
      //Counter on tweets streamed
      twitter_count++;
    }

    //Once we have enough tweets, write the array of tweets to file tweets.json and close the stream. Then emit to the client that it can now load the JSON file for display
    if(twitter_count>=quantity){
      var jsonTweets = JSON.stringify(tweets);
      fs.writeFile(__dirname+'/tweets.json', jsonTweets);
      Twitter.close();
      io.emit('finishLoad');
      return 0;
    }   
  });
}

// start server
http.listen(3000, function(){
  console.log('Server up on *:3000');
});