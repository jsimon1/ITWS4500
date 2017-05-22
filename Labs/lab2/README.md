Jeremy Simon - Lab 2
Used the DarkSky API to retrieve weather data. weatherprocess.js contains all the code that works with the API's returned JSON file. I first load the general information in the Bootstrap Jumbotron (where the user is led to look first, expecting the most important information), then I load the weekly data in the bottom left, displaying in a table. At first, I wanted to make it so you can use the arrows on the left and right to bring up the past week's data using DarkSky's Time Machine Request, and the right arrow would bring you back the other way and into the future forecast for the next week. I decided not to hand in the lab on time because I wanted to get that feature done, but since I put it off until the end of the semester I'm handing it in now, sorry! The last part I load is the addition data which cycles three statistics at a time using some of the javascript code I used from Lab 1. 


Sources:
http://stackoverflow.com/questions/6797569/get-city-name-using-geolocation
https://darksky.net/dev/