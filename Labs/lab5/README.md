Jeremy Simon - Lab 5

package.json is the installation package for node, loadTweets.js is an angular script that initializes the app and sends a socket emit to the server when the user sends a tweet request. Once a response from the server is recieved a looping function handles the front-end tweets display. 661482693-tweets.json is the response from the server once it retrives enough tweets to fill the request. server.js is the server configuration that handles the routing/serving pages and scripts, handling sockets and the twitter-stream-api module.

Sources/Help:
http://jimhoskins.com/2012/12/17/angularjs-and-apply.html
https://github.com/socketio/socket.io-client/blob/master/docs/API.md
http://stackoverflow.com/questions/36856232/write-add-data-in-json-file-using-node-js
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
https://dev.twitter.com/streaming/reference/post/statuses/filter
http://jsfiddle.net/f8erG/2/