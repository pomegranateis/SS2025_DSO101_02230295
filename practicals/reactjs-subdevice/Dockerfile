# builder phase
FROM node:alpine AS builder

WORKDIR /app

COPY package.json ./
RUN npm install --legacy-peer-deps

COPY ./ ./

ENV NODE_OPTIONS=--openssl-legacy-provider

RUN npm run build

FROM nginx
EXPOSE 80
COPY --from=builder /app/build /usr/share/nginx/html
