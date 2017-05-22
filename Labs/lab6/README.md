Jeremy Simon - Websci Lab 6

Built off of my lab 5, I had to change the functionality of the tweet ticker. Originally, I had the server write a JSON file and then emit to the client that it did that, and then the client did an AJAX call to the JSON file and cycled through the tweets in there. Since we are adding export functionality, I changed it so instead the tweet array goes with the emit. I used a node module called json2csv to make it easy to convert the JSON given specified fields. Once a file is written, the user is informed of whether the file was overwritten and that writing to the file was a success. 

Q: Where would it be better to place the CSV conversion code, in the node server or in an Angular controller? Why?
A: I decided there were many more pros to add the conversion code to the node server instead of the angular controller. One of the largest pros is node's package mananger so one could import modules that get the job done. For example, I was able to install a json to csv converter and all I needed to manually do was specificy the fields and the path for it to be extracted from the JSON. The only con I can think of for doing the logic on the node server is the information would need to be emitted to the client in order for them to recieve the file. So for large JSON files there might be a delay in the transmittion of data. If I were to do the logic in the Angular controller, I would need to manually do the string manipulation and then write it to a file. 

Sources:
http://stackoverflow.com/questions/4482686/check-synchronously-if-file-directory-exists-in-node-js
https://www.npmjs.com/package/json2csv
My group (Group 2)