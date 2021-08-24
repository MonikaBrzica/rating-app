#!/bin/bash
sufix=rating-app*
pworkd=$PWD

if [[ "$PWD" = */rating-app* ]];
then
    getout=${pworkd//$sufix/}
    echo "Creating 'rating-application' folder..."
    `cd $getout && mkdir rating-application`
    echo "Cloning projects into ${getout}rating-application..."
    `cd $getout/rating-application && git clone https://github.com/MonikaBrzica/rating-app && git clone https://github.com/Andric34/rating-app-client && git clone https://github.com/ThePrgs/rating-app-backend`
    echo "Cloning done!"
    echo "Copying docker files..."
    `cp $getout/rating-application/rating-app/Dockerfile $getout/rating-application && cp $getout/rating-application/rating-app-backend/docker-compose.yml $getout/rating-application`
    echo "Running docker-compose..."
    `cd $getout/rating-application && docker-compose up -d`
    echo "All done!"
    `rm -rf $getout/rating-app`
    echo "Project https://github.com/MonikaBrzica/rating-app is now located in folder ${getout}rating-application."
fi
