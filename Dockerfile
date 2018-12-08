FROM node:9.5-alpine

RUN mkdir /app
WORKDIR /app
ADD . /app

EXPOSE 3090

RUN yarn

CMD ["yarn", "dev"]
