FROM node:lts-alpine
WORKDIR /rating-app-client
COPY ./rating-app-client .
# make the 'app' folder the current working directory
WORKDIR /rating-app
# copy both 'package.json' and 'package-lock.json' (if available)
COPY ./rating-app/package*.json ./
# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY ./rating-app .
# install project dependencies
RUN npm install
# build app for production with minification
RUN npm run build
RUN npm install -g serve
# -s flag means serve it in Single-Page Application mode
# which deals with the routing problem below
CMD ["serve", "-s", "dist"]
