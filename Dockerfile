FROM node:9.5-alpine

RUN mkdir /app
WORKDIR /app
ADD . /app

EXPOSE 3050

RUN yarn

CMD ["yarn", "dev"]
