FROM node:17 as node-base

WORKDIR /home/node/app

COPY ./backend/package*.json ./

RUN npm i

COPY ./backend .


FROM node-base as production

ENV NODE_PATH=./backend/build

RUN npm run build


FROM node:17-alpine as react-base

WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

COPY ./frontend/package.json ./
COPY ./frontend/package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY ./frontend ./

# start app
CMD ["npm", "start"]