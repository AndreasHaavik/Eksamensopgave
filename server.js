const http = require('http');
const API = require('./API')

const PORT = process.env.PORT || 3000;

const server = http.createServer(API);

API.listen(PORT);

console.log("I got my server to run, and thats amaziiin!")