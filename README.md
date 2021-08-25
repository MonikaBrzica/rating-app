## Prerequisites and getting started
In order to run the application you need to have Docker and docker-compose installed on your machine.

### How to install docker

- Install docker for [Mac](https://docs.docker.com/docker-for-mac/install/)
- Install docker for [Windows](https://docs.docker.com/docker-for-windows/install/)
- Install docker for [Linux-docker](https://docs.docker.com/engine/install/)
- Install docker-compose for [Linux-docker-compose](https://docs.docker.com/compose/install/)

Note: for Windows and Mac you must have only docker installing, but when installing on linux you have to have both docker and docker-compose

### Get started

Clone the project first!

When you clone the project and have docker up and running, you need to navigate in your terminal (for Linux) or Git Bash (for Win) to the project folder that you cloned. Next step is to execute the following command that will run our bash script:

- ```bash rating-app.sh```

It will clone two other projects (backend and public), as well as this one, and store it in /rating-application folder. 

<b>If everything is done, that's it! :D</b>

Now, after everything has started;
- you have your application running on: http://localhost:8080/
- backend on: http://localhost:8081/
- phpMyAdmin on: http://localhost:8000/

 You can access the database "rating_app" with the following credentials: <b> username:</b> root <b> password:</b> password123

## If you want to install only our rating-app run these command in order:

1. ```git clone https://github.com/MonikaBrzica/rating-app.git```
2. ```cd rating-app```
3. ```npm i```
4. ```npm run serve```

App should be running on http://localhost:8080
Note: App depends on rating-app-public and rating-app-backend!

## Project plan

When we started, we made a plan to make our front application. Thanks to a good plan at the beginning, we finished our application on time and down to the smallest detail!

- [plan]

[plan]: https://docs.google.com/document/d/1O-3YSnG2QlStAvaewg9r7RYsU_tpwuup2dgsG0-afds/edit?usp=sharing

## Project documentation

If you want to see what technologies we used and read more about the application, take a look at the documentation.

- [documentation]

[documentation]: https://docs.google.com/document/d/1CybueXYo5BiqzhTG5U9wKOT_k3yE323dxa0Bbuwd2jA/edit


