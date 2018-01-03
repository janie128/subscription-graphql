FROM node:7.5.0

WORKDIR /poc
ADD . .
RUN npm i
RUN npm run build:schema && npm run relay
