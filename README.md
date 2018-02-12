# ccq

[![Build Status](https://travis-ci.org/spikehip/ccq.svg?branch=master)](https://travis-ci.org/spikehip/ccq)

A simple REST API to query WiFi connection parameters from Ubiquity's AirOS version 4.0.3

# building and running

## building and running the rest api

cd api 
npm i 
node index.js

## building and running the client

cd web-client
npm -g install @oracle/ojet-cli
npm i
ojet serve

## running using the docker images 

docker run --rm -p 8080:8080 -ti spikehip/airos-4-rest:28 
docker run --rm -p 10080:80 -ti spikehip/airos-4-client:28

# REST API

GET /api/ccq
GET /api/rx_rate
GET /api/tx_rate
GET /api/signal
[..]

