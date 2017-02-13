$( document ).ready(function(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(getWeather);
  }



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


    //AJAX call for the weather API
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

        function additionalData(x){
            if(x==0){
              
            }
        }

        function weekData(){
          var week = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
          $(".weekSumm").text("Summary: " + data.daily.summary);
          $.each(data.daily.data, function(key, value) {
            var icon = "<img src='css/icons/"+value.icon + ".svg' class = 'icon'/>";
            $("#"+week[key]).append(icon);
            $("#"+week[key]).append("<p class = 'high'>High: " + value.temperatureMax + "</p>");
            $("#"+week[key]).append("<p class = 'low'>Low: " + value.temperatureMin + "</p>");
          });
        }



        console.log(data);
        var additionalDataArr = data.currently;

        currWeather();
        additionalData();
        weekData();

      }
    });
  }
});