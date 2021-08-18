## Project setup

### How to set up local development environment

- Install docker for [Mac](https://docs.docker.com/docker-for-mac/install/)
- Install docker for [Windows](https://docs.docker.com/docker-for-windows/install/)
- Install docker for [Linux](https://docs.docker.com/engine/install/)

### Run project
- Clone project
- From root directory execute:
```
docker build -t docker-projects/rating-app .
docker run -it -p 8080:8080 --rm docker-projects/rating-app
```
- Navigate to http://localhost:8080/
