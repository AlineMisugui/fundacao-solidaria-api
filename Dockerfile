#Build stage
FROM node:20-alpine AS build

RUN npm install -g typescript

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "start"]
