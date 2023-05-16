FROM node:14-alpine

ENV PUBLIC_URL=http://localhost:3000

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build

CMD [ "yarn", "start" ]
