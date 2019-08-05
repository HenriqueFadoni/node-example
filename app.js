const http = require('http');
const routes = require('./exercise');

const server = http.createServer(routes);

server.listen(3000);