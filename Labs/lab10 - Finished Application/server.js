// Server Initialization
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var TwitterStream = require('twitter-stream-api');
var jsonfile = require('jsonfile');
var file = __dirname + '/tweets.json';
var json2csv = require('json2csv');
var js2xmlparser = require("js2xmlparser");
var setSchema = true;

//Mongoose setup and MongoDB connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tweets');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
var tweets = [];
//Defining fields for json2csv
var fields = [{
  label: "created_at", value: "created_at", default: "NULL"
},{
  label: "id", value: "id", default: "NULL"
},{
  label: "text", value: "text", default: "NULL"
},{
  label: "user_id", value: "user_id", default: "NULL"
},{
  label: "user_name", value: "user_name", default: "NULL"
},{
  label: "user_screen_name", value: "user_screen_name", default: "NULL"
},{
  label: "user_location", value: "user_location", default: "NULL"
},{
  label: "user_followers_count", value: "user_followers_count", default: "NULL"
},{
  label: "user_friends_count", value: "user_friends_count", default: "NULL"
},{
  label: "user_created_at", value: "user_created_at", default: "NULL"
},{
  label: "user_time_zone", value: "user_time_zone", default: "NULL"
},{
  label: "user_profile_background_color", value: "user_profile_background_color", default: "NULL"
},{
  label: "user_profile_image_url", value: "user_profile_image_url", default: "NULL"
},{
  label: "geo", value: "geo", default: "NULL"
},{
  label: "coordinates", value: "coordinates", default: "NULL"
},{
  label: "place", value: "place", default: "NULL"
}]
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

app.get('/d3.layout.js', function(req, res){
  res.sendFile(__dirname + '/js/d3.layout.js');
});

