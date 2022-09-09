FROM node:16.14.0-alpine

WORKDIR /usr/src/app

COPY ./package*.json /
COPY ./ ./

EXPOSE 3001

WORKDIR /usr/src/app
CMD ["npm", "run", "start"]