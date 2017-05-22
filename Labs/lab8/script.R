library(igraph)

#Read in file and convert factors to characters so they can be altered
movies = read.csv(paste(getwd(),"/movie_metadata.csv",sep=""))
actors1 = movies[,11]
actors1 <- as.character(actors1)
actors2 = movies[,7]
actors2 <- as.character(actors2)
actors3 = movies[,15]
actors3 <- as.character(actors3)
countries = movies[,21]
countries <- as.character(countries)

countryNodes <- NULL
countryFreq <- list()
countryLabel <- NULL
#Run through the file once and get the frequencies for countries
for(i in 1:length(countries))
{
  if(is.element(countries[i],countryLabel))
  {
    countryFreq[[countries[i]]]<- as.numeric(countryFreq[countries[i]])+1
    #If there are at least 5 occurences of the country in the dataset, add to countryNodes
    countryNodes = c(countryNodes,countries[i])
  }
  else
  {
    countryFreq[[countries[i]]] <- 1
    countryLabel <- c(countryLabel,countries[i])
  }
}

#Nodes, the countries and the actors
countryNodes = levels(factor(countryNodes))
actors = c(actors1,actors2,actors3)
actors = levels(factor(actors))
edges = NULL
nodes = NULL

#Building nodes
nodeIDs = NULL
nodeTypes = NULL
for (i in 1:length(countryNodes))
{
  if(!is.element(countryNodes[i],nodeIDs)){
      nodeIDs = c(nodeIDs,countryNodes[i])
  }
}
for (i in 1:length(actors))
{
  #If not added yet and is part of a movie in a country that has a node, add to actor nodes
  if(!is.element(actors[i],nodeIDs)){
      nodeIDs = c(nodeIDs,actors[i])
  }
}

nodes <- data.frame( id = c(levels(factor(countries)),actors))
nodes <- unique(nodes)


#Building edges
edgeFrom = NULL
edgeTo = NULL
for (i in 1:length(countries))
{
  #Check to make sure none of our data being entered is empty, and a connection from the actor to country isn't already in edges
  test1 <- c(actors1[i],countries[i])
  test2 <- c(actors2[i],countries[i])
  test3 <- c(actors3[i],countries[i])
  #All actors already in an edge
  test4 <- edgeFrom %in% actors1[i]
  test5 <- edgeFrom %in% actors2[i]
  test6 <- edgeFrom %in% actors3[i]
  #All country indeces already in an edge
  test7 <- edgeTo %in% countries[i]

  #Do they match? We already have this edge

  if(countries[i]!="")
  {
    if(actors1[i]!="")
    {
      edgeFrom = c(edgeFrom, actors1[i])
      edgeTo = c(edgeTo, countries[i])
    }
    if(actors2[i]!="")
    {
      edgeFrom = c(edgeFrom, actors2[i])
      edgeTo = c(edgeTo, countries[i])
    }
    if(actors3[i]!="")
    {
      edgeFrom = c(edgeFrom, actors3[i])
      edgeTo = c(edgeTo, countries[i])
    }
  }
}
edges <- data.frame( from = edgeFrom,
                    to = edgeTo)

finalGraph <- graph_from_data_frame(d=edges,vertices=nodes,directed=F)
plot(finalGraph,vertex.label = NA,edge.curved=0.2, vertex.size =5)


