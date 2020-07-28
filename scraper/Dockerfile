FROM node:alpine

COPY . /src

WORKDIR /src

RUN apk add ca-certificates

RUN mkdir /var/conf 

RUN npm install

ENTRYPOINT ["npm", "start"]
