FROM node:latest

WORKDIR /usr/src/api

COPY . .
COPY ./.env.prod ./.env

RUN yarn install --ignore-engines

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start:prod"]