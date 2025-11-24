FROM node:20-alpine

WORKDIR /usr/src/app

COPY ./apps/bot/package*.json ./
RUN npm install

COPY ./apps/bot/ ./

CMD ["npm", "run", "start"]
