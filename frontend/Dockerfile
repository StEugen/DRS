FROM node:alpine

WORKDIR /app/frontend

COPY package.json .
COPY yarn.lock .

RUN yarn install --production

COPY . .

CMD [ "yarn", "start" ]