app.get('/us-states.json', function(req, res){
  res.sendFile(__dirname + '/us-states.json');
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

app.get('/css/loading.gif',function(req,res){
  res.sendFile(__dirname + '/css/loading.gif');
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

  socket.on('queryTweets', function(data){
    var Tweet = get_schema();
    if(data=="all"){
      Tweet.find({}, function(err, tweets) {
        if (!err){ 
            io.emit('queryReturn',tweets);
        } else {throw err;}
      });
    }
    else{
      Tweet.find({keyword: data},function (err, tweets) {
        if (err) return console.error(err);
        io.emit('queryReturn',tweets);
      });
    }
  });

  //Export will find all Tweets in the database and export as JSON. The JSON object tweets is changed as needed to fit the output request in data
  socket.on('export',function(data){
    var Tweet = get_schema();
    Tweet.find({keyword: data[2]},function (err, tweets) {
      if (err) return console.error(err);
      console.log(tweets);
      //Handling each output type
      //JSON
      if (data[1]=='json'){
        var jsonTweets = JSON.stringify(tweets);
        if (fs.existsSync(__dirname+'/'+data[0]+'.json')) {
          io.emit('overwrite',__dirname+'/'+data[0]+'.json');
        }
        fs.writeFile(__dirname+'/'+data[0]+'.json', jsonTweets);
        io.emit('exportFinish',__dirname+'/'+data[0]+'.json');
      }

      //CSV
      if (data[1]=='csv'){
        if (fs.existsSync(__dirname+'/'+data[0]+'.csv')) {
          io.emit('overwrite',__dirname+'/'+data[0]+'.csv');
        }
        fs.writeFile(__dirname+'/'+data[0]+'.csv',json2csv({data: tweets, fields: fields}));
        io.emit('exportFinish',__dirname+'/'+data[0]+'.csv');
      } 

      //XML
      if (data[1]=='xml'){
        var jsonTweets = JSON.stringify(tweets);
        var cleanedTweets = jsonTweets.replace(/@/g, "&amp");
        var finalTweets = JSON.parse(cleanedTweets);
        var xml = "";
        for(i = 0; i < tweets.length; i++){
          xml += js2xmlparser.parse("tweet",finalTweets[i]);
        }
        if (fs.existsSync(__dirname+'\\'+data[0]+'.xml')) {
          io.emit('overwrite',__dirname+'\\'+data[0]+'.xml');
        }
        fs.writeFile(__dirname+'/'+data[0]+'.xml',xml);
        io.emit('exportFinish',__dirname+'\\'+data[0]+'.xml');
      }
    })
  });
});

function get_schema(){
  if(setSchema){
    var Schema = mongoose.Schema;
    var tweetSchema = new Schema({
      keyword: {type: String, default: 'NULL'},
      created_at: { type: String, default: 'NULL'},
      id: { type: String, default: 'NULL'},
      text: { type: String, default: 'NULL'},
      user_id: { type: String, default: 'NULL'},
      user_name: { type: String, default: 'NULL'},
      user_screen_name: { type: String, default: 'NULL'},
      user_location: { type: String, default: 'NULL'},
      user_followers_count: { type: String, default: 'NULL'},
      user_friends_count: { type: String, default: 'NULL'},
      user_created_at: { type: String, default: 'NULL'},
      user_time_zone: { type: String, default: 'NULL'},
      user_profile_background_color: { type: String, default: 'NULL'},
      user_profile_image_url: { type: String, default: 'NULL'},
      geo: { type: String, default: 'NULL'},
      coordinates: { type: String, default: 'NULL'},
      place: { type: String, default: 'NULL'}
    });
    setSchema = false;
  }
  return mongoose.model('tweets',tweetSchema);
}

//Once connectTwitter is done, buildDatabase is called with the finished tweet - a mongoose connection is opened and the tweets are saved one by one
function buildDatabase(tweetArr,key){
  var Tweet = get_schema();
  for(i = 0; i < tweetArr.length; i++){
    if(typeof tweetArr[i].user == 'undefined'){
      continue;
    }
    var temp  = new Tweet({
      keyword: key,
      created_at: tweetArr[i].created_at,
      id: tweetArr[i].id,
      text: tweetArr[i].text,
      user_id: tweetArr[i].user.id,
      user_name: tweetArr[i].user.name,
      user_screen_name: tweetArr[i].user.screen_name,
      user_location: tweetArr[i].user.location,
      user_followers_count: tweetArr[i].user.followers_count,
      user_friends_count: tweetArr[i].user.friends_count,
      user_created_at: tweetArr[i].user.created_at,
      user_time_zone: tweetArr[i].user.time_zone,
      user_profile_background_color: tweetArr[i].user.profile_background_color,
      user_profile_image_url: tweetArr[i].user.profile_image_url,
      geo: tweetArr[i].geo,
      coordinates: tweetArr[i].coordinates,
      place: tweetArr[i].place
    });
    
    temp.save(function (err, temp) {
      if (err) return console.error(err);
    });
  }
}

function connectTwitter(query,quantity){
  //Open up twitter stream
  var Twitter = new TwitterStream(keys);
  if(query){
    Twitter.stream('statuses/filter', {
      track: query
    });
  }
  else{
    Twitter.stream('statuses/filter', {
      locations: [-73.68,42.72,-73.67,42.73]
    });
  }
  Twitter.on('connection success', function (uri) {
    console.log('connection success', uri);
  });

  //Counter for tweets retrieved from stream and array of those tweets
  var twitter_count = 0;

  //Triggers whenever the Twitter object recieves a new tweet
  Twitter.on('data', function (obj) {
    //Sometimes the API retrieves a null object, lets ignore that
    if(obj){
      tweets.push(obj);
      //Counter on tweets streamed
      twitter_count++;
    }

    //Once we have enough tweets, write the array of tweets to file tweets.json and close the stream. Then emit to the client that it can now load the JSON file for display.
    //Addition for lab 7: buildDatabase is also called to save the tweets for later use
    if(twitter_count>=quantity){
      Twitter.close();
      io.emit('finishLoad',tweets);
      buildDatabase(tweets,query);
      tweets = [];
      return 0;
    }   
  });
}

// Once MongoDB connection is made, start server
db.once('open', function() {
  console.log("Database connection established");

  http.listen(3000, function(){
    console.log('Server up on *:3000');
  });
});