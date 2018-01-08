FROM node:8.9.4
MAINTAINER Andras Bekesi <andras.bekesi@bikeonet.hu>

EXPOSE 8080

COPY index.js /opt
COPY package.json /opt
WORKDIR /opt
RUN apt-get update && apt-get -y install sshpass && npm install 
CMD node index.js
