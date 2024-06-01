FROM node:20

COPY . .
WORKDIR /app

RUN ["npm", "install"]

EXPOSE 8080

CMD ["npm", "run", "start"]