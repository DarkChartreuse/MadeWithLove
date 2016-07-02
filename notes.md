//Elastic search

order item field tags: 
{
  food (name)
  cuisine (type)
  chef: firstname + last name
  ingredients: [], ingredients.food
  description

  quantity: # check if > 0
  rating (int) 
  price (int) (slider)
  loc: {lat, lng}
  zipcode
}



user selects fields 
//

//SingIn
- User sign up 
- username, zipcode, name, phone# --> PG

//Chef Rating
- start off with 0;  <-- ID, username, ratings (PG)
- create a meal;
  - retrieve your chefId from user session
- {food, ing, chefId, } --> Meals (PG)
  - ing is an array of items[];
  - healthLabels is array of items;  
-  create an ingredients table
  - mealId to 
- create a table for healthLabel



<!-- - {food, ing, ratings, chefName, chefId}  --> ES


//User 
- search for meals 
- {food, ing, chefId, }  <-- (PG) Meals
- 
- clicks on meal view  <-- Meals & Users ()
- Using chefId
- Query PG to retrive (chefName, chefDescription, avgRating)  <-- PG
 
//S1: 
- user logs-in (send in user ID)
- query his historical orders
- find the most purchased cuisine (eg: Italian)
- query ES for all available italian meals 

//Retrieve ChefIds
  - select chefIds of those meals
  - for each chefId retrieve rating for the chef
  - if chef rating > 4 
  - query ES where chef = [tom OR harry OR Y] & cuisine == italian  
  - return list of meals

//filter meals where chefRating > 4
  -   



//Deployment of a docker container to Digital Ocean

//create an aws folder
  1 - create a credentials file (https://docs.docker.com/machine/drivers/aws/)
  1.2 - add credentials to that file
  - all docker machines connected: docker machine ls

//ceate a new machine to spin up ec2 instance with docker machine running
  2 - docker-machine create -d amazonec2 myAwsMachine
  2.2 - docker ls should show the machine 
  //connect to that machine
  3 - docker-machine env myAwsMachine
  4 - eval $(docker-machine env myAwsMachine)
//Now we are connected 
//Now we will create a basic node app and create an image and deploy that image
  - npm init -y
  - touch server.js
  - npm install express
  //create a basic server
  - define a start npm script: node server.js
  - npm start
  go to browser and test --- this is now running locally

//Build a docker image
  touch DockerFile
  tell what is base image
    FROM node
    
    RUN mkdir -p/src
    WORKDIR /src

    COPY package.json /src
    RUN npm install

    COPY . /src

    EXPOSE 8000
    CMD ("npm", "start")
//Create img on aws server (-t says this is what the image should be called)
  - docker build -t myNodeserver . 

//Run the docker container
  - docker run --name node1 -d myNodeServer
  (node1 is just a name we give it right now, -d will run it bkg)
  - docker-machine ip myAwsMachine
  - docker ps
//Now we want to access the above ip and have the server running
  - docker logs node1
  //we now see that it is running there and @ 8000 we should see our msg but we dont
  //We have to port map
  - docker stop node1
  - docker ps  / docker ps-a
  docker rm node1
  - docker run --name node1 -d -p 80:8000 myNodeServer  (-p exposes port 80 on docker-machine 8000 on docker container)
  - docker logs node1
  - docker logs -f node1 (can't connect to docker deamon)
  - docker machine eval myAws
  - docker -machine ls
  - docker logs -f node1
  - now we go to the ip and our server will be running on AWS

  //to go into container
  docker exec -it node1 /bin/bash 

  docker-machine ssh myAws   //we are now going to docker machine, the container runs inside this machine i.e. our EC2 instance
  
  2 routes
  // we can connect a micro service or 
  //now we can do a sql server onto a container and connect the 2 machine
  
  