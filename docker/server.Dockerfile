# ---- Build stage ----
FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY ./apps/server/package*.json ./
RUN npm install

COPY ./apps/server/ ./

RUN npm run build

# ---- Run stage ----
FROM node:20-alpine

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY ./apps/server/package*.json ./
RUN npm install --omit=dev

EXPOSE 4000

CMD ["node", "dist/index.js"]
