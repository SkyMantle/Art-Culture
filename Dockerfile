FROM node:20

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

RUN apt-get update -y && apt-get install -y openssl
