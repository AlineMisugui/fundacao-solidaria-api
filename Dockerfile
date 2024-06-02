FROM node:20-alpine

RUN npm install -g typescript

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "start"]
