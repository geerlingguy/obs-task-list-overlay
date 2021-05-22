FROM node:14

WORKDIR /usr/src/app

COPY . .

RUN npm install

CMD ["node", "server.js"]
