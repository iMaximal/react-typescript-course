#!/usr/bin/env node

const debug = require('debug')('react-type-script-course:server');
const http = require('http');
const socketio = require('socket.io');

const app = require('../app').app;
const sessionMiddleware = require('../app').sessionMiddleware;
const { normalizePort } = require('../helper');

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '8080');
app.set('port', port);

/**
 * Create HTTP and WebSocket server.
 */

const server = http.createServer(app);
const io = socketio(server);
io.use(function (socket, next) {
  // Wrap the express middleware
  sessionMiddleware(socket.request, {}, next);
});

module.exports = {
  io,
};

require('../chart-ws');

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${ port }`
    : `Port ${ port }`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${ bind } requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${ bind } is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${ addr }`
    : `port ${ addr.port }`;
  debug(`Listening on ${ bind }`);
}

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
