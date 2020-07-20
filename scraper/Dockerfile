FROM node:alpine

COPY . /src

WORKDIR /src

RUN mkdir /var/conf 

RUN npm install

ENTRYPOINT ["npm", "start"]