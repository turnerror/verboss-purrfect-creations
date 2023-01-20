FROM node:17 as node-base

WORKDIR /home/node/app

COPY ./backend/package*.json ./

RUN npm i

COPY . .


FROM node-base as production

ENV NODE_PATH=./backend/build

RUN npm run build