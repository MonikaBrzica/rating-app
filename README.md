## Prerequisites and getting started
In order to run the application you need to have Docker and docker-compose installed on your machine.

### How to install docker

- Install docker for [Mac](https://docs.docker.com/docker-for-mac/install/)
- Install docker for [Windows](https://docs.docker.com/docker-for-windows/install/)
- Install docker for [Linux-docker](https://docs.docker.com/engine/install/)
- Install docker-compose for [Linux-docker-compose](https://docs.docker.com/compose/install/)

Note: when instaling on linux you have to have both docker and docker-compose

When you have docker up and running you need to navigate to the project folder that you cloned. Next step is to execute the following command that will run our bash script:

* `bash rating-app-backend.sh`

It will clone two other projects (backend and public), as well as this one, and store it in /rating-application folder. To conclude, it will also run `docker-compose up -d` command. 

After everything has started you have your application running on http://localhost:8080/, backend on http://localhost:8081/ and phpMyAdmin on http://localhost:8000/. You can access the database 
"rating_app" with the following credentials:
* username: root
* password: password123

## If you want to install only our rating-app run these command in order:
* git clone https://github.com/MonikaBrzica/rating-app.git
* cd rating-app
* npm i
* npm run serve

App should be running on localhost:8080
Note: App depends on rating-app-public and rating-app-backend
### Project plan

- [plan]

[plan]: https://docs.google.com/document/d/1O-3YSnG2QlStAvaewg9r7RYsU_tpwuup2dgsG0-afds/edit?usp=sharing

### Project documentation

- [documentation]

[documentation]: https://docs.google.com/document/d/1CybueXYo5BiqzhTG5U9wKOT_k3yE323dxa0Bbuwd2jA/edit


