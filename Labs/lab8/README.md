Jeremy Simon - Lab 8

For this lab, I used iGraph with a Kaggle dataset on the top 5000 IMDB movies. I originally got a graph in about an hour but the graph was extremely cluttered. I had to spend most of my time figuring out data conversions and working with the data types, and most of all figuring out how to chop down the data in the graph. I decided to make it do countries with at least 5 actors connecting to it. I explain what I mean by this in the questions below. The script is script.R and the graph can be seen in actors_in_countries.png, and finally the movie_metadata.csv file is the dataset. The script expects the movie_metadata.csv to be in your R workspace directory.

Handed in late because even though I had this done in time I wanted to clean out my data more to make a not-as-clustered graph. But I didn't find the time :(

What dataset did you use and why? 
I used the IMDB top 5000 movies dataset that I found on Kaggle (link in sources). I decided there are plenty of ways to connect movie information in a net graph, especially since the data isn't particularly numeric and getting information from this dataset usually involves comparing two objects (actor and country, actor and actor, actor and direction, etc.)

What did you learn about the dataset from your exploration?
I wanted to look at which countries are the most popular for a wide diversity of actors and movies. I did this by taking country nodes (countries which have at least 5 occurences) and actor nodes, and then connect them if they acted in a movie filmed in that country. Not suprisingly, the USA had by far the most connections. In the center of the graph, it accumulates more than half of the actor nodes. Then the UK, and then after that it falls dramatically. We can learn that the Anglosphere is the most prominent for movies and most definitely for the actors that work in those movies. The actor nodes which are isolated on the outside of the graph are likely actors who acted only in a movie not in a chosen country (chosen countries have at least 5 occurences in the data set). Most of the clusters around the edges of the network are places like Germany, Australia, etc. They typically had 5 or 6 actors in the dataset pointing to them.

What challenges did you face (due to R, the dataset, or formating), and how did you overcome them?
Learning how factors work was a big deal for my dataset, since countries were always repeating and the first time I created a graph there were 10000 nodes. This was because there were 5000 movies in the database so I naively created a node for every time a country showed up as well as with the actor. Following that mess of a graph came a lot of cleaning up. The use of factors alone cleared out most of the nodes and edges, and then doing further work like making sure there were no empty actors being added (sometimes movies had 1 or 2 actors listed, when there are 3 columns for them) and not duplicating edges. Data conversion was a challenge as well, especially when I wanted to create a key-value pair of country to frequency. The way I found out how to do this just created a 2D array so it took frequency as a list when it should be obviously be a double because every time I find an occurence a increment the frequency, and R got mad at me because I was trying to increment a list. So that was fun to work with.

Sources:
R Bootcamp and the R presentation
http://www.shizukalab.com/toolkits/sna/plotting-networks-pt-2
https://www.kaggle.com/deepmatrix/imdb-5000-movie-dataset