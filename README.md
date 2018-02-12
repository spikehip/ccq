# ccq

[![Build Status](https://travis-ci.org/spikehip/ccq.svg?branch=master)](https://travis-ci.org/spikehip/ccq)

A simple REST API to query WiFi connection parameters from Ubiquity's AirOS version 4.0.3

# building and running

## building and running the rest api

```bash
cd api 
npm i 
node index.js
```

## building and running the client

```bash
cd web-client
npm -g install @oracle/ojet-cli
npm i
ojet serve
```

## running using the docker images 

```bash
docker run --rm -p 8080:8080 -ti spikehip/airos-4-rest:28 
docker run --rm -p 10080:80 -ti spikehip/airos-4-client:28
```

# REST API

 * GET /api/ccq
 * GET /api/rx_rate
 * GET /api/tx_rate
 * GET /api/signal

[..]

# web client 

![screenshot of client](https://raw.githubusercontent.com/spikehip/ccq/feature/swarm-down/screen1.png)
