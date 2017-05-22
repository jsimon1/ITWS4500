Jeremy Simon - Lab 4

lab4.html is the home page of the application and locationLookup.js is the angular/JQuery script that handles the data. The application is a day planner that lets a user look up specific places in their area (such as activities or food) and it will look up the weather to help them plan accordingly with their activity. I originally only have the google places API but when I realized I needed to do a JSONP call in Angular I added the Dark Sky API. The main function in angular is the button handler, $scope.searchButton() which calls the weatherLookup() function and callback() function. WeatherLookup() does a JSONP calls to the weather API and sets the variables accordingly for view. Callback retrives the results from the google maps api and sets the variables accordingly.

API:
https://darksky.net/dev/
https://developers.google.com/maps/

Sources:
https://www.w3schools.com/cssref/css3_pr_mediaquery.asp
http://jimhoskins.com/2012/12/17/angularjs-and-apply.html
https://docs.angularjs.org/api/ng/service/$http
