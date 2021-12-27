# syntax=docker/dockerfile:1

FROM node:14.17.6

# Create app directory
WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "app.js" ]