#Build stage
FROM node:16-alpine AS build

RUN npm install -g typescript

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

CMD ["npm", "run", "start"]
