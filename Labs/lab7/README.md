Jeremy Simon - Websci Lab 7

Built off of Lab 6, I had to refactor pretty much all of my export code since I am reading from a MongoDB when I export. I had trouble understand how to access the Tweet model from multiple events in Node but I realized I could just have a function that returns a Tweet model, and I use that to always reference the collection. Added loading symbol for user while tweets are loading for clarification, and XML was added as an option to export. A simple reset button was added to easily start a new prompt for the stream.

One thing about the MongoDB connection: If a user looks up a keyword and then the same keyword again in a different interface and exports, it will export both results. I assumed this was intended functionality of the export, so I added keyword to the Tweet schema so I could track what query each tweet belongs to and can be exported properly.

Sources:
http://mongoosejs.com/docs/
https://gist.github.com/fwielstra/1025038
http://stackoverflow.com/questions/1091945/what-characters-do-i-need-to-escape-in-xml-documents
http://loading.io/
https://www.npmjs.com/package/js2xmlparser