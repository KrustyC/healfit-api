FROM node:9.10-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN yarn install
COPY . /usr/src/app
EXPOSE 3090

CMD ["yarn", "dev"]
