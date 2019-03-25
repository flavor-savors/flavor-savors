FROM node:8
WORKDIR /usr/src/app

COPY package.json ./

RUN npm i -g npm
RUN npm install

COPY ./server .
EXPOSE 4000
CMD ["node", "index.js"]