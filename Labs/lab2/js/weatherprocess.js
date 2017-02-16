$( document ).ready(function(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(getWeather);
  }

  var urlCall = "";
  function getWeather(position){
    var urlCall = "https://api.darksky.net/forecast/0d17dd4babb710edb8f4ce2adf5bb4c2/"+position.coords.latitude+","+position.coords.longitude;
    lat = position.coords.latitude;
    long = position.coords.longitude;
    lat = lat.toFixed(2);
    long = long.toFixed(2);

    //Getting the town name
    var geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(lat, long);
    var address = "";
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        address += results[1].formatted_address;
        //Display message while AJAX waits for the JSON file to load
        address = address.substring(0,address.lastIndexOf(','));
        $( ".reportTitle" ).text("Getting weather data for " + address + "...");
      }
    });

    //General AJAX call for a time machine request to the API
    function getNewData(n){
      newTimeURL = urlCall + ","+n
      return $.ajax({
        url: newTimeURL,
        dataType: "jsonp"
      });
    }

    //AJAX call for Time Machine Request
    $( "#leftArr" ).click(function() {
      var date = new Date();
      var weekday = date.getDay();
      var currTime = date.getTime();
      //newWeekTimeArr is an array that holds the time in unix format (milliseconds since 1970) of times for last week's time
      newWeekTimeArr = [];
      //For each weekday, the shifting of the new week will vary, so an if statement is set up for each day of the week. The for loop pushes the new times for each week by multiplying the number of milliseconds per day by the number of days needed to make the shift (ex. from Sunday to last sunday, you need to multply by 7 for a 7 day difference. Then from SUnday to last saturday, you need to multiply by 6 for a 6 day difference.)
      if(weekday==0){
        for(i = 7; i>= 1; i--){
          newWeekTimeArr.push((currTime-(86400000)*i)/1000);
        }
      }
      if(weekday==1){
        for(i = 8; i>= 2; i--){
          newWeekTimeArr.push((currTime-(86400000)*i)/1000);
        }
      }
      if(weekday==2){
        for(i = 9; i>= 3; i--){
          newWeekTimeArr.push((currTime-(86400000)*i)/1000);
        }
      }
      if(weekday==3){
        for(i = 10; i>= 4; i--){
          newWeekTimeArr.push((currTime-(86400000)*i)/1000);
        }
      }
      if(weekday==4){
        for(i = 11; i>= 5; i--){
          newWeekTimeArr.push((currTime-(86400000)*i)/1000);
        }
      }
      if(weekday==5){
        for(i = 12; i>= 6; i--){
          newWeekTimeArr.push((currTime-(86400000)*i)/1000);
        }
      }
      if(weekday==6){
        for(i = 13; i>= 7; i--){
          newWeekTimeArr.push((currTime-(86400000)*i)/1000);
        }
      }

      //7 Ajax calls that will replace week
      $.when(getNewData(newWeekTimeArr[0]),getNewData(newWeekTimeArr[1]),getNewData(newWeekTimeArr[2]),getNewData(newWeekTimeArr[3]),getNewData(newWeekTimeArr[4]),getNewData(newWeekTimeArr[5]),getNewData(newWeekTimeArr[6])).done(function(sunData,monData,tueData,wedData,thurData,friData,satData){
        //Stuff here gets done after all ajax calls are done, data is an arr
      });
    });
    $( "#rightArr" ).click(function() {
      var date = new Date();
      var weekday = date.getDay();
      var currTime = date.getTime();
      //newWeekTimeArr is an array that holds the time in unix format (milliseconds since 1970) of times for last week's time
      newWeekTimeArr = [];
      if(weekday==0){
        for(i = 7; i<= 13; i++){
          newWeekTimeArr.push((currTime+(86400000)*i)/1000);
        }
      }
      if(weekday==1){
        for(i = 6; i<= 12; i++){
          newWeekTimeArr.push((currTime+(86400000)*i)/1000);
        }
      }
      if(weekday==2){
        for(i = 5; i<= 11; i++){
          newWeekTimeArr.push((currTime+(86400000)*i)/1000);
        }
      }
      if(weekday==3){
        for(i = 4; i<= 10; i++){
          newWeekTimeArr.push((currTime+(86400000)*i)/1000);
        }
      }
      if(weekday==4){
        for(i = 3; i<= 9; i++){
          newWeekTimeArr.push((currTime+(86400000)*i)/1000);
        }
      }
      if(weekday==5){
        for(i = 2; i<= 8; i++){
          newWeekTimeArr.push((currTime+(86400000)*i)/1000);
        }
      }
      if(weekday==6){
        for(i = 1; i<= 7; i++){
          newWeekTimeArr.push((currTime+(86400000)*i)/1000);
        }
      }

      //7 Ajax calls that will replace week
      $.when(getNewData(newWeekTimeArr[0]),getNewData(newWeekTimeArr[1]),getNewData(newWeekTimeArr[2]),getNewData(newWeekTimeArr[3]),getNewData(newWeekTimeArr[4]),getNewData(newWeekTimeArr[5]),getNewData(newWeekTimeArr[6])).done(function(sunData,monData,tueData,wedData,thurData,friData,satData){
        //Stuff here gets done after all ajax calls are done, data is an arr
      });
    });

    //AJAX call for the weather API Forecast Request
    $.ajax({
      type: "GET",
      url: urlCall,
      dataType: "jsonp",
      success: function(data) {
        //Update divs with API information on the current weather
        function currWeather(){
          var date = new Date(data.currently.time*1000);
          var icon = "<img src='css/icons/"+ data.currently.icon + ".svg'/>";
          $(".reportTitle").text("Displaying weather data for " + address);
          $(".time").text("Current time is "+date.toLocaleTimeString());
          $(".icon").html(icon);
          $(".summ").text(data.currently.summary);
          var temp = data.currently.temperature;
          temp = temp.toFixed(0);
          var appTemp = data.currently.apparentTemperature;
          appTemp = appTemp.toFixed(0);
          $(".temp").text(temp+ String.fromCharCode(176) + "F");
          $(".appTemp").text("Feels like " + appTemp + String.fromCharCode(176) + "F");
          $(".humidity").text((data.currently.humidity*100)+"%");
          $(".precChance").text((data.currently.precipProbability*100)+"%");
          var windSpeed = data.currently.windSpeed*.621371;
          windSpeed = windSpeed.toFixed(2);
          $(".wind").text(windSpeed+" mph");
        }
        function loadAddData(x){
          $('#addDataLabel1').text(additionalDataLabel[x]+": ");
          $('#addDataLabel2').text(additionalDataLabel[x+1]+": ");
          $('#addDataLabel3').text(additionalDataLabel[x+2]+": ");
          $('#addDataInfo1').text(additionalDataObj[additionalDataKeys[x]]+" "+additionalDataMetric[x]);
          $('#addDataInfo2').text(additionalDataObj[additionalDataKeys[x+1]]+" "+additionalDataMetric[x+1]);
          $('#addDataInfo3').text(additionalDataObj[additionalDataKeys[x+2]]+" "+additionalDataMetric[x+2]);
        }

        //Cycling function that ticks through all the various statistics for the weather currently
        function additionalData(x){
          if(x==12){
            x=0;
          }
          loadAddData(x)
          setTimeout(function(){
            additionalData(x+3)
          },  3000);
        }

        function weekData(){
          var week = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
          $(".weekSumm").text("Summary: " + data.daily.summary);
          $.each(data.daily.data, function(key, value) {
            var icon = "<img src='css/icons/"+value.icon + ".svg' class = 'icon'/>";
            $("#"+week[key]+'Icon').html(icon);
            $('#'+week[key]+'High').html("<p class = 'high'>High: "+value.temperatureMax+"</p>")
            $('#'+week[key]+'Low').html("<p class = 'low'>Low: "+value.temperatureMin+"</p>")
          });
        }



        console.log(data);
        var additionalDataObj = data.currently;
        //Keys for the additionalData Object in order to allow the cycling function to cycle through the array, labels for each statistics and their metric
        var additionalDataKeys = ['cloudCover','dewPoint','humidity','nearestStormBearing','nearestStormDistance','ozone','precipIntensity','precipProbability','pressure','visibility','windBearing','windSpeed'];
        var additionalDataLabel = ['Cloud Cover', 'Dew Point','Humidity','Nearest Storm Bearing','Nearest Storm Distance','Ozone Density','Precipitation Intensity','Chance of Pericipitation','Pressure','Visibility','Wind Bearing','Wind Speed'];
        var additionalDataMetric = ['%',String.fromCharCode(176) + 'F','%',String.fromCharCode(176),'miles','DU','inches/hour','%','millibars','miles',String.fromCharCode(176),'miles/hour']

        currWeather();
        additionalData(0);
        weekData();

      }
    });
  }
});