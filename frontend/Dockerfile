FROM node:alpine

WORKDIR /app
COPY . .

RUN yarn install

RUN chmod -R 755 /app/frontend

CMD [ "yarn", "build" ]
