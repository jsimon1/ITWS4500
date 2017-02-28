// Server Initialization
var app = require('express')();
var http = require('http').Server(app);
var fs = require('fs');
var TwitterStream = require('twitter-stream-api');

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


function connectTwitter(){
  var Twitter = new TwitterStream(keys);
  Twitter.stream('statuses/filter', {
      track: 'Trump',
      locations: '-74,40,-73,41'
  });
  Twitter.on('connection success', function (uri) {
    console.log('connection success', uri);
  });
  var twitter_count = 0;
  Twitter.on('data', function (obj) {
    fs.writeFile("tweets.json",obj, function(err) {
      if(err) {
          return console.log(err);
      }

      console.log("The file was saved!");
    }); 
    twitter_count++;
    /*Handling tweet limit will be implemented once client script is made
  });
}
/* Keeping this for now
// user connected even handler
io.on('connection', function(socket){
  
  // log & brodcast connect event
  console.log('a user connected');
  
  // log disconnect event
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  
  // message received event handler
  socket.on('message', function(msg){
    // log chat msg
    console.log('message: ' + msg);
    
    // broadcast chat msg to others
    socket.broadcast.emit('message', msg);
    
    // save message to db
    var message = new Message ({
      message : msg
    });
    message.save(function (err, saved) {
      if (err) {
  return console.log('error saving to db');
      }
    })
  });
});*/

// start server

http.listen(3000, function(){
  console.log('Server up on *:3000');
  connectTwitter();
  //getInfo();
});