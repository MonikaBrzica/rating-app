FROM node:lts-alpine
# install simple http server for serving static content
RUN npm install -g http-server
WORKDIR /rating-app-client
COPY ./rating-app-client .
# make the 'app' folder the current working directory
WORKDIR /rating-app
# copy both 'package.json' and 'package-lock.json' (if available)
COPY ./rating-app/package*.json ./
# install project dependencies
RUN npm install
# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY ./rating-app .
# build app for production with minification
RUN npm run build
EXPOSE 8080
CMD [ "http-server", "dist" ]
