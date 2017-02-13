$( document ).ready(function(){
  $.getJSON( "TwitterTweets17.json", function( tweets ) {

    function fadeTweets(){
      $("#tweet1").fadeOut(1000);
      $("#tweet2").fadeOut(1000);
      $("#tweet3").fadeOut(1000);
      $("#tweet4").fadeOut(1000);
      $("#tweet5").fadeOut(1000);
    }

    function showTweets(){
      $("#tweet1").fadeIn(1000);
      $("#tweet2").fadeIn(1000);
      $("#tweet3").fadeIn(1000);
      $("#tweet4").fadeIn(1000);
      $("#tweet5").fadeIn(1000);
    }


    //loadTweets will animate in the index,index+1,index+2,index+3,index+4th tweet in the JSON file
    function loadTweets(index){
      if(index<tweets.length){
        $("#tweet1").text(tweets[index].text);
      }
      if(index+1<tweets.length){
        $("#tweet2").text(tweets[index+1].text);
      }
      if(index+2<tweets.length){
        $("#tweet3").text(tweets[index+2].text);
      }
      if(index+3<tweets.length){
        $("#tweet4").text(tweets[index+3].text);
      }
      if(index+4<tweets.length){
        $("#tweet5").text(tweets[index+4].text);
      }
    }
    tweetLoop(0);

    //tweetLoop is a function that calls other functions and pauses 3 seconds at the end before repeating
    function tweetLoop(x){
      if(x!=0){
        fadeTweets();
      }
      loadTweets(x);
      if(x!=0){
        showTweets();
      }
      setTimeout(function(){
       tweetLoop(x+5)
      }, 3000);
    }
  });
});