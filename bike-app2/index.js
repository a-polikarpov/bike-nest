const http = require('http');
const request = require('request');
const uuid = require('uuid');


const hostname = '127.0.0.1';
const MAIN_APP_URL = 'http://127.0.0.1:3000';
const BIKE_URL = `${MAIN_APP_URL}/bike`;

const { getFreePort } = require('./utils');

// Ports [3001...3100]
const PORTS = Array.from(Array(100).keys()).map((num) => num + 3001);

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('This is Bike!');
});

let bike = null;

getFreePort(PORTS).then((port) => {
  server.listen(port, () => {
    request({
      url: BIKE_URL,
      method: 'POST',
      json: true,
      body: {
        id: uuid.v4(),
        ip: `${hostname}:${port}`,
        status: 'free'
      }
    }, (error, response ,body) => {
      if (error || body.statusCode === 500) {
        server.close(() => {
          process.exit(1);
        })
      }

      bike = {
        id: uuid.v4(),
        ip: `${hostname}:${port}`,
        status: 'free'
      };

      console.log(`bike is ready, url : ${hostname}:${port}`, MAIN_APP_URL);
    })
  })
});
