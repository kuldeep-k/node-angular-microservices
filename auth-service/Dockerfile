FROM node:18-alpine as base

RUN npm install -g nodemon

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]

ENV NODE_ENV=production

COPY . /

CMD ["nodemon", "bin/www"]